<template>
  <div class="cart">
    <!-- 购物车头 -->
    <cart-nav-bar></cart-nav-bar>
    <!-- 购物车内容列表 -->
    <cart-list></cart-list>
    <!-- 购物车综合栏 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import CartBottomBar from "./childcomponents/CartBottomBar.vue";
import CartList from "./childcomponents/CartList";
import CartNavBar from "./childcomponents/CartNavBar.vue";
export default {
  components: { CartNavBar, CartList, CartBottomBar },
  name: "cart",
};
</script>

<style scoped>
.cart {
  height: calc(100vh - 49px - 40px);
}
</style>