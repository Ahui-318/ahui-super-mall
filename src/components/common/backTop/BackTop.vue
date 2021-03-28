<template>
  <div class="back-top">
    <img src="~assets/image/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name:'BackTop',
  data() {
    return {
      message:'hhh'
    }
  }
}
</script>

<style scoped>
.back-top{
  position: absolute;
  right: 5px;
  bottom: 45px;
  z-index: 10;

}
.back-top img{
  width: 48px;
  height: 48px;
}
</style>