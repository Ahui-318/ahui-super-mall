<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goods" 
                     :key="index"
                     :gooditem="item" />
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
  components: { GoodsListItem },
  name:'GoodsList',
  props:{
    // 父子组件通信，接收home组件的数据goods
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }


</style>
