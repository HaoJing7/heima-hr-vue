<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar"/>

    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!--头像-->
          <img v-if="avatar" :src="avatar" class="user-avatar">
          <span v-else class="username">{{ name?.charAt(0) }}</span>
          <!--用户名称-->
          <span class="name"> {{ name }} </span>
          <!--图标-->
          <i class="el-icon-setting"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              主页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/HaoJing7/heima-hr-vue">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <!--prevent阻止a标签的事件(点击跳转)-->
          <a target="_blank" @click.prevent="updatePassword">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <!--native事件修饰符-->
          <!--注册组件的根元素的原生事件-->
          <!--el-dropdown-item中没有@click点击事件-->
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">注销</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!--放置dialog-->
    <!--sync可以接收子组件传过来的事件和值 这样点击dialog的×才可以关闭-->
    <el-dialog append-to-body width="500px" title="修改密码" @close="btnCancel" :visible.sync="showDialog">
      <!--放置表单-->
      <el-form ref="passForm" label-width="120px" :model="passForm" :rules="rules">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="passForm.oldPassword" show-password size="small"/>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passForm.newPassword" show-password size="small"/>
        </el-form-item>
        <el-form-item label="重复密码" prop="confirmPassword">
          <el-input v-model="passForm.confirmPassword" show-password size="small"/>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="btnOK">确认修改</el-button>
          <el-button size="mini" @click="btnCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import {updatePassword} from "@/api/user";

export default {
  data() {
    return {
      showDialog: false,
      // 修改密码表单
      passForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      // 表单校验的规则
      rules: {
        oldPassword: [
          {required: true, message: '旧密码不能为空', trigger: 'blur'}
        ],
        newPassword: [
          {required: true, message: '新密码不能为空', trigger: 'blur'},
          {trigger: 'blur', min: 6, max: 16, message: '新密码长度为6-16位之间'}
        ],
        confirmPassword: [
          {required: true, message: '重复密码不能为空', trigger: 'blur'},
          {
            trigger: 'blur',
            // 箭头函数才能使用this
            validator: (rule, value, callback) => {
              if (this.passForm.newPassword === value) {
                callback()
              } else {
                callback(new Error("重复密码和新密码输入不一致"))
              }
            }
          }
        ],
      }
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    // 辅助函数，帮我们引入getters中的函数
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    // 注销
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    },
    // 修改密码
    updatePassword() {
      this.showDialog = true
      // this.$message.success("修改密码成功")
    },
    // 确定修改密码
    btnOK() {
      this.$refs.passForm.validate(async isOK => {
        if (isOK) {
          // 校验通过,调用接口
          // 上面的updatePassword()方法需要通过this来调用，
          // 而该方法不需要通过this来调用，因此他们名字可以相同
          await updatePassword(this.passForm)
          this.btnCancel()
          this.$message.success("修改密码成功")
        } else {
          // 校验失败
        }
      })
    },
    // 取消修改密码
    btnCancel() {
      this.$refs.passForm.resetFields() // ElementUI重置表单方法
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;

        .name {
          margin-right: 10px;
          font-size: 16px;
        }

        .username {
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border-radius: 50%;
          background: #04c9be;
          color: #ffffff;
          margin-right: 4px;
        }

        .el-icon-setting {
          font-size: 20px;
        }

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
