<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="depts" default-expand-all :props="defaultProps">
        <!--结点结构-->
        <!--v-slot='{node, data}' v-slot只能作用在template上-->
        <template v-slot="{data}">
          <el-row style="width:100%;height:40px" type="flex" justify="space-between" align="middle">
            <el-col>{{data.name}}</el-col>
            <el-col :span="6">
              <span class="tree-manager" style="width: 80px">{{data.managerName}}</span>
              <el-dropdown>
                <!--显示区域内容-->
                <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right"/>
              </span>
                <!--下拉菜单选项-->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                  <el-dropdown-item>编辑部门</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script>
import {getDepartment} from "@/api/department";
import {transListToTreeData} from "@/utils";
export default {
  name: 'Department',
  created() {
    this.getDepartment()
  },
  data() {
    return {
      // 数据属性
      depts: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  methods: {
    async getDepartment() {
      const result = await getDepartment()
      this.depts = transListToTreeData(result, 0)
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
