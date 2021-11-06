# 电商后台管理系统

## 简单做个记录哈

## 用到的技术栈：Vue + node.js + Element-ui + axios

### 一、登录功能
#### 1、借助Element-ui对页面完成布局

#### 2、网络请求用到了axios，进行了简单的封装
```
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
```
#### 3、剩下的就是根据用户输入的数据发起网络请求，并处理后台返回的数据

#### 4、还有就是遇到一了一个奇葩的问题，就是控制台莫名的报错，百度是这么说的：
```
控制台的报错：
sockjs.js?9be2:1606 GET http://192.168.16.213:8080/sockjs-node/info?t=1574662800493 net::ERR_CONNECTION_TIMED_OUT

错误分析：
  sockjs-node是一个JavaScript库，提供跨浏览器JavaScript的API，创建了一个低延迟、全双工的浏览器和web服务器之间通信通道。
在项目运行以后，network会一直调用这个接口。如果没有使用，那么就一直会报这个异常。

解决办法：
1.找到/node_modules/sockjs-client/dist/sockjs.js
2.在报错行，注释掉self.xhr.send(payload);这一行，然后就可以解决了
```

### 二、用户管理功能
```
1、实现的功能
  添加用户、删除用户、编辑用户、搜索用户、更改用户的状态、给每个用户分配角色
  
  大概的实现过程就是利用axios进行前后端的数据交互，当我根据对应的功能获取相应的数据再使用Element-ui进行数据的展示然后就收工了！
  这里面对数据的处理我用到了一个作用域插槽，这个知识点是我不怎么熟悉这一波操作以后我大概对作用域插槽的使用方法和使用场景有了一个大概的认知
  
2、这次遇到了两个git提交的问题

  问题一：提交的时候老是超时
  解决办法：
      取消代理：git config --global --unset https.proxy
      
  问题二：远程库与本地库不一致导致没办法正常提交代码
  解决办法：
      将远程仓库的代码拉到本地仓库中更新合并，并取消掉刚刚的commit：git pull --rebase origin master
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
