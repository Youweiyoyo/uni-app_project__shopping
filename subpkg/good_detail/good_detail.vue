<template>
  <view class="goodInfo" v-if="goods_Info.goods_name">
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item,index) in goods_Info.pics" :key="index">
        <image :src="item.pics_big" mode="widthFix" @click="pverImage(index)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">￥{{goods_Info.goods_price}}</view>
      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name">{{goods_Info.goods_name}}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递：免运费 </view>
    </view>
    <!-- 商品主体信息 -->
    <rich-text :nodes="goods_Info.goods_introduce"></rich-text>
    <!-- 底部navBar组件 -->
    <view class="navBar">
      <uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    computed:{
       // 调用 mapState 方法，把 m_cart 模块中的 cart 数组映射到当前页面中，作为计算属性来使用
      // ...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])
      ...mapState('m_cart',['cart'])
    },
    data() {
      return {
        goods_Info: {} ,// 商品详情
        // navBar配置参数
         options: [{
                    icon: 'shop',
                    text: '店铺',
                    infoBackgroundColor:'#007aff',
                    infoColor:"red"
                }, {
                    icon: 'cart',
                    text: '购物车',
                    info: 2
                }],
                buttonGroup: [{
                  text: '加入购物车',
                  backgroundColor: '#ff6600',
                  color: '#fff'
                },
                {
                  text: '立即购买',
                  backgroundColor: '#ff0000',
                  color: '#fff'
                }
                ]
      };
    },
    onLoad(option) {
      const goods_id = option.goods_id;
      this.getGoodsInfo(goods_id);
    },
    methods: {
      // 获取商品详情
      async getGoodsInfo(id) {
        console.log(id)
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id: id
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g,'<img style="display:block;"').replace(/webp/,'jpg')
        this.goods_Info = res.message
      },
      // 点击查看图片
      pverImage(index) {
        uni.previewImage({
          current: index,
          urls: this.goods_Info.pics.map(item => item.pics_big)
        })
      },
      // navBar跳转事件
      onClick(e){
        if(e.content.text ==='购物车'){
          uni.switchTab({
            url:'../../pages/cart/cart'
          })
        }
      }
    }
  }
</script>

<style lang="scss">
.goodInfo{
  padding-bottom: 50px;
  
  swiper {
    height: 750rpx;
  
    image {
      width: 100%;
      height: 100%;
    }
  }
  
  // 商品信息区域的样式
  .goods-info-box {
    padding: 10px;
    padding-right: 0;
  
    .price {
      color: #c00000;
      font-size: 18px;
      margin: 10px 0;
    }
  
    .goods-info-body {
      display: flex;
      justify-content: space-between;
  
      .goods-name {
        font-size: 13px;
        padding-right: 10px;
      }
  
      // 收藏区域
      .favi {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #efefef;
        color: gray;
      }
    }
  
    // 运费
    .yf {
      margin: 10px 0;
      font-size: 12px;
      color: gray;
    }
  }
  
  // navbar
  .navBar{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }
}
  
</style>
