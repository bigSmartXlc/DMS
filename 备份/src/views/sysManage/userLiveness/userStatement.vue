<!--
* description: 用户活跃度报表
* author: mwhao
* createdDate: 2020-1-8
-->
<template>
  <section>
    <!-- 头部查询条件 -->
    <theheadQuery :typeName="1"></theheadQuery>
    <!-- eachart折线图 -->
    <eachart></eachart>
  </section>
</template>
<script>
export default {
  name: "userStatement",
  components: {
    eachart: () => import("@/views/sysManage/userLiveness/eachart.vue"),
    theheadQuery: () =>
      import("@/views/sysManage/userLiveness/theheadQuery.vue")
  }
};
</script>

