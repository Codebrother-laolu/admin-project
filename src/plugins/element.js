import Vue from 'vue'

import {
  Input, Form, FormItem, Button, Row, Message,
  Header, Aside, Main, Container, Menu, Submenu,
  MenuItem, MenuItemGroup, Breadcrumb, BreadcrumbItem,
  Card, Col, Table, TableColumn, Switch, Tooltip, Pagination,
  Dialog
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
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.prototype.$message = Message
