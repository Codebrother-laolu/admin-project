# 电商后台管理系统

## 一、简单做个记录哈

## 用到的技术栈：Vue + node.js + Element-ui + axios

### 登录功能
```
1.借助Element-ui对页面完成布局

2.网络请求用到了axios，进行了简单的封装

import axios from 'axios'

// 封装一个axios请求方法
function req (path, mode, object) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    timeout: 5000
  })

  // 网络拦截
  instance.interceptors.request.use(config => {
    // 在网络请求发送之前给他的请求头加个授权字段
    config.headers.Authorization = window.sessionStorage.getItem('token')
    // 拦截请求处理完之后还得放行
    return config
  })

  // 根据传值进行对应的网络请求
  if (mode === 'get') {
    return instance(path, object)
  } else if (mode === 'post') {
    return instance.post(path, object)
  }
}
// 将封装好的方法存入对象中（目的是将该方法挂到原型上提供每个页面直接调用）
export const http = {}
http.req = req

3. 剩下的就是根据用户输入的数据发起网络请求，并处理后台返回的数据

```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
