<template>
  <swiper :interval= 'interval'>
    <swiper-item v-for="item in banners" >
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem} from 'components/common/swiper/index';
export default {
  name:'homeswiper',
  components:{
    Swiper,
    SwiperItem
  },
  data() {
    return {
      interval:1000
    }
  },
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>

</style>