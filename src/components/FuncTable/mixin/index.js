var FuncTable = {
  data () {
    return {
      /* 功能表格配置项 */
      refreshable: false, // 刷新配置
      pageConfig: {
        showSizer: true, // 配置iview中的show-sizer。
        showElevator: true, // 配置iview中的show-elevator。
        pagePosition: 'right' // 分页位置，提供'left', 'middle', 'right'三种模式。
      },
      data: [],
      ids: [],
      columns: [],
      searchConfig: {
        placeholder: '请输入查询条件', // 查询框占位符。
        key: 'id', // 查询请求依赖的参数。
        maxlength: 20 // 查询框支持的最大长度。
      },
      filterConfig: false, // 筛选配置
      fetchConfig: {} // 必填（初始化时为空对象，在load方法内填充配置）。
    }
  },
  methods: {
    load () { // 通过改变http请求的配置(url,参数)自动触发组件内请求事件。
      this.fetchConfig = { // 请按照此格式配置！
        url: '/api/please-change-this-url', // 请求url。
        params: {}, // 参数。（不需要配置page与size）
        callback: (data) => { // 请求成功回调。（请务必用箭头函数修正this指向！）
          // data.content.length = 0
        }
      }
    },
    handleOnSelChange (data) {
      let newIds = data.map((item, index, array) => {
        return item.id
      })
      this.ids.push(...newIds) // 合并多页勾选的id
      this.ids = _.uniq(this.ids) // 去重
    },
    handleOnDataChange (data) {
      this.data = data
    }
  }
}

export default FuncTable
