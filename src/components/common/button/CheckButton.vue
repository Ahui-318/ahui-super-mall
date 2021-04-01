<template>
  <div class="check" :class="{ change: isChange }">
    <img src="@/assets/image/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChange: {
      type: Boolean,
      default: false,
    },
  },
  
};
</script>

<style scoped>
.check {
  width: 20px;
  background-color: rgb(95, 93, 93);
  border-radius: 50%;
  border: 2px solid rgb(95, 93, 93);
}
.change {
  background-color: rgb(151, 16, 16);

  border: 1px solid rgb(151, 16, 16);
}
</style>