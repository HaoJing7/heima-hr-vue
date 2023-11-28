<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="depts" default-expand-all :props="defaultProps">
        <!--结点结构-->
        <!--v-slot='{node, data}' v-slot只能作用在template上-->
        <template v-slot="{data}">
          <el-row style="width:100%;height:40px" type="flex" justify="space-between" align="middle">
            <el-col>{{data.name}}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{data.manageName}}</span>
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
export default {
  name: 'Department',
  data() {
    return {
      // 数据属性
      depts: [{
        name: '传智教育',
        manageName: '管理员',
        children: [{
          name: '总裁办',
          manageName: '张三',
        }, {
          name: '行政部',
          manageName: '李四',
        }, {
          name: '人事部',
          manageName: '王五',
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
.tree-manager {
  width: 50px;
  display: inline-block;
  margin: 10px;
}
</style>
