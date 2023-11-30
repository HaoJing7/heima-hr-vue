<template>
  <div class="container">
    <div class="app-container">
      <!--角色管理内容-->
      <div class="role-operate">
        <el-button size="mini" type="primary" @click="showDialog=true">添加角色</el-button>
      </div>
      <!--放置table组件-->
      <el-table :data="list">
        <el-table-column prop="name" align="center" width="200px" label="角色">
          <template v-slot="{row}">
            <el-input v-if="row.isEdit" v-model="row.editRow.name" size="mini" />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" align="center" width="200px" label="启用">
          <!--自定义结构-->
          <template v-slot="{row}">
            <el-switch v-if="row.isEdit" v-model="row.editRow.state" :active-value="1" :inactive-value="0" />
            <span v-else>{{ row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述">
          <template v-slot="{row}">
            <el-input v-if="row.isEdit" v-model="row.editRow.description" type="textarea" size="mini" />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="{row}">
            <!--编辑状态所显示的按钮-->
            <template v-if="row.isEdit">
              <el-button size="mini" type="primary" @click="btnEditOK(row)">确定</el-button>
              <el-button size="mini" @click="row.isEdit=false">取消</el-button>
            </template>
            <template v-else>
              <el-button size="mini" type="text">分配权限</el-button>
              <el-button size="mini" type="text" @click="btnEditRow(row)">编辑</el-button>
              <el-popconfirm title="是否确认删除" @onConfirm="confirmDel(row.id)">
                <el-button slot="reference" style="margin-left: 10px" size="mini" type="text">删除</el-button>
              </el-popconfirm>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <!--放置分页组件-->
      <el-row type="flex" style="height: 60px" justify="end" align="middle">
        <el-pagination
          :page-size="pageParams.pagesize"
          :current-page="pageParams.page"
          :total="pageParams.total"
          layout="prev, pager, next"
          @current-change="changePage"
        />
      </el-row>
    </div>

    <!--新增角色弹层-->
    <el-dialog width="500x" title="新增角色" :visible.sync="showDialog" @close="btnCancel">
      <!--表单内容-->
      <el-form ref="roleForm" :rules="rules" :model="roleForm" label-width="120px">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="roleForm.name" style="width: 300px" size="mini" />
        </el-form-item>
        <!--如果不需要校验，就不需要写prop如果不需要校验，就不需要写pros属性属性-->
        <el-form-item prop="state" label="启用">
          <el-switch v-model="roleForm.state" :active-value="1" :inactive-value="0" size="mini" />
        </el-form-item>
        <el-form-item prop="description" label="角色描述">
          <el-input v-model="roleForm.description" type="textarea" :rows="3" style="width: 300px" size="mini" />
        </el-form-item>
        <!--按钮-->
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button type="primary" size="mini" @click="btnOK">确认</el-button>
              <el-button size="mini" @click="btnCancel">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { addRole, delRole, getRoleList, updateRole } from '@/api/role'

export default {
  name: 'Role',

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
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getRoleList()
  },

  methods: {
    async getRoleList() {
      // 不传参数的话默认是第1页，每页10条
      const { rows, total } = await getRoleList(this.pageParams)
      this.list = rows
      this.pageParams.total = total
      // 针对每一行数据添加一个编辑标记
      this.list.forEach(item => {
        // item.isEdit = false // 添加是否处于编辑属性
        // 数据响应式问题 -> 数据变化则视图更新(针对已有的属性)
        // 添加的动态属性 不具备响应式特点(无法监控变化)
        // this.$set() 可以针对目标对象 添加的属性 添加响应式
        this.$set(item, 'isEdit', false)
        // 数据缓存
        this.$set(item, 'editRow', { name: item.name, state: item.state, description: item.description })
      })
    },
    changePage(newPage) {
      this.pageParams.page = newPage // 更新页码
      this.getRoleList()
    },
    // 添加角色确认
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
    // 添加角色取消
    btnCancel() {
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    // 点击编辑行数据
    btnEditRow(row) {
      row.isEdit = true
      row.editRow.name = row.name
      row.editRow.description = row.description
      row.editRow.state = row.state
    },
    async btnEditOK(row) {
      if (row.editRow.name && row.editRow.description) {
        await updateRole({ ...row.editRow, id: row.id })
        this.$message.success('更新角色数据成功')
        // 更新显示的数据 退出编辑状态
        Object.assign(row, {
          isEdit: false,
          ...row.editRow
        })
      } else {
        this.$message.warning('角色和描述不能为空')
      }
    },
    async confirmDel(id) {
      await delRole(id)
      this.$message.success('删除角色成功')
      // 删除的如果是最后一个
      if (this.list.length === 1) {
        this.pageParams.page-- // 页码减一
      }
      this.getRoleList()
    }
  }
}
</script>

<style scoped>
.role-operate {
  padding: 10px;
}
</style>
