<template>
  <div id="home">
    <!-- 顶部导航 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="scroll"
            @pullingUp= "pullup"
            >
      <!-- 轮播图 -->
      <home-swiper :banners="banner"></home-swiper>
      <!-- 推荐 -->
      <home-recommend :recommends="recommends"></home-recommend>
      <!-- 图片 -->
      <home-feature></home-feature>
      <!-- 分类展示导航 @tabClick是子组件传递来方法-->
      <tab-control :titles="titles" class="tab-control" @tabClick="tabClick" />
      <!-- 分类展示 -->
      <goods-list :goods="showGoodsList" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShow" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabcontrol/TabControl";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend.vue";
import HomeFeature from "./childComps/HomeFeature.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";
import GoodsList from "@/components/content/goods/GoodsList.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import BackTop from "@/components/common/backTop/BackTop.vue";

export default {
  name: "home",
  data() {
    return {
      banner: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      // 存放分类展示的数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShow: false,
    };
  },
  computed: {
    showGoodsList() {
      return this.goods[this.currentType].list;
    },
  },
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    GoodsList,
    Scroll,
    BackTop,
  },
  created() {
    // 获取轮播图，推荐数据信息
    this.homeMultidata();

    // 根据分类（type）获取信息
    this.homeGoods("pop");
    this.homeGoods("new");
    this.homeGoods("sell");
  },
  methods: {
    /**
     * 事件监听的方法
     */
    // 子组件传递
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },

    // 返回顶部的事件监听
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 根据上滑位置显示。是否禁用按钮
    scroll(position) {
      // console.log(position
      this.isShow = -position.y > 1000 ? true : false;
    },
    // 上拉加载更多
    pullup(){
      this.homeGoods(this.currentType)
    },

    /**
     * 网络请求的方法
     */
    homeMultidata() {
      getHomeMultidata()
        .then((result) => {
          this.banner = result.data.data.banner.list;
          this.recommends = result.data.data.recommend.list;
        })
        .catch((err) => {
          this.res = err;
        });
    },

    homeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((result) => {
        // console.log(result.data);
        // 根据 type(分类） 获取货物  并把数据给goods
        this.goods[type].list.push(...result.data.data.list);
        this.goods[type].page += 1;
        // console.log(result);
        // console.log(this.goods['pop'].list);
      });
    },
  },
};
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/
</style>
