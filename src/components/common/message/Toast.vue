<template>
  <div class="message" v-show="isShowToast">
    <span>{{ mes }}</span>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props:{
    mes:{
      type:String,
      default:'',
    },
    isShowToast:{
      type:Boolean,
      default:false
    }
  },
  // data() {
  //   return {
  //     mes: "",
  //     isShowToast: false,
  //   };
  // },
  // methods: {
  //   totalshow:function (meseeage, time) {
  //     this.mes = meseeage;
  //     this.isShowToast = true;
  //     setTimeout(() => {
  //       this.mes = '';
  //       this.isShowToast = false;
  //     }, time);
  //   }
  // },
};
</script>

<style scoped>
.message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;

  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 14px;
  padding: 8px 10px;
  border-radius: 15px;
}
.show {
  display: block;
}
</style>