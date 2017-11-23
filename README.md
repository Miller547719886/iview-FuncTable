# iview-FuncTable
基于iview框架的功能表格组件

目前支持的功能：表头筛选/查询/分页/批量操作/刷新

### 功能

1. 支持表格列筛选（勾选框、穿梭框两种模式）（100%）
2. 支持分页（100%）
3. 支持搜索（100%）
4. 支持批量操作（100%）

### 用法

```html
<!-- template -->
<func-table
  id="table-001"
  :columns="columns"
  :pageConfig="pageConfig"
  :searchConfig="searchConfig"
  :filterConfig="filterConfig"
  v-model="fetchConfig"></func-table>
```

```javascript
/* script */
import FuncTable from '@/components/FuncTable/index' // 首先导入组件
export default {
  components: {
    FuncTable // 记得在这里声明一下
  },
  data () {
    return {
      msg: '请求中。。。', // 这个不是必须的，只是为了展示回调的功能。。。
      pageConfig: { // 值为fasle则无分页功能。
        showSizer: true, // 配置iview中的shiw-sizer。
        showElevator: true, // 配置iview中的shiw-elevator。
        pagePosition: 'right' // 分页位置，提供'left', 'middle', 'right'三种模式。
      },
      columns: [...], // 必填，按照普通columns填写即可。
      searchConfig: { // 值为fasle则无查询功能。
        placeholder: '请输入xxx', // 查询框占位符。
        key: 'name', // 查询请求依赖的参数。
        maxlength: 20 // 查询框支持的最大长度。
      },
      filterConfig: { // 值为fasle则无筛选功能。
        mode: 'transfer' // 筛选功能的前端展示模式，提供'check', 'transfer'两种模式。
      },
      fetchConfig: {} // 必填（初始化时为空对象，在load方法内填充配置）。
    }
  },
  mounted () {
    this.load() // 初始化加载,在created钩子函数里需要在$nextTick回调内执行。
  },
  methods: {
    load () { // 通过改变http请求的配置(url,参数)自动触发组件内请求事件。
      this.fetchConfig = { // 请按照此格式配置！
        url: '/account', // 请求url。
        params: {}, // 参数。（不需要配置page与size）
        callback: (data) => { // 请求成功回调。（请务必用箭头函数修正this指向！）
          // data.content.length = 0
          this.msg = '请求成功！'
        }
      }
    }
  }
}
```

### 须知

1. 怎样才能正常使用该组件？

    只要你使用iview组件库并且使用axios实现数据请求，然后：

    * 配置好fetchDataFormat.js的选项

    就可以正常使用了。

2. 为什么请求配置(fetchConfig)要用v-model绑定？

    因为在查询功能中会根据用户输入的值动态修改fetchConfig中的params字段，需要返回到父组件完成修改。

3. 如何在父组件中实现数据请求？

    只要修改fetchConfig中的任意配置即可。（因为组件中会深度监听该对象，任何修改都会触发请求。）
    
### 演示

#### 表格操作(分组与单项)

![表格操作](https://raw.githubusercontent.com/Miller547719886/iview-FuncTable/master/gif/cz.gif)

#### 表格分页/查询/刷新

![表格操作](https://raw.githubusercontent.com/Miller547719886/iview-FuncTable/master/gif/fy_refresh.gif)

#### 表格筛选(check模式)

![表格操作](https://raw.githubusercontent.com/Miller547719886/iview-FuncTable/master/gif/sx_check.gif)

#### 表格筛选(transfer模式)

![表格操作](https://raw.githubusercontent.com/Miller547719886/iview-FuncTable/master/gif/sx_transfer.gif)
