import Vue from 'vue'

import {
  Input, Form, FormItem, Button, Row, Message,
  Header, Aside, Main, Container, Menu, Submenu,
  MenuItem, MenuItemGroup
} from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import 'element-ui/packages/theme-chalk/lib/base.css'

Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Row)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Container)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.prototype.$message = Message
