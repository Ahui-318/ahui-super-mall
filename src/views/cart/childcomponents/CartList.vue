<template>
  <scroll class="cart-scroll" ref="carscroll">
    <div class="cart-item" v-for="item in getCartList">
      <div class="item-button" >
        <check-button :is-change='item.check' @click.native="checkClick(item)"/>
      </div>
      <div class="item-img">
        <img :src="item.img" alt="" class="image" />
      </div>
      <div class="item-info">
        <div class="item-title">{{ item.title }}</div>
        <div class="item-desc">{{ item.desc }}</div>
        <div class="item-bottom">
          <div class="item-price left">￥{{ item.realPrice }}</div>
          <div class="item-count right">x{{ item.count }}</div>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
import Swiper from "@/components/common/swiper/Swiper.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import { mapGetters } from "vuex";
import CheckButton from '@/components/common/button/CheckButton.vue';

export default {
  components: { Swiper, Scroll, CheckButton },
  name: "CartList",
  data() {
    return {};
  },
  methods: {
    checkClick(item){
      item.check = !item.check
    }
  },
  computed: {
    ...mapGetters(["getCartList"]),
  },
  activated() {
    console.log("---");
    this.$refs.carscroll.refresh();
  },
};
</script>

<style scoped>
.cart-scroll {
  height: calc(100% - 44px);
}
.cart-item {
  /* float: left; */
  position: relative;
  /* width: 320px; */
  width: 100%;
  overflow: hidden;
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 5px;
  /* background-color: rgb(206, 159, 159); */
}
.item-button {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-img {
  padding: 5px;
}
.item-img img {
  /* width: 80px; */
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  width: 200px;
  overflow: hidden;
  margin-top: 10px;
  position: absolute;
  bottom: 20px;
  left: 105px;
  right: 10px;
}
.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
  /* padding: 5px 10px;
  position: relative; */
}
.item-title,
.item-desc {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-bottom .item-price {
  color: orangered;
}
</style>