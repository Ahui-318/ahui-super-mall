<template>
  <nav-bar class="nav-bar">
    <div slot="center">购物车({{getCartCount}})</div>
  </nav-bar>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import { mapGetters } from "vuex";

export default {
  name:'CartNavBar',
  components: { NavBar },
  computed:{
    ...mapGetters([
      'getCartCount'
    ])
  }

}
</script>

<style scoped>
.nav-bar{
  position: relative;
  z-index: 9;
  background-color: var(--color-tint);
  font-size: 16px;
  color: #fff;
}
</style>