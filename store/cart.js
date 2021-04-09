export default {
  // 为当前模块开启命名空间
   namespaced:true,
   
   // 模块化state数据
   state:()=>({
     //   购物车的数组，用来存储购物车中每个商品的信息对象
    //    每个商品的信息对象，都包含如下 6 个属性：
   //     { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
     cart:[]
   }),
   
   // 模块化 mutations 方法
   mutations:{},
   
   // 模块化 getters 方法
   getters:{}
}