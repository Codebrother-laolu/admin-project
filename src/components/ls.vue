<template>
  <div class="ls">
    <el-form label-width="100px" :model="formData" :rules="loginRules">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { request } from '@/network/request'
export default {
  data () {
    return {
      message: '练习页面',
      formData: {
        name: ''
      },
      loginRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      }
    }
  },
  async created () {
    const { data: res } = await request('login', {
      username: 'admin',
      password: '123456'
    })
    console.log(res)
  }
}
</script>

<style lang="less" scoped>

</style>
