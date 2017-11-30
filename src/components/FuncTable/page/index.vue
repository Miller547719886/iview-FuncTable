<template>
  <!-- 分页 -->
  <Page ref="page" style="float: none; display: inline-block"
        :total="total"
        :page-size="size"
        :show-elevator="pageConfig.showElevator"
        :show-sizer="pageConfig.showSizer"
        show-total
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"></Page>
</template>

<script>
  
</script>

<style>

</style>