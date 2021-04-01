import { myToast } from './Toast.vue';

const obj = {}

obj.install = function (Vue) {

  
  let myCon = Vue.extend(myToast);
  let toast = new myCon();
  toast.$mount(document.createElement('div'))
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = myToast;
}

// Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器
/* // 第二个参数是一个可选的选项对象：
obj.install = function (Vue) {
  console.log('---');
  // 使用构造器创建组件
  let toastConstructor = Vue.extend(Toast);

  let Toast = new toastConstructor();
  //  挂载到div中
  toast.$mount(document.createElement('div'))
  // toast.$el对应的就是div
  document.body.appendChild(Toast.$el)
  Vue.prototype.$toast = myToast;
  // console.log(Vue.prototype.$toast );
} */

export default obj
