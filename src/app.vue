<template>
  <div id="app" style="width: 80%; margin: 50px auto">
      <button-group class="mb-10">
          <Button @click="switchCMode">check模式</Button>
          <Button @click="switchTMode">transfer模式</Button>
      </button-group>
      <func-table
        id="table-001"
        :columns="columns"
        :pageConfig="pageConfig"
        :searchConfig="searchConfig"
        :filterConfig="filterConfig"
        @on-selection-change="getIds"
        v-model="fetchConfig">
        <div slot="batch-operation">
          <Button @click="handlerAdd">添加</Button>
          <Button @click="handlerBatchDel">删除</Button>
        </div>
      </func-table>
  </div>
</template>

<script>
import loginUtils from '@/utils/loginUtils'
import FuncTable from '@/components/FuncTable'

export default {
  name: 'app',
  components: {
    FuncTable
  },
  data () {
    return {
      msg: '请求中。。。', // 这个不是必须的，只是为了展示回调的功能。。。
      pageConfig: { // 值为fasle则无分页功能。
        showSizer: true, // 配置iview中的shiw-sizer。
        showElevator: true, // 配置iview中的shiw-elevator。
        pagePosition: 'right' // 分页位置，提供'left', 'middle', 'right'三种模式。
      },
      columns: [ // 必填
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '用户名',
            key: 'account',
            render: (h, {row, column, index}) => {
                return h('div', [
                h('Button', {
                    props: {
                    type: 'text',
                    size: 'small'
                    },
                    on: {
                    click: () => {
                        alert(this.msg)
                    }
                    }
                }, row.account)
                ]);
            }
        },
        {
            title: '用户昵称',
            key: 'name'
        },
        {
            title: '用户工号',
            key: 'id'
        },
        {
            title: '手机号',
            key: 'mobile'
        },
        {
            title: '审核状态',
            key: 'auditStatus'
        },
        {
            title: '是否启用',
            key: 'isActive',
            render: (h, {row, column, index}) => {
                let isActive = row.isActive;
                return h('div', [
                    h('span', {
                        class: isActive == 1 ? ['ligth-blue'] : ['text-red']
                    }, isActive == 1 ? '启用' : '禁用')
                ]);
            }
            },
            {
            title: '操作',
            key: 'action',
            render: (h, {row, column, index}) => {
                let id = row.id
                let isActive = row.isActive;
                return h('div', [
                    h('Button', {
                        props: {
                        type: 'text',
                        size: 'small'
                        },
                        style: {
                        marginRight: '5px'
                        },
                        on: {
                        click: () => {
                            alert(`编辑项的id:${id}`)
                        }
                        }
                    }, '编辑'),
                    h('Button', {
                        props: {
                        type: 'text',
                        size: 'small'
                        },
                        on: {
                        click: () => {
                            if(isActive == 1){
                                alert(`禁用项的id:${id}`)
                            }
                            if(isActive == 0){
                                alert(`启用项的id:${id}`)
                            }
                        }
                        }
                    }, isActive == 1 ? '禁用':'启用'),
                    h('Button', {
                        props: {
                        type: 'text',
                        size: 'small'
                        },
                        on: {
                        click: () => {
                            alert(`删除项的id:${id}`)
                        }
                        }
                    }, '删除')
                ]);
            }
        }
      ], 
      searchConfig: { // 值为fasle则无查询功能。
        placeholder: '请输入xxx', // 查询框占位符。
        key: 'account', // 查询请求依赖的参数。
        maxlength: 20 // 查询框支持的最大长度。
      },
      filterConfig: { // 值为fasle则无筛选功能。
        mode: 'check' // 筛选功能的前端展示模式，提供'check', 'transfer'两种模式。
      },
      fetchConfig: {}, // 必填（初始化时为空对象，在load方法内填充配置）。
      ids: []
    }
  },
  created () {
    loginUtils.setUserInfo({ account: 'admin' }) // 筛选配置保存到localstorage的依赖，可以不配置。
  },
  mounted () {
    this.load() // 初始化加载,在created钩子函数里需要在$nextTick回调内执行。
  },
  methods: {
    switchCMode () {
      this.$set(this.filterConfig, 'mode', 'check')
    },
    switchTMode () {
      this.$set(this.filterConfig, 'mode', 'transfer')
    },
    handlerAdd () {
      alert(`添加一条内容`)
    },
    handlerBatchDel () {
      alert(`要删除的项id为：${ (this.ids.length ? this.ids : '--') }`)
    },
    load () { // 通过改变http请求的配置(url,参数)自动触发组件内请求事件。
      this.fetchConfig = { // 请按照此格式配置！
        url: '/account', // 请求url。
        params: {}, // 参数。（不需要配置page与size）
        callback: (data) => { // 请求成功回调。（请务必用箭头函数修正this指向！）
          // data.content.length = 0
          this.msg = '请求成功！'
        }
      }
    },
    getIds (data) {
        this.ids = data.map((item, index, array) => {
            return item.id
        })
        console.log(this.ids, data)
    }
  }
}
</script>

<style lang="scss">
@import './styles/index.scss'; // 全局自定义的css样式

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
