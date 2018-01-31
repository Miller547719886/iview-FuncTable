var FuncTable = {
  data () {
    /* 预设表格相关配置 */
    return {
      refreshable: false,
      pageConfig: {
        size: 'small', // page样式精简
        showSizer: true, // 配置iview中的show-sizer。
        showElevator: true, // 配置iview中的show-elevator。
        pagePosition: 'right', // 分页位置，提供'left', 'middle', 'right'三种模式。
        mode: 'back' // front(前端分页) or back(后端分页)
      },
      data: [],
      ids: [],
      columns: [],
      CRUDKey: 'id',
      searchConfig: {
        placeholder: '请输入查询条件', // 查询框占位符。
        key: 'id', // 查询请求依赖的参数。
        maxlength: 20 // 查询框支持的最大长度。
      },
      filterConfig: false,
      fetchConfig: {} // 必填（初始化时为空对象，在load方法内填充配置）。
    }
  },
  /* 预设表格相关方法 */
  methods: {
    /* 加载 */
    loadFT () { // 通过改变http请求的配置(url,参数)自动触发组件内请求事件。
      this.fetchConfig = { // 请按照此格式配置！
        url: '/please-change-this-url', // 请求url。
        params: {}, // 参数。（不需要配置page与size）
        callback: (data) => { // 请求成功回调。（请务必用箭头函数修正this指向！）
          // data.content.length = 0
        }
      }
    },
    /* 获取勾选的data */
    handleOnSelChangeFT (data, key) {
      let newIds = data.map((item, index, array) => {
        if (key) {
          return item[key] // 自定义标识
        } else {
          return item[this.CRUDKey]
        }
      })
      this.ids.map((item, index, array) => {
        if (!newIds.includes(item)) { // 如果新数组不包含源id
          array.splice(index, 1) // 代表删除了该id
        }
      })
      this.ids.push(...newIds) // 合并多页勾选的id
      this.ids = _.uniq(this.ids) // 去重
    },
    /* 获取请求返回的全部数据（用于处理请求不仅仅返回表格数据还返回其他数据导致需要筛选数据的情况） */
    handleOnDataChangeFT (data) {
      this.data = data
    },
    /* 刷新 */
    refreshFT () {
      this.fetchConfig = window._.cloneDeep(this.fetchConfig)
    },
    /* 批量删除 */
    handleBatchDel (ids) {
      if (!ids.length) {
        this.$Message.warning('您还未做选择！')
      } else {
        this.$Modal.confirm({
          title: '删除确认',
          content: '您确定要批量删除吗？'
        })
      }
    },
    /* 操作-查看 */
    handleWatch (row, index) { // 查看详情
      console.log(row, index, 'handleWatch')
    },
    /* 操作-删除 */
    handleDel (row, index) {
      console.log(row, index, 'handleDel')
    },
    /* 操作-编辑 */
    handleEdit (row, index) {
      console.log(row, index, 'handleEdit')
    }
  }
}

export default FuncTable
