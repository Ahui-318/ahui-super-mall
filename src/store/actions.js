import { ADD_COUNTER, ADD_CART } from "./mutation_types";
export default {
  // context是具有和store 实例相同方法和属性的 context 对象
  addCartProduct(context, payload) {
    // 通过promise我们可以知道actions何时结束的
    return new Promise((resolve, reject) => {
      let addProduct = context.state.cartList.find(
        function (item) {
          return item.iid === payload.iid
        }
      );
      if (addProduct) {
        context.commit(ADD_COUNTER, addProduct)
        resolve('该商品数量+1')
      } else {
        payload.count = 1;
        context.commit(ADD_CART, payload)
        resolve('该商品成功加入购物车')
      }
    })

  }
}