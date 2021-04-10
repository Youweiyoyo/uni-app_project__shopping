export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块化state数据
  state: () => ({
    //   购物车的数组，用来存储购物车中每个商品的信息对象
    //    每个商品的信息对象，都包含如下 6 个属性：
    //     { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    //  && 遇到为真的 则往后走，碰到假就返回假,或者到最后一个就返回最后一个
    //  || 遇到假的 则往后走，碰到真的就返回真，或者到最后一个一个就返回最后一个
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),

  // 模块化 mutations 方法
  mutations: {
    addToCart(state, goods) {
      console.log(goods, '---<<<')
      // 根据提交的商品的Id，查询购物车中是否存在这件商品
      // 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
      const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
      this.commit('m_cart/saveToStorage')
    },
    // 本地存储方法
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 更新按钮状态
    updataGoodState(state, goods) {
      const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_state = goods.goods_state
        this.commit('m_cart/saveToStorage')
      }
    },
    // 更新num数量
    updataGoodNum(state, goods) {
      const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
      if (findResult) {
        findResult.goods_count = goods.goods_count
        this.commit('m_cart/saveToStorage')
      }
    },
    // 删除的方法
    removeGoodsById(state, goods_id) {
      // 调用数组的 filter 方法进行过滤
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
    }
},

// 模块化 getters 方法
getters: {
  total(state) {
    console.log(state, '-->')
    let c = 0;
    state.cart.forEach(goods => c += goods.goods_count);
    return c
  }
}
}
