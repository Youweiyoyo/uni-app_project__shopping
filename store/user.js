export default {
  // 开启命名空间
  namespaced:true,
  //state数据
    state:()=>({
      address:JSON.parse(uni.getStorageSync('address') || '{}')
    }),
    // 方法
    mutations:{
      updataAdderss(state,address){
        state.address = address
        this.commit('m_user/saveAddressToStorage')
      },
      // 定义本地存储的方法
      saveAddressToStorage(state){
        uni.setStorageSync('address',JSON.stringify(state.address))
      }
    },
    // 计算属性
    getters:{
     addStr(state){
       if(!state.address.provinceName) return ''
       // 拼接省市区的详细地址返回给用户
       return state.address.provinceName + state.address.cityName +state.address.countyName+state.address.detailInfo
     }
    }
}