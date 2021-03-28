<template>
  <swiper :interval="interval">
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name: "homeswiper",
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      interval: 1000,
      isLoad: false,
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        // console.log('----');
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style>
</style>