// 1.导入Vue和Vuex
import Vue from "vue";
import Vuex from 'vuex';
// 导入了cart模块
import modeleCart from './cart.js'
// 2.挂载Vue的插件
Vue.use(Vuex)
// 3.创建Store实例对象
const store = new Vuex.Store({
  modules:{
    'm_cart':modeleCart
  },
})
// 4.向外暴露出store
export default store