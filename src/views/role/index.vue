<template>
  <div class="container">
    <div class="app-container">
      <!--角色管理内容-->
      <div class="role-operate">
        <el-button @click="showDialog=true" size="mini" type="primary">添加角色</el-button>
      </div>
      <!--放置table组件-->
      <el-table :data="list">
        <el-table-column prop="name" align="center" width="200px" label="角色"/>
        <el-table-column prop="state" align="center" width="200px" label="启用">
          <!--自定义结构-->
          <template v-slot="{row}">
            <span>{{ row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述"/>
        <el-table-column align="center" label="操作">
          <template>
            <el-button size="mini" type="text">分配权限</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--放置分页组件-->
      <el-row type="flex" style="height: 60px" justify="end" align="middle">
        <el-pagination
          :page-size="pageParams.pagesize"
          :current-page="pageParams.page"
          :total="pageParams.total"
          @current-change="changePage"
          layout="prev, pager, next"
        />
      </el-row>
    </div>
    <!--新增角色弹层-->
    <el-dialog @close="btnCancel" width="500x" title="新增角色" :visible.sync="showDialog">
      <!--表单内容-->
      <el-form ref="roleForm" :rules="rules" :model="roleForm" label-width="120px">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="roleForm.name" style="width: 300px" size="mini"/>
        </el-form-item>
        <!--如果不需要校验，就不需要写prop如果不需要校验，就不需要写pros属性属性-->
        <el-form-item prop="state" label="启用">
          <el-switch v-model="roleForm.state" :active-value="1" :inactive-value="0" size="mini"/>
        </el-form-item>
        <el-form-item prop="description" label="角色描述">
          <el-input v-model="roleForm.description" type="textarea" :rows="3" style="width: 300px" size="mini"/>
        </el-form-item>
        <!--按钮-->
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button @click="btnOK" type="primary" size="mini">确认</el-button>
              <el-button @click="btnCancel" size="mini">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {addRole, getRoleList} from "@/api/role";

export default {
  name: 'Role',
  created() {
    this.getRoleList()
  },

  data() {
    return {
      list: [], // 角色列表
      pageParams: { // 分页信息
        page: 1,
        pagesize: 5,
        total: 0
      },
      showDialog: false, // 新增角色弹层
      roleForm: { // 新增角色
        name: '',
        description: '',
        state: 0 // 默认未启用
      },
      rules: {
        name: [
          {required: true, message: '角色名称不能为空', trigger: 'blur'},
        ],
        description: [
          {required: true, message: '角色描述不能为空', trigger: 'blur'},
        ],
      }
    }
  },

  methods: {
    async getRoleList() {
      // 不传参数的话默认是第1页，每页10条
      const {rows, total} = await getRoleList(this.pageParams)
      this.list = rows
      this.pageParams.total = total
    },
    changePage(newPage) {
      this.pageParams.page = newPage // 更新页码
      this.getRoleList()
    },
    btnOK() {
      this.$refs.roleForm.validate(async isOK => {
        if (isOK) {
          await addRole(this.roleForm)
          this.$message.success('新增角色成功')
          await this.getRoleList()
          this.btnCancel()
        }
      })
    },
    btnCancel() {
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
  }

}
</script>
<style scoped>
.role-operate {
  padding: 10px;
}
</style>
