<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scorll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 创建bscroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // 根据不同的常见 设置是否实时监听 位置
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      observeDOM: true,
      pullUpLoad: true,
    });
    // 返回顶部按钮的显示和隐藏
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }
    // 监听上拉加载c更多事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
        // console.log("234");
      });
    }
  },
  methods: {
    // 返回顶部的事件监听
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
      // console.log(this.probeType);
    },
    getScrollY() {
      return this.scroll.y ? this.scroll.y : 0;
      console.log(this.scroll.y);
    },
  },
};
</script>

<style scoped>
</style>