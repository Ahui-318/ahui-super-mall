<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar v-show="isShow"/>
  </div>
</template>

<script>
import MainTabBar from "components/content/tabbar/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
  computed:{
    isShow(){
      if (this.$route.path.includes('/detail')) {
        return false
      }else{
        return true
      }
    }
  }
};
</script>

<style scoped>
@import 'assets/css/base.css';
</style>
