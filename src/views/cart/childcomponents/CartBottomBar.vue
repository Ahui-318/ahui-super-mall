<template>
  <div class="bottom-bar">
    <div class="cheack">
      <check-button
        class="check-all"
        :isChange="isShow"
        @click.native="clickAll"
      />
      <span class="text">全选</span>
    </div>
    <div class="total">合计（{{ totalPrice }}）</div>
    <div class="pay" >付款（{{ payCount }}）</div>
  </div>
</template>

<script>
import CheckButton from "@/components/common/button/CheckButton.vue";
import { mapGetters } from "vuex";
export default {
  components: { CheckButton },
  name: "CartBottomBar",

  computed: {
    ...mapGetters(["getCartList"]),
    totalPrice() {
      return (
        "￥" +
        this.getCartList
          .filter((item) => {
            return item.check;
          })
          .reduce((pre, cur) => {
            return (pre += cur.count * cur.realPrice);
          }, 0)
          .toFixed(2)
      );
    },
    payCount() {
      return this.getCartList
        .filter((item) => {
          return item.check;
        })
        .reduce((pre, item) => {
          return (pre += item.count);
        }, 0);
    },
    // 全选按钮
    isShow() {
      // 先判断购物车是否有内容，没有为false
      if (this.getCartList.length === 0) {
        return false;
      }
      // 有一部分没有选中则不选，判断每个物品的选中状况，筛选出没有选中的物品，放到一个数组中
      // 对筛选的数组进行判断，长度为0返回ture, 有长度返回false
      return !this.getCartList.filter((item) => !item.check).length;
    },
  },

  methods: {
    // 全选按钮的点击判断
    clickAll() {
      if (this.isShow) {
        // 如果是全选状态，点击就全部选
        this.getCartList.forEach((item) => {
          item.check = false;
        });
      } else {
        // 如果是有部分不选，点击就全选
        this.getCartList.forEach((item) => {
          item.check = true;
        });
      }
      // console.log("---");
    },
    // paying() {
    //   this.$toast.totalshow("iii", 1000);
    // },
  },
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  /* bottom: 40px; */
  display: flex;
  /* width: 100%; */
  height: 40px;
  line-height: 40px;

  /* text-align: center; */
  background-color: gray;
  color: #fff;
  font-size: 13px;
  font-weight: 400;

  /* line-height: 50px; */
}
.cheack {
  /* flex: 1; */
  /* background-color: #fff; */
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 58px;
}
.check-all {
  /* position: relative; */
  /* bottom: -10px; */
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin: auto 5px;
}
/* .text {
} */
.total {
  flex: 1;
  margin: auto 10px;
}
.pay {
  background-color: rgb(247, 89, 89);
  width: 90px;
  padding: 0 4px;
}
</style>