<template>
  <div class="login">
    <h1>电商后台管理系统</h1>
    <div class="login_box">
      <div class="login_img">
        <img
          src="@/assets/images/3.jpg"
          alt=""
        >
      </div>
      <!-- 表单标签 begin -->
      <el-form
        :rules="loginFormRules"
        :model="loginForm"
        ref="loginFormRef"
        label-width="60px"
      >
        <!-- 账号输入框 -->
        <el-form-item
          label="账号"
          prop="username"
        >
          <el-input
            prefix-icon="el-icon-user"
            v-model="loginForm.username"
          >
          </el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            type="password"
          >
          </el-input>
        </el-form-item>

        <el-row>
          <el-button
            type="primary"
            @click="login"
          >登录</el-button>
          <el-button
            type="success"
            @click="resetLoginForm"
          >重置</el-button>
        </el-row>
      </el-form>
      <!-- 表单标签 end -->
    </div>
  </div>
</template>

<script>
// import { request } from '@/network/request'

export default {
  data () {
    return {
      // 登录表单对象
      loginForm: {
        username: '',
        password: ''
      },
      // 登录表单判断规则对象
      loginFormRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // 清除sessionStorage
    window.sessionStorage.clear()
  },
  methods: {
    // 重置输入框数据
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    // 点击登陆后执行的一系列操作
    login () {
      // 执行校验检输入格式是否都正确
      this.$refs.loginFormRef.validate(async (valid) => {
        console.log(valid)
        // 如果校验结果不正确返回false然后return出去
        if (!valid) return
        const { data: res } = await this.$http.req(
          'login',
          'post',
          this.loginForm
        )
        // 根据获取数据的状态码做出不同的操作
        if (res.meta.status === 400) {
          this.$message.error(res.meta.msg)
        } else {
          this.$message.success(res.meta.msg)
        }
        // 将服务器返回的token存入浏览器的会话缓存中(主要用于导航守卫判断用户的登录状态，只有携带token才能进入系统)
        window.sessionStorage.setItem('token', res.data.token)
        // 然后利用路由将页面跳转到/home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
h1 {
  position: absolute;
  left: 50%;
  transform: translate(-53%, 167%);
  color: white;
}

.login {
  height: 100%;
  background-color: rgb(235, 225, 225);
  background: url('../assets/images/4.jpg') center;
  // background-size: cover;
}

.login_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 280px;
  background-color: white;
  padding: 20px;

  .login_img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    padding: 10px;
    background-color: rgb(223, 213, 201);
    transform: translate(118%, -62%);

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: white;
    }
  }
}

.el-form {
  margin-top: -30px;
}

.el-row {
  display: flex;
  justify-content: center;
  padding-right: 20px;

  .el-button {
    margin: 20px 30px 0 30px;
  }
}
</style>
