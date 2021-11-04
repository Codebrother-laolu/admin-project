import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '@/components/login')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '@/components/Home'),
    redirect: '/welcome',
    children: [
      { path: '/welcome', name: 'welcome', component: () => import(/* webpackChunkName: "about" */ '@/components/Welcome') },
      { path: '/users', name: 'users', component: () => import(/* webpackChunkName: "about" */ '@/components/user/Users') },
      { path: '/roles', name: 'roles', component: () => import(/* webpackChunkName: "about" */ '@/components/roles/Roles') },
      { path: '/rights', name: 'rights', component: () => import(/* webpackChunkName: "about" */ '@/components/roles/Rights') }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // to代表着要去哪个页面
  // from代表着来自哪个页面
  // next可以决定页面的跳转

  // 如果要去往登录页面不用拦截 直接放行
  if (to.path === '/login') return next()
  // 如果该页面没有携带token将强制返回登录页面
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  // 如果携带token则放行
  next()
})

export default router
