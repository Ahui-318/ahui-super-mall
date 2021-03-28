<template>
  <div id="detail">
    <detail-nav class="detail-nav" />
    <scroll class="content" ref="scroll">
      <detail-swiper :detailImages="topImages"></detail-swiper>
      <detail-base-info :goods="baseInfoGoods" />
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
import DetailNav from "./childcompontets/DetailNav.vue";
import { getDetails, Goods, Shop, GoodsParam } from "network/detail.js";
import DetailSwiper from "./childcompontets/DetailSwiper.vue";
import DetailBaseInfo from "./childcompontets/DetailBaseInfo.vue";
import DetailShopInfo from "./childcompontets/DetailShopInfo.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import DetailGoodsInfo from "./childcompontets/DetailGoodsInfo.vue";
import DetailParamInfo from './childcompontets/DetailParamInfo.vue';
export default {
  components: {
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
  },
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      baseInfoGoods: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
    };
  },

  created() {
    // 获取路由携带的参数iid
    this.iid = this.$route.params.iid;
    // console.log(this.iid);
    // 获取数据 封装一个获取详情页 数据
    getDetails(this.iid)
      .then((result) => {
        // console.log(result);
        const datas = result.data.result;
        this.topImages = datas.itemInfo.topImages;
        // console.log( this.topImages);
        // 获取商品信息数据 并且传给子组件
        this.baseInfoGoods = new Goods(
          datas.itemInfo,
          datas.columns,
          datas.shopInfo.services
        );
        // 保存店铺信息
        this.shopInfo = new Shop(datas.shopInfo);
        // console.log(datas.shopInfo);
        // 保存商品的详细信息
        this.detailInfo = datas.detailInfo;
        // 保存参数信息
        this.paramInfo = new GoodsParam(
          datas.itemParams.info,
          datas.itemParams.rule
        );
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    imageLoad() {
      // 加载完照片后，刷新一下页面
      this.$refs.scroll.refresh();
    },
  },
};
</script>

<style scoped>
/* 隐藏tabbar */
#detail {
  position: relative;
  z-index: 9;

  height: 100vh;
  background-color: #fff;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
</style>