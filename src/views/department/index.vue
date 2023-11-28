<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="depts" expand-on-click-node="false" default-expand-all :props="defaultProps">
        <!--结点结构-->
        <!--v-slot='{node, data}' v-slot只能作用在template上-->
        <template v-slot="{data}">
          <el-row style="width:100%;height:40px" type="flex" justify="space-between" align="middle">
            <el-col>{{data.name}}</el-col>
            <el-col :span="6">
              <span class="tree-manager" style="width: 80px">{{data.managerName}}</span>
              <el-dropdown @command="operateDept">
                <!--显示区域内容-->
                <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right"/>
              </span>
                <!--下拉菜单选项-->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <!--放置弹层-->
    <!--.sync表示会自动监听子组件的事件-->
    <!--子组件this.$emit(事件, 值)，值会赋给前面的属性-->
    <add-dept :show-dialog.sync="showDialog"/>
  </div>
</template>

<script>
import {getDepartment} from "@/api/department";
import {transListToTreeData} from "@/utils";
import AddDept from "@/views/department/components/AddDept.vue";
export default {
  name: 'Department',
  components: {
    AddDept,
  },
  data() {
    return {
      // 数据属性
      depts: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      // 弹层显示
      showDialog: false,
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    // 获取部门树形列表
    async getDepartment() {
      const result = await getDepartment()
      this.depts = transListToTreeData(result, 0)
    },
    // 操作部门的方法
    operateDept(type) {
      // this.$message.info(type)
      if (type === 'add') {
        this.showDialog = true
      } else if (type === 'edit') {

      } else {

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
.tree-manager {
  width: 50px;
  display: inline-block;
  margin: 10px;
}
</style>
