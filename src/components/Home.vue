<template>
  <div class="height-100">
    <!-- elementUI中最外层的布局容器 -->
    <el-container class="height-100">

      <!-- 头部区域 -->
      <el-header>
        <h2 class="header-text">电商后台管理系统</h2>
        <el-button
          type="message"
          @click="sign_out"
        >退出</el-button>
      </el-header>

      <!-- 主体区域 -->
      <el-container>

        <!-- 左侧边栏区域 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div
            class="collapse"
            @click="clickCollapse"
          >|||</div>
          <el-menu
            :default-openeds='["125", "103", "101", "102", "145"]'
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#409EFF"
            :collapse="isCollapse"
            :collapse-transition="false"
            router
          >
            <!-- 一级菜单 -->
            <el-submenu
              :index="item.id + ''"
              v-for="(item, index) in menuList"
              :key="item.id"
            >
              <!-- 一级菜单模板区域 -->
              <template slot="title">
                <!-- 一级菜单图标 -->
                <i :class="iconObj[index]"></i>
                <!-- 一级菜单文本 -->
                <span>{{ item.authName }}</span>
              </template>

              <!-- 二级菜单区域 -->
              <el-menu-item
                :index="'/' + subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id"
              >
                <template slot="title">
                  <!-- 二级菜单图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 二级菜单文本 -->
                  <span>{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>

          </el-menu>
        </el-aside>

        <!-- 右侧主体区域 -->
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 菜单数据列表
      menuList: [],
      // 导航菜单每一栏对应的小图标类名集合
      iconObj: [
        'iconfont icon-users',
        'iconfont icon-tijikongjian',
        'iconfont icon-shangpin',
        'iconfont icon-danju',
        'iconfont icon-baobiao'
      ],
      // 导航菜单是否折叠
      isCollapse: false
    }
  },
  created () {
    // 调用获取菜单列表数据的请求
    this.getMenuList()
  },
  methods: {
    sign_out () {
      // 利用路由返回登录页面
      this.$router.push('/login')
    },
    // 获取左侧菜单列表数据
    async getMenuList () {
      const { data: res } = await this.$http.req('menus', 'get')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      // 将请求到的数据存放到menuList中
      this.menuList = res.data
    },
    // 点击事件决定左侧导航菜单的折叠与否
    clickCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.height-100 {
  height: 100%;
}

.el-header {
  position: relative;
  background-color: rgb(57, 180, 180);

  .el-button {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  .header-text {
    line-height: 20px;
    color: white;
  }
}

.el-aside {
  background-color: #545c64;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: rgb(226, 226, 226);
}

.iconfont {
  margin-right: 10px;
}

.collapse {
  text-align: center;
  color: white;
  line-height: 24px;
  letter-spacing: 0.2em;
}
.collapse:hover {
  cursor: pointer;
}
</style>
