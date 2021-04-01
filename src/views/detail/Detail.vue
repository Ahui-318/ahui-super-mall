<template>
  <div id="detail">
    <detail-nav
      class="detail-nav"
      @detailNavitemClick="detailNavitemClick"
      ref="nav"
    />
    <scroll class="content" ref="scroll" @scroll="detailScroll" :probe-type="3">
      <!-- <div>
        <li v-for="(item, index) in $store.state.cartList" :key="index">
          {{ item }}
        </li>
      </div> -->
      <detail-swiper :detailImages="topImages"></detail-swiper>
      <detail-base-info :goods="baseInfoGoods" />
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="param" />
      <detail-comment-info :commentInfo="commentInfor" ref="comment" />
      <goods-list :goods="recomments" ref="recommend" />
    </scroll>
    <detail-bottom-bar @cartBtnClick="addCartClick" />
    <back-top @click.native="backTop" v-show="isShow" />
    <toast :mes="toastMes" :isShowToast="isShowToast" />
  </div>
</template>

<script>
import DetailNav from "./childcompontets/DetailNav.vue";
import {
  getDetails,
  Goods,
  Shop,
  GoodsParam,
  getRecomment,
} from "network/detail.js";
import DetailSwiper from "./childcompontets/DetailSwiper.vue";
import DetailBaseInfo from "./childcompontets/DetailBaseInfo.vue";
import DetailShopInfo from "./childcompontets/DetailShopInfo.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import DetailGoodsInfo from "./childcompontets/DetailGoodsInfo.vue";
import DetailParamInfo from "./childcompontets/DetailParamInfo.vue";
import DetailCommentInfo from "./childcompontets/DetailCommentInfo.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";
import DetailBottomBar from "./childcompontets/DetailBottomBar.vue";

import { backTop } from "@/common/mixin";
import store from "@/store";
import Toast from "@/components/common/message/Toast.vue";
import { mapActions } from "vuex";

export default {
  components: {
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Toast,
  },
  mixins: [backTop],
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      baseInfoGoods: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfor: {},
      recomments: [],
      // 保存商品，参数，评论，推荐的offsetTop值
      getYs: [],
      currentIndex: 0,
      toastMes: "",
      isShowToast: false,
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
        // 保存评论信息
        if (datas.rate.cRate !== 1) {
          this.commentInfor = datas.rate.list[0];
        }
        setTimeout(() => {
          this.$nextTick(() => {
            // 每次加载都把值保存为空
            this.getYs = [];
            //获取 商，参，评，推的y值
            this.getYs.push(0);
            this.getYs.push(this.$refs.param.$el.offsetTop - 44);
            this.getYs.push(this.$refs.comment.$el.offsetTop - 44);
            this.getYs.push(this.$refs.recommend.$el.offsetTop - 44);
            console.log(this.getYs);
          });
          // console.log(this.getYs);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });

    // 请求推荐数据
    getRecomment()
      .then((result) => {
        this.recomments = result.data.data.list;
        // console.log(this.recomments);
      })
      .catch((err) => {});
  },
  methods: {
    ...mapActions(["addCartProduct"]),
    imageLoad() {
      // 加载完照片后，刷新一下页面
      this.$refs.scroll.refresh();
      // 为了获取准确的值，这个函数放在created和mounted中都不合适 放在update中也太行
      // $nextTick(fn)将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
      // this.$nextTick(() => {
      //   // 每次加载都把值保存为空
      //   this.getYs = [];
      //   //获取 商，参，评，推的y值
      //   this.getYs.push(0);
      //   this.getYs.push(this.$refs.param.$el.offsetTop - 44);
      //   this.getYs.push(this.$refs.comment.$el.offsetTop - 44);
      //   this.getYs.push(this.$refs.recommend.$el.offsetTop - 44);
      //   console.log(this.getYs);
      // });
    },
    // 点击顶部导航，导航到相应位置
    detailNavitemClick(index) {
      // console.log("----");
      this.$refs.scroll.scrollTo(0, -this.getYs[index], 100);
    },
    // 顶部导航根据滚动位置显示
    detailScroll(position) {
      const positiony = -position.y;
      // console.log(positiony);
      // console.log(position.y);
      const length = this.getYs.length;
      // console.log(length);
      for (let i = 0; i < length; i++) {
        // console.log(this.getYs[index]);
        // console.log(positiony);
        if (
          (this.currentIndex !== i &&
            i < length - 1 &&
            positiony >= this.getYs[i] &&
            positiony < this.getYs[i + 1]) ||
          (i === length - 1 && positiony > this.getYs[i])
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 返回顶部
      this.isShow = -position.y > 1000 ? true : false;
    },
    // 添加购物车
    addCartClick() {
      // 获取购物车内商品的信息
      const product = {};
      product.img = this.topImages[0];
      product.desc = this.baseInfoGoods.desc;
      product.realPrice = this.baseInfoGoods.realPrice;
      product.title = this.baseInfoGoods.title;
      product.iid = this.iid;
      // 将商品添加到购物车  异步操作
      // 方式一
      // this.$store.dispatch("addCartProduct", product).then((result) => {
      //   this.isShowToast = true;
      //   this.toastMes = result;
      //   // 设一个定时器
      //   setTimeout(() => {
      //     this.toastMes = "";
      //     this.isShowToast = false;
      //   }, 2000);
      // });
      // mapActions 方式 辅助函数
      this.addCartProduct(product)
        .then((result) => {
          // 组件的方式
          this.isShowToast = true;
          this.toastMes = result;
          // 设一个定时器
          setTimeout(() => {
            this.toastMes = "";
            this.isShowToast = false;
          }, 2000);

          // 开发插件的方式
          // console.log(this.$toast.methods);
          // this.$toast.totalShow(result,1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
/* 隐藏tabbar */
#detail {
  position: relative;
  z-index: 4;

  height: 100vh;
  background-color: #fff;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 58px);
}
</style>