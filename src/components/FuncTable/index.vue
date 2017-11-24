<template>
  <div class="func-table">
    <!-- 批量操作组 + 查询 -->
    <div class="clearfix func-table-top mb-10">
      <!-- 批量操作组（slot） -->
      <div class="func-table-batch-operation f-l">
        <slot name="batch-operation">
          <!-- <Button>添加</Button>
          <Button>编辑</Button>
          <Button>删除</Button> -->
        </slot>
      </div>
      <div class="func-table-refresh f-l ml-5" v-show="refreshable">
        <Button @click="refresh">刷新</Button>
      </div>
      <div class="func-table-search f-r" v-if="searchConfig">
        <div class="clearfix">
          <Button-group class="f-r ml-10">
            <Button
              icon="ios-search"
              class="f-r"
              @click="doSearch(searchInput)">查询</Button>
          </Button-group>
          <Button-group class="f-r ml-10">
            <Input v-model="searchInput" :placeholder="searchConfig.placeholder"
              :maxlength="searchConfig.maxLength" class="ivu-input-default f-r"></Input>
          </Button-group>
        </div>
      </div>
    </div>
    <!-- 表格 + 筛选组件 -->
    <div class="func-table-main mb-10">
      <div class="func-table-filter" v-if="filterConfig">
        <div v-if="modalTransfer.exist">
          <Modal v-show="isTransferMode"
            v-model="modalTransfer.show"
            :title="modalTransfer.title"
            width="720px"
            @on-ok="saveColumnsConfig">
            <CTransfer ref="CTransfer"
              :disabledSelections="disabledSelections"
              :data="transferData"
              v-model="targetKeys"
              :titles="titles"
              @on-right-data-change="handleRightDataChange"></CTransfer>
          </Modal>
        </div>
        <div class="clearfix">
          <Checkbox-group ref="checkList" class="mt-10 f-l"
            v-show="isCheckMode"
            v-model="tableColumnsChecked"
            @on-change="fillTableColumns"
            @on-current-change="CurrentChange"
            @on-select="Select"
            @on-select-cancel="SelectCancel"
            @on-select-all="SelectAll"
            @on-selection-change="SelectionChange"
            @on-sort-change="SortChange"
            @on-row-click="RowClick"
            @on-row-dblclick="RowDblclick"
            @on-expand="Expand">
            <Checkbox :ref="'check' + index"
              v-for="(item, index) in checkList"
              :disabled="checkDisabled(item)"
              :label="item" :key="item"></Checkbox>
          </Checkbox-group>
          <slot name="default">
            <div class="topButton">
              <!-- <button class="but_c" @click="clearStorage">
                <Icon type="ios-upload-outline" size="18"></Icon>恢复默认配置
              </button> -->
              <button class="but_c" @click="showModalTransfer" v-if="isTransferMode">
                <Icon type="compose" size="18"></Icon> 自定义列表显示内容
              </button>
              <!-- <button class="but_c" @click="exportData" v-if="exportExcel">
                <Icon type="ios-upload-outline" size="18"></Icon> 导出Excel
              </button> -->
            </div>
          </slot>
        </div>
      </div>
      <div class="topPosition spin-outer">
        <Table stripe ref="table"
          :columns="filteredColumns"
          :id="id"
          :data="data"
          @on-selection-change="setselectedData"
          @on-current-change="emitCurrentChange">
        </Table>
        <!-- 加载中 -->
        <Spin size="large"
              fix
              v-show="spin"
              class="login_loading_spin">
          <Icon type="load-c"
                size="18"
                class="login-spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
      </div>
    </div>
    <!-- 分页组件 -->
    <div class="func-table-page clearfix"
      v-if="pageConfig"
      :style="setPagePosition(pageConfig.pagePosition)">
      <Page ref="page" style="float: none; display: inline-block"
        :total="total"
        :page-size="size"
        :show-elevator="pageConfig.showElevator"
        :show-sizer="pageConfig.showSizer"
        show-total
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"></Page>
    </div>
  </div>
</template>

