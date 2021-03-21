<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <slot name="item-icon-active" v-else></slot>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  // 使用组件之间的通信，父组件向子组件传递 路由
  props: {
    link: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
      // 判断路径是否在 ，存在则是活跃状态
      return this.$route.path.indexOf(this.link) !== -1;
    },
    activeStyle() {
      // 判断当前文字所在的组件是否属于活跃状态
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      // 使用动态路由
      this.$router.replace(this.link);
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
}
.tab-bar-item img {
  height: 24px;
  width: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
</style>