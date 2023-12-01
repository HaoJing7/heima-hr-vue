<template>
  <div class="container">
    <div class="app-container">
      <!--左树右表-->
      <div class="left">
        <el-input
          v-model="queryParams.keyword"
          @input="changeValue"
          style="margin-bottom:10px"
          type="text"
          prefix-icon="el-icon-search"
          size="small"
          placeholder="输入员工姓名全员搜索"
        />
        <!-- 树形组件 -->
        <el-tree
          ref="deptTree"
          :data="depts"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          :highlight-current="true"
          node-key="id"
          @current-change="selectNode"
        />
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary" @click="$router.push('/employee/detail')">添加员工</el-button>
          <el-button size="mini" @click="showExcelDialog=true">excel导入</el-button>
          <el-button size="mini" @click="exportEmployee">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="list">
          <el-table-column prop="staffPhoto" label="头像" align="center">
            <template v-slot="{row}">
              <el-avatar v-if="row.staffPhoto" :src="row.staffPhoto" :size="30"/>
              <span class="username" v-else>{{row.username.charAt(0)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="姓名" />
          <el-table-column prop="mobile" label="手机号" sortable/>
          <el-table-column prop="workNumber" label="工号" sortable/>
          <el-table-column prop="formOfEmployment" label="聘用形式">
            <template v-slot="{row}">
              <span>{{row.formOfEmployment === 1 ? '正式' : row.formOfEmployment === 2 ? '非正式' : '无'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" label="部门"/>
          <el-table-column prop="timeOfEntry" label="入职时间" sortable/>
          <el-table-column label="操作" width="280px">
            <template v-slot="{row}">
              <el-button size="mini" type="text">查看</el-button>
              <el-button size="mini" type="text">角色</el-button>
              <el-popconfirm title="是否确认删除" @onConfirm="confirmDel(row.id)">
                <el-button slot="reference" style="margin-left: 10px" size="mini" type="text">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row style="height: 60px" align="middle" type="flex" justify="end">
          <el-pagination
            layout="total, prev, pager, next"
            :total="total"
            :current-page="queryParams.page"
            :page-size="queryParams.pagesize"
            @current-change="changePage"
          />
        </el-row>
      </div>
    </div>
    <import-excel @upload-success="getEmployeeList" :show-excel-dialog.sync="showExcelDialog"/>
  </div>
</template>

<script>
import { getDepartment } from '@/api/department'
import {transListToTreeData} from "@/utils";
import {delEmployee, exportEmployee, getEmployeeList} from "@/api/employee";
import FileSaver from 'file-saver'
import ImportExcel from "@/views/employee/components/ImportExcel.vue";

export default {
  name: 'Employee',
  components: {
    ImportExcel
  },
  data() {
    return {
      depts: [], // 组织数据
      defaultProps: { // 树形结构属性
        label: 'name',
        children: 'children'
      },
      queryParams: {  // 查询参数
        departmentId: null,  // 部门id
        page: 1,  // 分页参数
        pagesize: 10,
        keyword: '',  // 员工姓名模糊查询
      },
      list: [],  // 存储员工列表的数据
      total: 0,  // 记录当前查询员工的总数
      showExcelDialog: false,  // 控制Excel弹层
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    // 获取组织树形结构
    async getDepartment() {
      // 递归方法将列表转化成树形
      this.depts = transListToTreeData(await getDepartment(), 0)
      this.queryParams.departmentId = this.depts[0].id
      // 设置选中结点的状态（首个结点）
      // 树组件渲染是异步的，更新depts属性后树要进行渲染，要等渲染完才能去设置首个结点的选中
      this.$nextTick(() => {
        // 此时意味着树渲染完毕
        this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId)
      })
      // 此时参数记录了id
      this.getEmployeeList()
    },
    // 在切换部门的时候记录结点，用于查询员工数据
    selectNode(node) {
      this.queryParams.departmentId = node.id
      this.queryParams.page = 1
      this.getEmployeeList()
    },
    // 获取员工列表
    async getEmployeeList() {
      const {total, rows} = await getEmployeeList(this.queryParams)
      this.list = rows
      this.total = total
    },
    // 切换页码事件
    changePage(newPage) {
      this.queryParams.page = newPage
      this.getEmployeeList()
    },
    // 输入框内容改变时
    changeValue() {
      // 防抖处理
      // 单位事件内只执行最后一次
      // this的实例上赋值一个timer的属性
      clearTimeout(this.timer)  // 清理上一次的定时器
      this.timer = setTimeout(() => {
        this.queryParams.page = 1
        this.getEmployeeList()
      }, 300)  // 等到300ms后才会发送该请求
    },
    // 导出员工的excel
    async exportEmployee() {
      const result = await exportEmployee()
      // 使用一个npm包 直接将blob文件下载到本地 file-saver
      // FileSaver.saveAs(blob对象, 文件名称)
      FileSaver.saveAs(result, '员工信息表.xlsx')
    },
    // 删除员工方法
    async confirmDel(id) {
      await delEmployee(id)
      if (this.list.length === 1 && this.queryParams.page > 1) {
        this.queryParams.page--
      }
      this.getEmployeeList()
      this.$message.success('删除员工成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;
  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }
  .right {
    flex: 1;
    padding: 20px;
    .opeate-tools {
      margin:10px ;
    }
    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display:inline-block;
    }
  }
}
</style>
