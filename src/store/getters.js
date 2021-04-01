export default {
  // 获取购物车内商品总数
  getCartCount(state) {
    let count = 0;
    // for (let i = 0; i < state.cartList.length; i++) {
    //   const item = state.cartList[i];
    //   count += item.count;
    // }

    state.cartList.forEach(item => {
      count += item.count
    });
    return count
    // return state.cartList.length
  },
  // getCartCount: (state) => {
  //   state.caatList.forEach(item => {
  //     let count = 0 ;
  //     count += item.count
  //   });
  // }
  getCartList(state){
    return state.cartList
  }
}