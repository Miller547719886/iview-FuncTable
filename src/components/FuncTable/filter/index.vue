<template>
    <!-- 筛选组件 -->
  <div class="func-table-filter">
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
</template>

<script> 
  import CTransfer from './Transfer/Index'
</script>

<style>

</style>