<script>
  /**
   * @prop columns 表格列配置 []
   * @prop searchConfig 查询配置 true | false
   * @prop filterConfig 筛选配置 { mode: 'check' } | false
   * @prop pageConfig 分页配置 { showSizer: true, pagePosition: 'right' } | false
   * @prop id 表格id(用于保存筛选配置) 'table-001'
   * ps：
   * 1. 父组件中的回调函数要用.bind(this)方法修复this指向问题。
   * 2. transfer里的key定义规则：columes中存在key则为key，不存在则为type。
   * 3. 每个table都需要用id来标记，用途是获取本地存储对应的配置对象。
   */
  import CTransfer from '@/components/Transfer/Index'
  import configUtils from './configUtils'
  import common from '@/utils/common'
  import dom from '@/utils/dom'
  import loginUtils from '@/utils/loginUtils'
  import fetchDataFormat from './fetchDataFormat'

  export default {
    name: 'FuncTable',
    components: {
      CTransfer
    },
    model: {
      prop: 'fetchConfig',
      event: 'on-fetch-config-change'
    },
    props: {
      /* 可否刷新|选填 */
      refreshable: {
        type: [Boolean],
        require: false,
        default: true
      },
      /* 编辑配置|选填 */
      editConfig: {
        type: [Object, Boolean],
        require: false,
        default: false
      },
      /* 查询配置|选填 */
      searchConfig: {
        type: [Object, Boolean],
        require: false,
        default: false
        // () => ({
        //   key: 'name',
        //   placeholder: '请输入内容', // 输入框占位符
        //   maxLength: 20 // 最大长度
        // })
      },
      /* 分页配置|选填 */
      pageConfig: {
        type: [Object, Boolean],
        require: false,
        default: false
        // () => ({
        //   pagePosition: 'right', // 'left', 'middle', 'right'
        //   showSizer: true,
        //   showElevator: true
        // })
      },
      /* 筛选配置|选填 */
      filterConfig: {
        type: [Object, Boolean],
        require: false,
        default: false
        // () => ({
        //   mode: 'transfer' // 'transfer', 'check'
        // })
      },
      /* http请求配置|必填 */
      fetchConfig: {
        type: Object,
        require: true,
        default: () => ({})
      },
      /* 表格id(本地存储用)|选填 */
      id: {
        type: String,
        require: false,
        default: ''
      },
      /* 表格列配置|必填 */
      columns: {
        type: Array,
        require: true,
        default: () => []
      }
    },
    data () {
      return {
        selectedData: [],
        data: [],
        spin: false,
        ids: [],
        tableWidth: 0,
        tableFixedWidth: 0,
        /* 分页相关 */
        size: 10,
        page: 1,
        total: 0,
        url: '',
        params: {},
        forceUpdateSign: {
          flag: false,
          page: 0
        },
        /* 筛选相关 */
        filteredColumns: [],
        /* 筛选多选框 */
        tableColumnsChecked: [],
        disabledSelections: ['多选', '操作', 'selection', 'action'], // 根据type判断是否禁用
        defaultKeys: ['page', 'size'],
        titles: ['已过滤列', '已选择列'],
        modalTransfer: {
          show: false,
          title: '自定义列表',
          exist: false
        },
        transferRightList: [],
        targetKeys: [],
        transferData: [],
        keysToSave: [],
        configColumnsKey: null,
        /* 搜索相关 */
        searchInput: ''
      }
    },
    created () {
      // 获取当前表格对应的全部columns与targetKeys
    },
    mounted () {
      this.calculateTableWidths()
      this.fillTableColumns()
    },
    methods: {
      /* 获得table总宽度与fixed column宽度 */
      calculateTableWidths () {
        let el = this.$refs['table'].$el
        this.tableWidth = parseFloat(dom.getStyle(el, 'width'))
        this.tableFixedWidth = this.columns.filter((item, index, array) => {
          return item.hasOwnProperty('fixed')
        }).reduce((a, b) => {
          return a + b.width
        }, 0)
      },
      /* ----- 分页相关 ----- */
      setPagePosition (pagePosition) {
        let _style
        switch (pagePosition) {
          case 'right':
            // _style = { 'float': 'right' }
            _style = { 'textAlign': 'right' }
            break
          case 'middle':
            // _style = { 'margin': '0 auto', 'float': 'none' }
            _style = { 'textAlign': 'center' }
            break
          case 'left':
            // _style = { 'float': 'left' }
            _style = { 'textAlign': 'left' }
            break
        }
        return _style
      },
      /* 调用加载第n页方法 */
      pageChange (page) {
        this.page = page
        this.load()
      },
      /* 改变页面容量，重新加载 */
      pageSizeChange (size) {
        this.size = size
        this.load()
      },
      setTotal (val) {
        this.total = val
      },
      /* 参数转化为字符串 */
      params2Str (params) {
        let str = ``
        let paramsArray = Object.entries(params)
        let i = 0
        for (let [k, v] of paramsArray) {
          if (!this.defaultKeys.includes(k)) { // 排除页码与每页容积
            if (v) { // 排除undefined
              str += ((i === 0) ? `?` : `&`) + `${k}=${encodeURIComponent(v)}`
              i++
            } else {
              console.log('异常参数：' + k, '异常参数值：' + v)
            }
          }
        }
        return str
      },
      switchSign (page) {
        this.forceUpdateSign.flag = !this.forceUpdateSign.flag
        this.forceUpdateSign.page = page
      },
      refresh () {
        this.resetSelectedData()
        this.$set(this.fetchConfig.params, 'page', 1)
      },
      deletePageAndSizeInConfig () {
        // 该方法不会触发watch监听
        delete this.fetchConfig.params.page
        delete this.fetchConfig.params.size
      },
      /**
       * 加载第n页请求
       * @param page 页码 1
       * @param size 每页项目数 10
       * @param url 请求url ``
       * @param params 参数 ``
       */
      load (/* config, cb */) {
        let config = this.fetchConfig
        if (config) {
          if (config.url) {
            this.url = config.url
          }
          if (config.params) {
            this.params = config.params

            /* 有效的page和size才会被使用 */
            if (window._.isInteger(config.params.page)) {
              this.page = config.params.page
              this.switchSign(config.params.page)
            }
            if (window._.isInteger(config.params.size)) {
              this.size = config.params.size
            }
          }
        }
        if (this.updateSearchKey()) { return false }
        let newPage = common.analysisPage(this.page)
        let paramsStr = this.params2Str(this.params)
        this.spin = true // 展示加载中
        if (this.pageConfig) {
          // 分页请求
          this.$http.get(this.url + paramsStr + (paramsStr ? `&` : `?`) + `page=${newPage}&size=${this.size}`).then((data) => {
            this.deletePageAndSizeInConfig()
            let cdata = data
            this.data = window._.get(cdata, fetchDataFormat.page.content)
            this.total = window._.get(cdata, fetchDataFormat.page.total)
            this.emitTotal(this.total)
            if (this.fetchConfig.callback) {
              this.fetchConfig.callback(data) // 回调
            }
          }).catch((error) => {
            this.$Message.error(`请求错误；错误信息：${error}`)
          }).then(() => { 
            this.spin = false // 关闭加载中
          })
        } else {
          // 不分页请求
          this.$http.get(this.url + paramsStr).then((data) => {
            this.deletePageAndSizeInConfig()
            let cdata = data
            this.data = cdata
            if (this.fetchConfig.callback) {
              this.fetchConfig.callback(data) // 回调
            }
          }).catch((error) => {
            this.$Message.error(`请求错误；错误信息：${error}`)
          }).then(() => { 
            this.spin = false // 关闭加载中
          })
        }
      },
      resetSelectedData () {
        this.selectedData = []
      },
      setselectedData (data) {
        this.selectedData = data
      },
      /* 选中数据 */
      emitSelectionChange (data) {
        this.$emit('on-selection-change', data)
      },
      emitCurrentChange (currentRow, oldCurrentRow) {
        this.$emit('on-current-change', currentRow, oldCurrentRow)
      },
      /**
       * todo 转发table监听的event：
       * on-select
       * on-select-cancel
       * on-select-all
       * on-sort-change
       * on-row-click
       * on-row-dblclick
       * on-expand
       */
      /* ----- 筛选相关 ----- */
      clearStorage () {
        configUtils.clearColumnsKey()
      },
      checkDisabled (item) {
        if (this.disabledSelections.includes(item)) {
          return true
        }
      },
      emitTotal (val) {
        this.$emit('on-total-change', val)
      },
      /* 获取处理后表格列 */
      getTable2Columns () {
        /* 复制表格列副本 */
        const fullColumns = common.fullCopyObj(this.columns)
        /* 初始化筛选table columns */
        let columns = []
        fullColumns.forEach((item) => {
          if (this.tableColumnsChecked.includes('多选') && item.type === 'selection') { // 多选根据type判断
            columns.push(item)
          }
          if (this.tableColumnsChecked.includes(item.title)) { // 其他根据title判断
            columns.push(item)
          }
        })
        /* 返回table columns */
        return columns
      },
      /* 填充表格结构 */
      fillTableColumns () {
        this.updateConfigColumnsKey() // 更新本地存储key
        if (Array.isArray(this.configColumnsKey)) { // 本地存储有对应key
          // 根据key设置columns
          let filteredColumns = []
          this.configColumnsKey.map((key, index, array) => {
            let _item = this.columns.find((item, index, array) => {
              return (item.key || item.type) === key
            })
            filteredColumns.push(_item)
          })
          this.filteredColumns = filteredColumns
        } else { // 本地存储无对应key
          this.filteredColumns = this.getTable2Columns()
        }
        this.$refs['table'].$forceUpdate()
      },
      updateConfigColumnsKey () {
        this.configColumnsKey = configUtils.getColumnsKey(this.id)
      },
      toggleFav (index) {
        this.tableData2[index].fav = this.filteredData[index].fav === 0 ? 1 : 0
      },
      CurrentChange (msg) {

      },
      Select (msg) {

      },
      SelectCancel (msg) {

      },
      SelectAll (msg) {

      },
      SelectionChange (msg) {

      },
      SortChange (msg) {

      },
      RowClick (msg) {

      },
      RowDblclick (msg) {

      },
      Expand (msg) {

      },
      triggerClick (v) {
        let checkValue = window._.reject(v, this.isDisabled)[0]
        let index = this.checkList.indexOf(checkValue)
        let label = this.$refs['check' + index][0].$el
        let input = label.querySelectorAll('input')[0]
        dom.trigger('click', input)
        this.$refs['check' + index][0].$forceUpdate()
      },
      isDisabled (n) {
        return this.disabledSelections.includes(n)
      },
      /* 显示穿梭框 */
      showModalTransfer () {
        // rebuild dom
        // let _this = this
        // this.$set(this.modalTransfer, 'exist', false)
        // this.$nextTick(() => {
        this.$set(this.modalTransfer, 'exist', true)
        this.$nextTick(() => {
          this.$set(this.modalTransfer, 'show', true)
        }, 0)
        // })
      },
      /* 保存配置 */
      saveColumnsConfig () {
        this.$refs['CTransfer'].emit() // 子给父传orderedRightData
        this.setTargetKey()
      },
      /* 获取所有的columns */
      getFullColumns () {
        this.transferData = this.changeColumns2Transfer(this.columns) // 所有columns
      },
      /* 从本地或columns获取targetkey */
      getTargetKey () {
        if (this.configColumnsKey) {
          this.targetKeys = this.configColumnsKey
        } else {
          this.targetKeys = this.changeColumns2Transfer(this.filteredColumns).map((item, index) => {
            return item.key
          })
        }
      },
      /* 将keys保存到本地存储 */
      setTargetKey () {
        let config = configUtils.getColumnsKey() || {}
        let account = loginUtils.getUserInfo().account
        config[account] || (config[account] = {})
        config[account][this.id] = this.keysToSave // 用户下的table
        configUtils.setColumnsKey(config)
        this.fillTableColumns()
      },
      /**
       * @function 将columns数据格式转化为transfer数据格式
       * @param columns
       * @return  { key, label, disabled }
       */
      changeColumns2Transfer (data) {
        let _this = this
        let ds = this.disabledSelections
        return data.map((item, index) => {
          let _item
          _item = {
            key: _this.formatColumnsItemKey(item),
            label: _this.formatColumnsItemLabel(item) + _this.formatColumnsItemKey(item),
            disabled: ds.includes(item.key) || ds.includes(item.type)
          }
          return _item
        })
      },
      /* 保存keysToSave */
      handleRightDataChange (data) {
        let keysToSave = []
        data.map((item, index, array) => {
          keysToSave.push(item.key)
        })
        this.keysToSave = keysToSave
      },
      /* 根据orderedRightData确定filteredColumns */
      changeTransfer2Columns (data) {
        // let ds = this.disabledSelections
        let orderedColumns = []
        data.map((item, index, array) => {
          let column = this.columns.find((_item, index, array) => {
            return (_item.key || _item.type) === item.key
          })
          orderedColumns.push(column)
        })
        this.filteredColumns = orderedColumns // 被筛选的的columns
      },
      exportData (event, type = 1) {
        // if (type === 1) {
        //   this.$refs.table.exportCsv({
        //     filename: '原始数据'
        //   })
        // } else if (type === 2) {
        //   this.$refs.table.exportCsv({
        //     filename: '排序和过滤后的数据',
        //     original: false
        //   })
        // } else if (type === 3) {
        //   this.$refs.table.exportCsv({
        //     filename: '自定义数据',
        //     columns: this.columns8.filter((col, index) => index < 4),
        //     data: this.data7.filter((data, index) => index < 4)
        //   })
        // }
      },
      formatColumnsItemLabel (item) {
        return (item.title || (item.type === 'selection' ? '多选' : '--'))
      },
      formatColumnsItemKey (item) {
        return (item.key || item.type)
      },
      // 重置页数
      resetPage () {
        this.page = 1
      },
      /* ----- 查询相关 ----- */
      doSearch (val) {
        this.resetPage()
        this.updateSearchKey()
      },
      updateSearchKey () {
        let hasTriggeredLoad = false
        if (!this.searchConfig) { return hasTriggeredLoad }
        if (this.fetchConfig.params[this.searchConfig.key] !== this.searchInput) {
          this.$set(this.fetchConfig.params, this.searchConfig.key, this.searchInput) // 设置fetchConfig中用于查询的参数键值对
          hasTriggeredLoad = true
        }
        return hasTriggeredLoad
      }
    },
    watch: {
      selectedData (v) {
        this.emitSelectionChange(v)
      },
      filteredColumns (v) {
        let filteredWidth = v.filter((item, index, array) => {
          return !item.hasOwnProperty('fixed')
        }).reduce((a, b) => {
          return a + (b.width)
        }, 0)
        console.log(filteredWidth, this.tableWidth, this.tableFixedWidth)
        if (filteredWidth < this.tableWidth - this.tableFixedWidth) {
          v.map((item, index, array) => {
            if (!item.hasOwnProperty('fixed')) {
              item.deletedWidth = item.width
              delete item.width
            }
          })
          console.log(v, 'fixed')
        } else {
          v.map((item, index, array) => {
            if ((!item.hasOwnProperty('fixed')) && item.hasOwnProperty('deletedWidth')) {
              item.width = item.deletedWidth
              delete item.deletedWidth
            }
          })
          console.log(v, 'deletedWidth')
        } 
        this.$refs['table'].$forceUpdate()
      },
      // 分页相关
      'forceUpdateSign.flag' (v) {
        let VMPage = this.$refs['page']
        VMPage.currentPage = this.forceUpdateSign.page
        VMPage.$forceUpdate()
      },
      /* 监听checkbox变化 */
      tableColumnsChecked (newV, oldV) {
        /* 如果不存在禁用勾选项之外的任何勾选项 */
        if (!window._.reject(newV, this.isDisabled).length) {
          this.tableColumnsChecked = oldV
          this.$Message.warning('请至少保留一条有效列内容！')
          this.triggerClick(oldV) // 模拟触发点击（最后一个被取消的勾选恢复勾选状态）
        }
        /* 更改表格列配置 */
        if (this.isCheckMode) { // 在check模式下修改filteredColumns
          this.filteredColumns = this.getTable2Columns()
        }
      },
      'modalTransfer.show' (v) {
        if (v) {
          this.getFullColumns()
          this.getTargetKey()
        } else {
          this.$refs['CTransfer'].reset()
          this.$nextTick(() => {
            this.$set(this.modalTransfer, 'exist', false)
          })
        }
      },
      fetchConfig: {
        handler (v) {
          this.$emit('on-fetch-config-change', v)
          this.load(v) // 监听fetchConfig数据变化自动请求
        },
        deep: true
      }
    },
    computed: {
      // 筛选相关
      checkList () {
        let list = Object.values(this.columns).map((item) => {
          return this.formatColumnsItemLabel(item)
        })
        /* 初始化被勾选项目为全部 */
        this.tableColumnsChecked = list
        return list
      },
      isCheckMode () {
        return this.filterConfig.mode === 'check'
      },
      isTransferMode () {
        return this.filterConfig.mode === 'transfer'
      }
    }
  }
</script>

<style lang="scss">
  /* stylelint-disable */
  .func-table {
    padding-bottom: 150px;
    // .topPosition {
    //   position: relative;
      .topButton {
        width: auto;
        height: 38px;
        border-radius: 10px 10px 0 0;
        line-height: 38px;
        border-bottom: none;
        background-color: #f8f8f9;
        float: right;
      }
    // }
    .but_c {
      cursor: pointer;
      padding: 0 10px;
      background: none;
      border-top-style: none;
      border-right-style: none;
      border-bottom-style: none;
      border-left-style: none;
      outline:none;
    }
  }
</style>
