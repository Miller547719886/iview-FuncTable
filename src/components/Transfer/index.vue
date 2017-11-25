<template>
  <div class="transfer">
    <Transfer class="d-ib" ref="Transfer"
      @on-change="onChange"
      :render-format="render"
      :data="data"
      :titles="titles"
      :target-keys="targetKeys"
      :operations="operations"
      :list-style="listStyle"
      :selected-keys="selectedKeys">
    </Transfer>
    <div class="d-ib ml-10 transfer-move">
      <Button class="d-b" @click="goUp">上移</Button>
      <Button class="d-b mt-10" @click="goDown">下移</Button>
    </div>
  </div>
</template>
<script>
  import common from '@/utils/common'
  import dom from '@/utils/dom'
  export default {
    name: 'CTransfer',
    model: {
      prop: 'targetKeys',
      event: 'on-target-keys-change'
    },
    props: {
      data: {
        type: Array,
        required: true,
        default: () => {
          return [
            { 'key': '1', 'label': '内容1', 'disabled': false },
            { 'key': '2', 'label': '内容2', 'disabled': false },
            { 'key': '3', 'label': '内容3', 'disabled': false }
          ]
        }
      },
      targetKeys: {
        type: Array,
        required: false,
        default: () => {
          return []
        }
      },
      titles: {
        type: Array,
        required: false,
        default: () => {
          return ['源列表', '目的列表']
        }
      },
      operations: {
        type: Array,
        required: false,
        default: () => {
          return ['向左移动', '向右移动']
        }
      },
      disabledSelections: {
        type: Array,
        required: false,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        listStyle: {
          width: '250px',
          height: '300px'
        },
        selectedKeys: [], // 哪些项应该被选中
        label: '',
        selectedIndex: null,
        itemClassName: 'ivu-transfer-list-content-item',
        orderedRightData: null
      }
    },
    mounted () {
      let vm = this.$refs['Transfer']
      let el = vm.$el
      let switchListUl = el.querySelectorAll('.ivu-transfer-list')[1].querySelector('.ivu-transfer-list-content')
      switchListUl.addEventListener('click', this.handleClick.bind(this))
    },
    beforeDestroy () {
      let vm = this.$refs['Transfer']
      let el = vm.$el
      let switchListUl = el.querySelectorAll('.ivu-transfer-list')[1].querySelector('.ivu-transfer-list-content')
      switchListUl.removeEventListener('click', this.handleClick.bind(this))
    },
    methods: {
      handleClick (e) {
        let target = e.target
        if (target.tagName === 'SPAN') {
          target = dom.parent(target)
        }
        // if (target.tagName === 'LI') {
        //   target = target
        // }
        if (target.querySelector('input').disabled) { // 禁用不会被选定
          return false
        }
        if (dom.hasClass(target, this.itemClassName)) {
          if (dom.hasClass(target, 'active')) { // 处于点击状态
            dom.removeClass(target, 'active')
            this.label = ''
            this.clearSelectedIndex()
          } else { // 不处于点击状态
            dom.addClass(target, 'active')
            this.label = dom.getInnerText(target.getElementsByTagName('span')[0])
            let siblings = dom.siblings(target).filter((item) => {
              return dom.hasClass(item, this.itemClassName)
            })
            for (let el of siblings) {
              dom.removeClass(el, 'active')
            }
            this.getSelectedIndex(target)
          }
        }
      },
      reset () {
        this.orderedRightData = null
        let selectedItem = this.getSelectedItem().selectedItem
        if (selectedItem) {
          dom.removeClass(selectedItem, 'active')
        }
        this.selectedIndex = null // 被点击dom的索引
        this.selectedKeys.length = null
      },
      render (item) {
        return /* item.key + ':' +  */item.label
      },
      onChange (newTargetKeys) {
        // 按照disable normal disable排序
        newTargetKeys.map((item, index, array) => {
          if (this.disabledSelections.includes(item)) {
            if (index !== array.length - 1) { // 不是最后一项目
              if (index !== 0) {
                let _item = item
                array.splice(index, 1)
                array.unshift(_item)
              }
            }
          }
        })
        this.$emit('on-target-keys-change', newTargetKeys)
      },
      getSelectedItem () {
        let vm = this.$refs['Transfer']
        let el = vm.$el
        let switchList = el.querySelectorAll('.ivu-transfer-list')[1].querySelectorAll('.ivu-transfer-list-content .ivu-transfer-list-content-item')
        let selectedItem = this.selectedIndex != null ? switchList[this.selectedIndex] : null
        return { switchList, selectedItem }
      },
      goUp () {
        if (this.selectedIndex === null) { return false }
        let switchList = this.getSelectedItem().switchList
        let selectedItem = this.getSelectedItem().selectedItem
        let label = dom.text(selectedItem)
        if (Array.from(switchList).indexOf(selectedItem) !== 0) {
          if (!dom.prev(selectedItem).querySelector('input').disabled) { // 上一个勾选项是否禁用项
            dom.before(selectedItem, switchList[this.selectedIndex - 1])
            this.selectedIndex -= 1
            this.orderTransferRightData(label, 'up')
          }
        }
      },
      goDown () {
        if (this.selectedIndex === null) { return false }
        let switchList = this.getSelectedItem().switchList
        let selectedItem = this.getSelectedItem().selectedItem
        let label = dom.text(selectedItem)
        if (Array.from(switchList).indexOf(selectedItem) !== switchList.length - 1) {
          if (!dom.next(selectedItem).querySelector('input').disabled) { // 下一个勾选项是否禁用项
            dom.after(selectedItem, switchList[this.selectedIndex + 1])
            this.selectedIndex += 1
            this.orderTransferRightData(label, 'down')
          }
        }
      },
      orderTransferRightData (label, type) {
        let data = this.$refs['Transfer'].rightData
        let index = data.findIndex((item, index, array) => {
          return common.trim(label) === item.label
        })
        let temp
        switch (type) {
          case 'up':
            temp = data[index]
            data[index] = data[index - 1]
            data[index - 1] = temp
            break
          case 'down':
            temp = data[index]
            data[index] = data[index + 1]
            data[index + 1] = temp
            break
          default:
            console.error('方法orderTransferRightData错误的类型参数type：' + type)
        }
        this.orderedRightData = data
        this.$forceUpdate()
      },
      emit () {
        this.$emit('on-right-data-change', this.orderedRightData)
      },
      getSelectedIndex (el) {
        this.selectedIndex = Array.from(el.parentNode.children).indexOf(el)
      },
      clearSelectedIndex () {
        this.selectedIndex = null
      }
    },
    watch: {
      targetKeys (v) {
        /* 根据targetKeys配置orderedRightData */
        let data = []
        v.map((item, index, array) => {
          let _item = this.data.find((_item, index, array) => {
            return _item.key === item
          })
          data.push(_item)
        })
        this.orderedRightData = data
      }
    },
    computed: {

    }
  }
</script>
<style>
  .ivu-transfer-list-content-item.active {
    background: #f3f3f3;
  }
  .transfer-move {
    position: relative;
    top: 25px;
  }
</style>
