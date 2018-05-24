<template>
  <div class="func-table">
    <!-- 批量操作组 + 查询 -->
    <div class="clearfix func-table-top mb-10">
      <!-- 批量操作组（slot） -->
      <div class="func-table-batch-operation f-l" :style="{ width: searchConfig ? 'auto' : '100%' }">
        <slot name="batch-operation">
          <!-- <Button>添加</Button>
          <Button>删除</Button> -->
        </slot>
      </div>
      <div class="func-table-refresh f-l ml-5" v-show="refreshable">
        <i-button icon="refresh" @click="refresh">刷新</i-button>
      </div>
      <form class="func-table-search f-r"
        @keypress.enter.prevent="doSearch(searchInput)" v-if="searchConfig">
        <div class="clearfix">
          <Button-group class="f-r ml-10">
            <i-button
              icon="ios-search"
              class="f-r"
              @click.stop="doSearch(searchInput)">查询</i-button>
          </Button-group>
          <Button-group class="f-r ml-10">
            <i-input v-model="searchInput" :placeholder="searchConfig.placeholder"
              :maxlength="searchConfig.maxLength" class="ivu-input-default f-r"></i-input>
          </Button-group>
        </div>
      </form>
    </div>
    <!-- 表格 + 筛选组件 -->
    <div class="func-table-main mb-10">
      <div class="func-table-filter" v-if="filterConfig">
        <div v-if="modalTransfer.exist">
          <Modal v-show="isTransferMode"
            ok-text="保存"
            cancel-text="重置"
            v-model="modalTransfer.show"
            :title="modalTransfer.title"
            width="720px"
            @on-ok="saveColumnsConfig">
            <CTransfer ref="CTransfer"
              :disabledSelections="disabledSelections"
              :data="transferData"
              :operations="['删除', '添加']"
              v-model="targetKeys"
              :titles="titles"
              @on-right-data-change="handleRightDataChange"></CTransfer>
          </Modal>
        </div>
        <div class="clearfix">
          <Checkbox-group ref="checkList" class="mt-10 f-l"
            v-show="isCheckMode"
            v-model="tableColumnsChecked"
            @on-change="fillTableColumns">
            <Checkbox :ref="'check' + index"
              v-for="(item, index) in checkList"
              :disabled="checkDisabled(item)"
              :label="item" :key="item"></Checkbox>
          </Checkbox-group>
          <slot name="default">
            <div class="topButton">
              <button class="but_c" @click="clearStorage">
                <Icon type="ios-upload-outline" size="18"></Icon>恢复默认配置
              </button>
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
        <i-table stripe ref="table"
          class="f-14"
          v-bind="$props"
          :columns="filteredColumns"
          :id="id"
          @on-current-change="emitCurrentChange"
          @on-select="emitSelect"
          @on-select-cancel="emitSelectCancel"
          @on-select-all="emitSelectAll"
          @on-selection-change="setSelectedData"
          @on-sort-change="emitSortChange"
          @on-filter-change="emitFilterChange"
          @on-row-click="emitRowClick"
          @on-row-dblclick="emitRowDblclick"
          @on-expand="emitExpand"
          >
        </i-table>
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
        :size="pageConfig.size || 'small'"
        :total="total"
        :page-size="pageSize"
        :show-elevator="pageConfig.showElevator || true"
        :show-sizer="pageConfig.showSizer || true"
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
   * 1. 父组件中的回调函数要用箭头函数修复this指向问题。
   * 2. transfer里的key定义规则：columes中存在key则为key，不存在则为type。
   * 3. 每个table都需要用id来标记，用途是获取本地存储对应的配置对象。
   */
  import CTransfer from '@/components/Transfer/Index'
  import configUtils from './configUtils'
  import common from '@/utils/common'
  import dom from '@/utils/dom'
  import loginUtils from '@/utils/loginUtils'
  import fetchDataFormat from './fetchDataFormat'
  import {Table as iTable, Input as iInput, Button as iButton, Icon, Page, Checkbox, CheckboxGroup, ButtonGroup, Modal, Spin} from 'iview'

  export default {
    name: 'FuncTable',
    model: {
      prop: 'fetchConfig',
      event: 'on-fetch-config-change'
    },
    components: {
      CTransfer,
      iTable,
      iInput,
      iButton,
      Icon,
      Page,
      Checkbox,
      CheckboxGroup,
      ButtonGroup,
      Modal,
      Spin
    },
    props: {
      ...iTable.props,
      columns: {
        type: Array,
        default () {
          return []
        }
      },
      /* 表格id(本地存储用)|选填 */
      id: {
        type: String,
        // required: false,
        default: ''
      },
      // 勾选的id
      ids: {
        type: [Array],
        // required: true,
        default: () => []
      },
      /* 可否刷新|选填 */
      refreshable: {
        type: [Boolean],
        // required: false,
        default: true
      },
      /* 编辑配置|选填 */
      editConfig: {
        type: [Object, Boolean],
        // required: false,
        default: false
      },
      /* 查询配置|选填 */
      searchConfig: {
        type: [Object, Boolean],
        // required: false,
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
        // required: false,
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
        // required: false,
        default: false
        // () => ({
        //   mode: 'transfer' // 'transfer', 'check'
        // })
      },
      /* http请求配置|必填 */
      fetchConfig: {
        type: Object,
        // required: true,
        default: () => ({})
      }
    },
    data () {
      return {
        selectedData: [],
        spin: false,
        dataBeforeFilter: [],
        /* 分页相关 */
        pageSize: 10,
        page: 1,
        total: 0,
        url: '',
        params: {},
        forceUpdateSign: {
          flag: false,
          page: 0
        },
        /* 筛选相关 */
        filteredColumns: this.columns,
        /* 筛选多选框 */
        tableColumnsChecked: [],
        defaultKeys: ['page', 'size'],
        titles: ['可选字段', '已选字段'],
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
        searchInput: '',
        /* 刷新相关 */
        refreshTable: true
      }
    },
    computed: {
      disabledSelections () {
        let disabledSelections = {
          before: [],
          after: []
        }
        this.columns.filter((item, index, array) => {
          return item.hasOwnProperty('filterDisable')
        }).map((item, index, array) => {
          switch (item['filterDisable']) {
            case 'before':
              disabledSelections['before'].push(item.key || item.type)
              break
            case 'after':
              disabledSelections['after'].push(item.key || item.type)
              break
            default:
              break
          }
        })
        return disabledSelections
      },
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
      },
      isFrontPage () { // 前端分页
        return (this.pageConfig.mode === 'front')
      },
      postData () {
        return this.fetchConfig.postData || null
      },
    },
    watch: {
      columns: {
        handler (v) {
          this.filteredColumns = v
          // this.refresh()
          // this.clearStorage() // 强制清空
          // if (this.isCheckMode || this.isTransferMode) {
          //   this.fillTableColumns()
          // }
        },
        deep: true
      },
      selectedData (v) {
        this.emitSelectionChange(v)
      },
      // 分页相关
      'forceUpdateSign.flag' (v) {
        let VMPage = this.$refs['page']
        VMPage.currentPage = this.forceUpdateSign.page
        VMPage.$forceUpdate()
      },
      filteredColumns: {
        handler (v) {
          this.fixWidth(v)
        },
        deep: true
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
            setTimeout(() => {
              this.$set(this.modalTransfer, 'exist', false)
            }, 300)
          })
        }
      },
      fetchConfig: {
        handler (v) {
          this.refreshTable = true
          if (this.pageConfig) {
            this.resetPage()
          }
          this.$emit('on-fetch-config-change', v)
          this.load() // 监听fetchConfig数据变化自动请求
        },
        deep: true
      }
    },
    created () {
      // 获取当前表格对应的全部columns与targetKeys
      this.fixWidth(this.filteredColumns)
    },
    mounted () {
      if (this.isCheckMode || this.isTransferMode) {
        this.fillTableColumns()
      }
    },
    methods: {
      fixWidth (filteredColumns) {
        /* 处理宽度太少不够填满整个表格的情况 */
        const lastIndex = filteredColumns.length
        if (!window._.some(filteredColumns, ['fixWidth', true])) {
          let lastNotFixedIndex

          if (window._.some(filteredColumns, ['fixed', 'right'])) {
            lastNotFixedIndex = filteredColumns.findIndex((item) => {
              return item.fixed && item.fixed === 'right'
            })
          } else {
            lastNotFixedIndex = filteredColumns.length
          }

          if (lastNotFixedIndex === lastIndex) {
            lastNotFixedIndex -= 1
          }

          filteredColumns.splice(lastNotFixedIndex, 0, {
            fixWidth: true, // 该column为了修正width而存在
            key: window.Null,
            title: ' ' // 不填充为空格则会自动填充#
          })
        }
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
          default:
            _style = { 'textAlign': 'right' }
        }
        return _style
      },
      /* 调用加载第n页方法 */
      pageChange (page) {
        this.page = page
        if (this.isFrontPage) {
          this.filterInFront()
        } else {
          this.load()
        }
      },
      /* 改变页面容量，重新加载 */
      pageSizeChange (size) {
        this.pageSize = size
        if (this.isFrontPage) {
          this.filterInFront()
        } else {
          this.load()
        }
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
              // console.warn('异常参数：' + k, '异常参数值：' + (typeof v === 'string' && '（空字符串）'))
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
        this.refreshTable = true
        if (this.pageConfig && this.page !== 1) {
          this.$set(this.fetchConfig.params, 'page', 1)
        }
        this.$set(this.fetchConfig, 'refreshFlag', this.fetchConfig.refreshFlag ? !this.fetchConfig.refreshFlag : true) // 触发刷新
      },
      deletePageAndSizeInConfig () {
        // 该方法不会触发watch监听
        delete this.fetchConfig.params.page
        delete this.fetchConfig.params.pageSize
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
            if (window._.isInteger(config.params.pageSize)) {
              this.pageSize = config.params.pageSize
            }
          }
        }
        if (this.updateSearchKey()) { return false }
        let paramsStr = this.params2Str(this.params)
        this.spin = true // 展示加载中
        if (this.pageConfig) { // 前端分页or后端分页
          if (this.isFrontPage) { // 前端分页
            if (this.refreshTable) { // 发送请求
              this.fetchWithoutPage(paramsStr)
            } else { // 不请求
              this.filterDataByPage()
            }
          } else { // 后端分页
            this.fetchWithPage(paramsStr)
          }
        } else { // 不分页
          this.fetchWithoutPage(paramsStr)
        }
      },
      /* 前端分页 */
      filterDataByPage () {
        const dataChunks = window._.chunk(this.dataBeforeFilter, this.pageSize)
        const res = dataChunks[this.page - 1]
        this.$nextTick(() => {
          this.$emit('on-data-change', res)
          this.spin = false
        })
      },
      /* 分页请求 */
      fetchWithPage (paramsStr) {
        let newPage = common.analysisPage(this.page)
        this.$http.get(this.url + paramsStr + (paramsStr ? `&` : `?`) + `page=${newPage}&size=${this.pageSize}`).then((data) => {
          if (this.fetchConfig.callback) {
            this.fetchConfig.callback(data) // 回调
          }
          this.refreshTable = false
          this.deletePageAndSizeInConfig()
          let cdata = data
          let res = window._.get(cdata, fetchDataFormat.page.content)
          res.map((item) => { // 回显勾选项
            if (this.ids.includes(item['id'])) {
              item._checked = true
            }
          })
          this.updateDataBeforeFilter(res) // 保存筛选前数据
          this.$emit('on-data-change', res) // 触发父组件data变化
          this.total = window._.get(cdata, fetchDataFormat.page.total)
          this.emitTotal(this.total)
        }).catch((error) => {
          this.$Message.error(`请求错误；错误信息：${error}`)
        }).then(() => {
          this.spin = false // 关闭加载中
        })
      },
      /* 不分页请求 */
      fetchWithoutPage (paramsStr) {
        if (this.fetchConfig.method === 'post') {
          this.$http.post(this.url, this.postData).then((data) => {
            this.refreshTable = false
            let cdata = data
            let res = window._.get(cdata, fetchDataFormat.data, cdata)
            this.updateDataBeforeFilter(res) // 保存筛选前数据
            if (this.fetchConfig.callback) {
              this.fetchConfig.callback(data) // 回调(由于后端返回的数据结构可能不按照table要求的数据格式返回，此处可能会洗数据，所以回调在部分操作之后执行以实现覆盖。)
            }
            if (this.isFrontPage) {
              this.total = this.dataBeforeFilter.length
              this.filterDataByPage()
            } else {
              this.$emit('on-data-change', res) // 触发父组件data变化
            }
          }).catch((error) => {
            console.log(error)
            this.$Message.error(`请求错误；错误信息：${error}`)
          }).then(() => {
            this.spin = false // 关闭加载中
          })
        } else {
          this.$http.get(this.url + paramsStr).then((data) => {
            this.refreshTable = false
            let cdata = data
            let res = window._.get(cdata, fetchDataFormat.data, cdata)
            this.updateDataBeforeFilter(res) // 保存筛选前数据
            if (this.fetchConfig.callback) {
              this.fetchConfig.callback(data) // 回调(由于后端返回的数据结构可能不按照table要求的数据格式返回，此处可能会洗数据，所以回调在部分操作之后执行以实现覆盖。)
            }
            if (this.isFrontPage) {
              this.total = this.dataBeforeFilter.length
              this.filterDataByPage()
            } else {
              this.$emit('on-data-change', res) // 触发父组件data变化
            }
          }).catch((error) => {
            this.$Message.error(`请求错误；错误信息：${error}`)
          }).then(() => {
            this.spin = false // 关闭加载中
          })
        }
      },
      /* 同步筛选前data与请求返回的data */
      updateDataBeforeFilter (data) {
        this.dataBeforeFilter = data
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
        if (this.disabledSelections.before.includes(item) || this.disabledSelections.after.includes(item)) {
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
      resetSelectedData () {
        this.selectedData = []
      },
      setSelectedData (data) {
        this.selectedData = data
      },
      /* emit事件 */
      emitCurrentChange (currentRow, oldCurrentRow) {
        this.$emit('on-current-change', currentRow, oldCurrentRow)
      },
      emitSelect (selection, row) {
        this.$emit('on-select', selection, row)
      },
      emitSelectCancel (selection, row) {
        this.$emit('on-select-cancel', selection, row)
      },
      emitSelectAll (selection) {
        this.$emit('on-select-all', selection)
      },
      emitSelectionChange (selection) {
        this.$emit('on-selection-change', selection)
      },
      emitSortChange (column, key, order) {
        this.$emit('on-sort-change', column, key, order)
      },
      emitFilterChange (currentCol) {
        this.$emit('on-filter-change', currentCol)
      },
      emitRowClick (currentRow, index) {
        this.$emit('on-row-click', currentRow, index)
      },
      emitRowDblclick (currentRow, index) {
        this.$emit('on-row-dblclick', currentRow, index)
      },
      emitExpand (row, status) {
        this.$emit('on-expand', row, status)
      },
      triggerClick (v) {
        let checkValue = window._.reject(v, this.isDisabled)[0]
        let index = this.checkList.indexOf(checkValue)
        let label = this.$refs['check' + index][0].$el
        let input = label.querySelectorAll('input')[0]
        dom.trigger(input, 'click')
        this.$refs['check' + index][0].$forceUpdate()
      },
      isDisabled (n) {
        return this.disabledSelections.before.includes(n) || this.disabledSelections.after.includes(n)
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
        let dsb = this.disabledSelections.before
        let dsa = this.disabledSelections.after
        return data.map((item, index) => {
          let _item
          _item = {
            key: _this.formatColumnsItemKey(item),
            label: _this.formatColumnsItemLabel(item) + _this.formatColumnsItemKey(item),
            disabled: dsb.includes(item.key) ||
              dsb.includes(item.type) ||
              dsa.includes(item.key) ||
              dsa.includes(item.type)
          }
          return _item
        })
      },
      /* 保存keysToSave */
      handleRightDataChange (data) {
        let keysToSave = []
        data.map((item, index, array) => {
          if (item) { // 过滤添加一个空的填充宽度用column导致多出一个undefined项
            keysToSave.push(item.key)
          }
        })
        this.keysToSave = keysToSave
      },
      /* 根据orderedRightData确定filteredColumns */
      changeTransfer2Columns (data) {
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
        // 导出excel
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
        this.$refs['page'].currentPage = 1
      },
      /* ----- 查询相关 ----- */
      doSearch (val) {
        if (this.pageConfig && !this.isFrontPage) { // 请求查找
          this.resetPage()
          this.updateSearchKey()
        } else { // 前端筛选（包括分页不分页
          if (this.isFrontPage && this.page !== 1) {
            this.resetPage()
          } else {
            this.filterInFront()
          }
        }
      },
      filterInFront () {
        const filteredData = this.dataBeforeFilter.filter((item) => {
          return String(item[this.searchConfig.key]).includes(this.searchInput)
        })
        if (this.isFrontPage) {
          this.total = filteredData.length
          this.$emit('on-data-change', window._.chunk(filteredData, this.pageSize)[this.page - 1])
        } else {
          this.$emit('on-data-change', filteredData)
        }
      },
      updateSearchKey () {
        let triggerLoad = false
        const searchKey = this.searchConfig.key
        if (!this.searchConfig) { return triggerLoad } // 没有搜索选项
        if (searchKey && (this.fetchConfig.params[searchKey] !== this.searchInput)) {
          this.$set(this.fetchConfig.params, searchKey, this.searchInput) // 设置fetchConfig中用于查询的参数键值对
          triggerLoad = true
        }
        return triggerLoad
      }
    }
  }
</script>

<style lang="scss">
  /* stylelint-disable */
  .func-table {
    .func-table-page {
      padding-bottom: 150px;
    }

    .func-table-batch-operation button {
      margin-right:3px;
    }
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
