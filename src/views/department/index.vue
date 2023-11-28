<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="depts" default-expand-all :props="defaultProps"/>
    </div>
  </div>
</template>

<script>
 export default {
   name: 'Department',
   data() {
     return {
       // 数据属性
       depts: [{
         name: '传智教育',
         children: [{
           name: '总裁办'
         }, {
           name: '行政部'
         }, {
           name: '人事部'
         }]
       }],
       defaultProps: {
         label: 'name',
         children: 'children'
       }
     }
   }
 }
</script>

<style scoped lang="scss">
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
