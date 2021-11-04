// import Vue from 'vue'
import axios from 'axios'

// 封装一个axios请求方法
function req (path, mode, object) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    timeout: 5000
  })

  instance.interceptors.request.use(config => {
    // 在网络请求发送之前给他的请求头加个授权字段
    config.headers.Authorization = window.sessionStorage.getItem('token')
    // 拦截请求处理完之后还得放行
    return config
  })

  if (mode === 'get') {
    return instance(path, object)
  } else if (mode === 'post') {
    return instance.post(path, object)
  }
}

export const http = {}
http.req = req
