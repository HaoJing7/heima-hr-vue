<template>
  <!--ElementUI的级联组件-->
  <el-cascader
    size="mini"
    :options="treeData"
    :props="props"
    separator="-"
  >
  </el-cascader>
</template>

<script>
import {getDepartment} from "@/api/department";
import {transListToTreeData} from "@/utils";

export default {
  data() {
    return {
      treeData: [], // 赋值给级联组件的options
      props: {
        label: 'name',  // 要展示的字段
        value: 'id',  // 要存储的字段
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      const result = await getDepartment()
      this.treeData = transListToTreeData(result, 0)
      // console.log(this.treeData)
    }
  },
}
</script>

<style scoped lang="scss">

</style>
