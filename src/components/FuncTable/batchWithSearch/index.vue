<template>
  <!-- 批量操作组 + 查询 -->
  <div class="clearfix func-table-top mb-10">
    <!-- 批量操作组（slot） -->
    <div class="func-table-batch-operation f-l">
      <slot name="batch-operation">
        <!-- <Button>添加</Button>
        <Button>编辑</Button>
        <Button>删除</Button> -->
      </slot>
    </div>
    <div class="func-table-refresh f-l ml-5" v-show="refreshable">
      <Button @click="refresh">刷新</Button>
    </div>
    <form class="func-table-search f-r"
      @keypress.enter.prevent="doSearch(searchInput)" v-if="searchConfig">
      <div class="clearfix">
        <Button-group class="f-r ml-10">
          <Button
            icon="ios-search"
            class="f-r"
            @click.stop="doSearch(searchInput)">查询</Button>
        </Button-group>
        <Button-group class="f-r ml-10">
          <Input v-model="searchInput" :placeholder="searchConfig.placeholder"
            :maxlength="searchConfig.maxLength" class="ivu-input-default f-r"></Input>
        </Button-group>
      </div>
    </form>
  </div>
</template>

<script>
  
</script>

<style>

</style>
