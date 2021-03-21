<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banner"></home-swiper>
    <home-recommend :recommends="recommends"></home-recommend>
    <home-feature></home-feature>
    <tab-control :titles="titles" class="tab-control"></tab-control>
    <ul>
      <li>你好1</li>
      <li>你好2</li>
      <li>你好3</li>
      <li>你好4</li>
      <li>你好5</li>
      <li>你好6</li>
      <li>你好7</li>
      <li>你好8</li>
      <li>你好9</li>
      <li>你好10</li>
      <li>你好11</li>
      <li>你好12</li>
      <li>你好13</li>
      <li>你好14</li>
      <li>你好15</li>
      <li>你好16</li>
      <li>你好17</li>
      <li>你好18</li>
      <li>你好19</li>
      <li>你好20</li>

      <li>你好16</li>
      <li>你好17</li>
      <li>你好18</li>
      <li>你好19</li>
      <li>你好20</li>

      <li>你好16</li>
      <li>你好17</li>
      <li>你好18</li>
      <li>你好19</li>
      <li>你好20</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabcontrol/TabControl";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend.vue";
import HomeFeature from "./childComps/HomeFeature.vue";

import { getHomeMultidata } from "network/home";

export default {
  name: "home",
  data() {
    return {
      banner: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
    };
  },
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
  },
  created() {
    getHomeMultidata()
      .then((result) => {
        this.banner = result.data.data.banner.list;
        this.recommends = result.data.data.recommend.list;
        console.log(this.banner);
      })
      .catch((err) => {
        this.res = err;
      });
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
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
  /* z-index: 9; */
}
</style>