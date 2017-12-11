<template>
  <div id="app" style="width: 80%; margin: 50px auto">
      <button-group class="mb-10">
          <Button @click="switchCMode">check模式</Button>
          <Button @click="switchTMode">transfer模式</Button>
      </button-group>
      <func-table
        id="table-001"
        :ids="ids"
        :data="data"
        :refreshable="refreshable"
        :columns="columns"
        :pageConfig="pageConfig"
        :searchConfig="searchConfig"
        :filterConfig="filterConfig"
        @on-data-change="handleOnDataChange"
        @on-selection-change="handleOnSelChange"
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
import FuncTableMixin from '@/components/FuncTable/mixin'

export default {
  name: 'app',
  components: {
    FuncTable
  },
  mixins: [FuncTableMixin],
  data () {
    return {
      msg: '请求中。。。',
      refreshable: true,
      filterConfig: {
        mode: 'transfer'    
      },
      columns: [ // 必填
        {
            type: 'selection',
            width: 60,
            align: 'center',
            fixed: 'left',
            filterDisable: 'before' // 前置默认选项(不受筛选控制)
        },
        {
            title: '用户名',
            key: 'account',
            width: 120,
            render: (h, {row, column, index}) => {
                return h('div', [
                h('Button', {
                    props: {
                    type: 'text',
                    size: 'small'
                    },
                    style: {
                        'paddingLeft': 0
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
            width: 120,
            key: 'name'
        },
        {
            title: '用户工号',
            width: 120,
            key: 'id'
        },
        {
            title: '手机号',
            width: 120,
            key: 'mobile'
        },
        {
            title: '审核状态',
            width: 120,
            key: 'auditStatus'
        },
        {
            title: '是否启用',
            width: 120,
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
            title: 'a',
            width: 120,
            key: 'a'
        },
        {
            title: 'aa',
            width: 120,
            key: 'aa'
        },
        {
            title: 'aaa',
            width: 120,
            key: 'aaa'
        },
        {
            title: 'b',
            width: 120,
            key: 'b'
        },
        {
            title: 'bb',
            width: 120,
            key: 'bb'
        },
        {
            title: 'bbb',
            width: 120,
            key: 'bbb'
        },
        {
            title: 'c',
            width: 120,
            key: 'c'
        },
        {
            title: 'cc',
            width: 120,
            key: 'cc'
        },
        {
            title: 'ccc',
            width: 120,
            key: 'ccc'
        },
        {
            title: 'd',
            width: 120,
            key: 'd'
        },
        {
            title: 'dd',
            width: 120,
            key: 'dd'
        },
        {
            title: 'ddd',
            width: 120,
            key: 'ddd'
        },
        {
            title: 'e',
            width: 120,
            key: 'e'
        },
        {
            title: 'ee',
            width: 120,
            key: 'ee'
        },
        {
            title: 'eee',
            width: 120,
            key: 'eee'
        },
        {
            title: 'f',
            width: 120,
            key: 'f'
        },
        {
            title: 'ff',
            width: 120,
            key: 'ff'
        },
        {
            title: 'fff',
            width: 120,
            key: 'fff'
        },
        {
            title: 'g',
            width: 120,
            key: 'g'
        },
        {
            title: 'gg',
            width: 120,
            key: 'gg'
        },
        {
            title: 'ggg',
            width: 120,
            key: 'ggg'
        },
        {
            title: '操作',
            key: 'action',
            width: 170,
            fixed: 'right',
            filterDisable: 'after', // 后置默认选项(不受筛选控制)
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
      ]
    }
  },
  created () {
    loginUtils.setUserInfo({ account: 'admin' }) // 筛选配置保存到localstorage的依赖，可以不配置。
  },
  mounted () {
    this.load() // 初始化加载,在created钩子函数里需要在$nextTick回调内执行。
  },
  methods: {
    handleOnDataChange (data) {
      this.data = data // 改变此处的data才能让table内的data变化
    },
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
    handleOnSelChange (data) { // 根据返回的勾选的data合并ids
        let newIds = data.map((item, index, array) => {
            return item.id
        })
        this.ids.push(...newIds) // 合并多页勾选的id
        this.ids = _.uniq(this.ids) // 去重
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
