import Vue from 'vue'
import App from './App'
import { $http } from '@escook/request-miniprogram'

Vue.config.productionTip = false

App.mpType = 'app'
uni.$http = $http
// 设置请求基础路径
$http.baseUrl = "https://www.uinav.com"
// 请求之前做一些事情...
$http.beforeRequest = function(options){
  uni.showLoading({
    title:"数据加载中"
  })
}
// 请求结束后做一些事情...
$http.afterRequest = function(){
  uni.hideLoading()
}
// 封装展示消息提示的方法
uni.$showMsg = function(title='数据加载失败!',duration=1500){
    uni.showToast({
      title:title,
      duration:duration,
      icon:'none'
    })
}
const app = new Vue({
    ...App
})
app.$mount()
