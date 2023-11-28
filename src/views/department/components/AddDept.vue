<template>
  <el-dialog title="新增部门" @close="close" :visible="showDialog">

  </el-dialog>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      // 修改父组件的值 子传父
      this.$emit('update:showDialog', false)
    },
  }
}

</script>

<style scoped lang="scss">

</style>
