<template>
  <div>
    <el-carousel
      :interval="4000"
      type="card"
      height="400px"
    >
      <el-carousel-item
        v-for="item in srcArr"
        :key="item.id"
      >
        <img
          :src="item.idView"
          alt="加载失败"
        >
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      srcArr: [
        { id: 0, idView: require('../assets/images/1.png') },
        { id: 1, idView: require('../assets/images/2.png') },
        { id: 2, idView: require('../assets/images/3.jpg') },
        { id: 3, idView: require('../assets/images/4.jpg') },
        { id: 4, idView: require('../assets/images/5.jpeg') }
      ]
    }
  }
}
</script>

<style>
.el-carousel__item img {
  height: 100%;
  width: 100%;
  color: #475669;
  opacity: 0.75;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
