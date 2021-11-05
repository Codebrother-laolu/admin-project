<template>
  <div>
    <!-- 面包屑区域 begin -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑区域 end -->

    <!-- 卡片区域 begin -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 begin -->
      <el-row
        :gutter="20"
        class="search-row"
      >
        <el-col :span="6">
          <!-- input输入框 -->
          <el-input
            placeholder="请根据姓名搜索内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <!-- 搜索按钮 -->
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>

        <!-- 添加用户按钮-列布局容器 -->
        <el-col :span="6">
          <el-button
            type="primary"
            @click="addDialogVisible=true"
          >添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 搜索与添加区域 end -->

      <!-- 用户列表区域 begin -->
      <el-table
        :data="userList"
        style="width: 100%"
        border
      >
        <el-table-column
          type="index"
          label="#"
        >
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="username"
        >
        </el-table-column>
        <el-table-column
          label="邮箱"
          prop="email"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
        >
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色"
        >
        </el-table-column>
        <el-table-column label="状态">
          <!-- 通过template里的作用域插槽属性获取该行的所有数据 -->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStatusChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>
      <!-- 用户列表区域 end -->

      <!-- 分页栏区域 begin -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 分页栏区域 end -->

      <!-- 对话框区域 begin -->
      <el-dialog
        title="提示"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="closeDialog"
      >
        <!-- 对话框表单区域 -->
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addRuleForm"
          label-width="100px"
        >
          <!-- 用户名输入框 -->
          <el-form-item
            label="用户名"
            prop="username"
          >
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <!-- 密码输入框 -->
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <!-- 邮箱输入框 -->
          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <!-- 手机输入框 -->
          <el-form-item
            label="手机"
            prop="mobile"
          >
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>

        <!-- 对话框底部按钮区域 -->
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addDialogValidate"
          >确 定</el-button>
        </span>
      </el-dialog>
      <!-- 对话框区域 end -->

    </el-card>
    <!-- 卡片区域 end -->
  </div>
</template>

<script>
export default {
  data () {
    // 自定义邮箱的校验规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/

      if (regEmail.test(value)) {
        // 合法的邮箱执行回调
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
    }

    // 自定义手机校验规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机的正则表达式
      const regMobile =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

      if (regMobile.test(value)) {
        // 合法的手机号执行回调
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }

    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: null,
        pagenum: 1,
        pagesize: 5
      },
      // 用户列表数据
      userList: [],
      // 用户总数
      total: 0,
      // 决定了对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户表单数据对象
      addForm: {
        username: '',
        password: '',
        emali: '',
        mobile: ''
      },
      // 添加用户表单校验对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // 调用该方法，发起网络请求
    this.getUserList()
    // this.handleSizeChange()
  },
  methods: {
    // 获取用户数据的方法
    async getUserList () {
      const { data: res } = await this.$http.req('users', 'get', {
        params: this.queryInfo
      })
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 当分页栏里的 每页总条数发生变化时触发(获取最新变化的总页数)
    handleSizeChange (newPageSize) {
      // 获取最新总页数并且发起网络请求更新当前用户列表数据
      this.queryInfo.pagesize = newPageSize
      this.getUserList()
    },
    // 当分页栏里的 当前页数发生改变时触发(获取最新的当前页数)
    handleCurrentChange (newCurrentPage) {
      // 获取当前最新页数并且发起网络请求更新当前用户列表数据
      this.queryInfo.pagenum = newCurrentPage
      this.getUserList()
    },
    // 更新用户状态的时候调用
    async userStatusChange (userInfo) {
      console.log(userInfo.id)
      const { data: res } = await this.$http.req(
        `users/${userInfo.id}/state/${userInfo.mg_state}`,
        'put'
      )
      if (res.meta.status !== 200) {
        // 当用户状态更新失败的时候 按钮应当不会发生变化 所以取反让其保持原样
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('用户状态更新失败！')
      }
      this.$message.success('用户状态更新成功！')
    },
    // 当输入添加用户信息后点击确认按钮时触发
    addDialogValidate () {
      this.$refs.addRuleForm.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.req(
          'users',
          'post',
          this.addForm
        )
        if (res.meta.status !== 201) return this.$message.error('添加用户失败')
        this.$message.success('添加用户成功')
        this.addDialogVisible = false
        this.getUserList()
      })
    },
    // 当点击添加用户对话框中的取消时触发（重置字段）
    closeDialog () {
      // 重置表单
      this.$refs.addRuleForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.search-row {
  margin-bottom: 15px;
}
</style>
