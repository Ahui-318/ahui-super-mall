<template>
  <div id="tab-bar">
    <slot> </slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style>
#tab-bar {
  position: fixed;
  /* left 和right 设置为零可以让元素宽度正好占据整个屏幕的宽度 */
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  background-color: #f6f6f6;
  /* x y 的偏移量 ，模糊程度  颜色 */
  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);
}
</style>