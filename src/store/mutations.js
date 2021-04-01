import { ADD_COUNTER, ADD_CART } from "./mutation_types";
export default {
  [ADD_COUNTER](state, payload) {
    payload.count += 1;
  },
  [ADD_CART](state, payload) {
    payload.check = true;
    state.cartList.push(payload)
  }
}