import Vue from 'vue'
// import axios from 'axios'
import App from './App.vue'
import '@/plugins/element'
import router from './router'
import store from './store'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式
import '@/assets/css/global.css'
// 导入网络请求模块
import { http } from '@/network/request'

// 将请求模块挂载到vue原型上
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
