<template>
  <!-- 表格 -->
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
</template>

<script>
  
</script>

<style>

</style>