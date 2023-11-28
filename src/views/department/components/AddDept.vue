<template>
  <el-dialog title="新增部门" @close="close" :visible="showDialog">
    <el-form ref="addDept" :model="formData" :rules="rules" label-width="120px">
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="formData.name" placeholder="2-10个字符" style="width: 80%;" size="mini"/>
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model="formData.code" placeholder="2-10个字符" style="width: 80%;" size="mini"/>
      </el-form-item>
      <el-form-item prop="managerId" label="部门负责人">
        <el-select v-model="formData.managerId" placeholder="请选择负责人" style="width: 80%;" size="mini">
          <!--下拉选项 循环-->
          <el-option
            v-for="item in managerList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input v-model="formData.introduce" placeholder="1-100个字符" type="textarea" size="mini" :row="4"
                  style="width: 80%;"/>
      </el-form-item>
      <el-form-item>
        <!--按钮-->
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button size="mini" type="primary">确认</el-button>
            <el-button size="mini">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {getDepartment, getMangerList} from "@/api/department";

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
        pid: '', // 父级部门id
      },
      rules: {
        code: [
          {required: 'true', trigger: 'blur', message: '部门编码不能为空'},
          {min: 2, max: 10, trigger: 'blur', message: '部门编码的长度为2-10个字符'},
          {
            trigger: 'blur',
            validator: async (rule, value, callback) => {
              const result = await getDepartment()
              if (result.some(item => item.code === value)) {
                callback(new Error('部门中已经有该编码了'))
              } else {
                callback()
              }
            }
          }
        ],
        introduce: [
          {required: 'true', trigger: 'blur', message: '部门介绍不能为空'},
          {min: 1, max: 100, trigger: 'blur', message: '部门介绍的长度为1-100个字符'},
        ],
        managerId: [
          {required: 'true', trigger: 'blur', message: '部门负责人不能为空'},
        ],
        name: [
          {required: 'true', trigger: 'blur', message: '部门名称不能为空'},
          {min: 2, max: 10, trigger: 'blur', message: '部门名称的长度为2-10个字符'},
          {
            trigger: 'blur',
            validator: async (rule, value, callback) => {
              const result = await getDepartment()
              if (result.some(item => item.name === value)) {
                callback(new Error('部门中已经有该名称了'))
              } else {
                callback()
              }
            }
          }
        ],
      },
      // 负责人列表
      managerList: [],
    }
  },

  created() {
    this.getManagerList()
  },

  methods: {
    // 关闭弹层
    close() {
      // 修改父组件的值 子传父
      this.$emit('update:showDialog', false)
    },
    async getManagerList() {
      this.managerList = await getMangerList()
    }
  },

}

</script>

<style scoped lang="scss">

</style>
