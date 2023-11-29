<template>
  <el-dialog :title="showTitle" :visible="showDialog" @close="close">
    <el-form ref="addDept" :model="formData" :rules="rules" label-width="120px">
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="formData.name" placeholder="2-10个字符" style="width: 80%;" size="mini" />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model="formData.code" placeholder="2-10个字符" style="width: 80%;" size="mini" />
      </el-form-item>
      <el-form-item prop="managerId" label="部门负责人">
        <el-select v-model="formData.managerId" placeholder="请选择负责人" style="width: 80%;" size="mini">
          <!--下拉选项 循环-->
          <el-option
            v-for="item in managerList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input
          v-model="formData.introduce"
          placeholder="1-100个字符"
          type="textarea"
          size="mini"
          :row="4"
          style="width: 80%;"
        />
      </el-form-item>
      <el-form-item>
        <!--按钮-->
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button size="mini" type="primary" @click="btnOK">确认</el-button>
            <el-button size="mini" @click="close">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addDepartment, getDepartment, getDepartmentDetail, getMangerList, updateDepartment } from '@/api/department'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    currentNodeId: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      // 新增列表
      formData: {
        code: '', // 部门编码
        introduce: '', // 介绍
        managerId: '', // 部门负责人id
        name: '', // 部门名称
        pid: '' // 父级部门id
      },
      rules: {
        code: [
          { required: 'true', trigger: 'blur', message: '部门编码不能为空' },
          { min: 2, max: 10, trigger: 'blur', message: '部门编码的长度为2-10个字符' },
          {
            trigger: 'blur',
            validator: async(rule, value, callback) => {
              let result = await getDepartment()
              // 判断当前是否是编辑模式（编辑模式formData在查询的时候会被赋值）
              if (this.formData.id) {
                // 编辑场景
                result = result.filter(item => item.id !== this.formData.id)
              }
              if (result.some(item => item.code === value)) {
                callback(new Error('部门中已经有该编码了'))
              } else {
                callback()
              }
            }
          }
        ],
        introduce: [
          { required: 'true', trigger: 'blur', message: '部门介绍不能为空' },
          { min: 1, max: 100, trigger: 'blur', message: '部门介绍的长度为1-100个字符' }
        ],
        managerId: [
          { required: 'true', trigger: 'blur', message: '部门负责人不能为空' }
        ],
        name: [
          { required: 'true', trigger: 'blur', message: '部门名称不能为空' },
          { min: 2, max: 10, trigger: 'blur', message: '部门名称的长度为2-10个字符' },
          {
            trigger: 'blur',
            validator: async(rule, value, callback) => {
              let result = await getDepartment()
              // 判断当前是否是编辑模式
              if (this.formData.id) {
                // 编辑场景
                result = result.filter(item => item.id !== this.formData.id)
              }
              if (result.some(item => item.name === value)) {
                callback(new Error('部门中已经有该名称了'))
              } else {
                callback()
              }
            }
          }
        ]
      },
      // 负责人列表
      managerList: []
    }
  },

  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },

  created() {
    this.getManagerList()
  },

  methods: {
    // 关闭弹层
    close() {
      this.formData = {
        code: '', // 部门编码
        introduce: '', // 介绍
        managerId: '', // 部门负责人id
        name: '', // 部门名称
        pid: '' // 父级部门id
      }
      // 重置表单
      // resetFields()只能重置在模板data()中声明的数据
      this.$refs.addDept.resetFields()
      // 修改父组件的值 子传父
      this.$emit('update:showDialog', false)
    },
    async getManagerList() {
      this.managerList = await getMangerList()
    },
    // 确认按钮
    btnOK() {
      this.$refs.addDept.validate(async isOK => {
        if (isOK) {
          let msg = '新增'
          // 判断是否是编辑场景
          if (this.formData.id) {
            msg = '更新'
            // 编辑场景
            await updateDepartment(this.formData)
          } else {
            // 更新场景
            this.formData.pid = this.currentNodeId
            await addDepartment(this.formData)
          }
          // 通知父组件进行更新
          this.$emit('updateDepartment')
          this.$message.success(`${msg}部门成功`)
          this.close()
        }
      })
    },
    // 获取部门的详情
    async getDepartmentDetail() {
      this.formData = await getDepartmentDetail(this.currentNodeId)
    }
  }

}

</script>

<style scoped lang="scss">

</style>
