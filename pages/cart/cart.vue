<template>
  <view >
    <view class="padding" v-if="cart.length !== 0 ">
      <my-address></my-address>
      <!-- 购物车title -->
      <view class="cartTitle">
        <uni-icons type="shop" size="18"></uni-icons>
        <text class="catrText">购物车</text>
      </view>
      <uni-swipe-action>
        <block v-for="(item,index) in cart" :key="index">
          <uni-swipe-action-item @click="onClick(item)" :right-options="options">
            <my-goods :goods="item" :radio="true" @radio-change="radioChangeHandler" :is-show-num="true"
              @num-change="numChangeHandler"></my-goods>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>
      <my-settle></my-settle>
    </view>
      <!-- 空白购物车区域 -->
      <view class="empty-cart" v-else>
        <image src="../../static/logo.png" class="empty-img"></image>
        <text class="tip-text">空空如也~</text>
      </view>
  </view>
  
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import badgeMix from '@/mixins/tabBar_badge.js'
  export default {
    computed: {
      ...mapState('m_cart', ['cart'])
    },
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#DD524D'
          }
        }]

      };
    },
    methods: {
      ...mapMutations('m_cart', ['updataGoodState', 'updataGoodNum','removeGoodsById']),
      // 监听 radio的变化
      radioChangeHandler(e) {
        this.updataGoodState(e)
      },
      // num框的变化
      numChangeHandler(e) {
        this.updataGoodNum(e)
      },
      onClick(item){
        this.removeGoodsById(item.goods_id)
      }
    },
    mixins: [badgeMix]
  }
</script>

<style lang="scss">
  .padding{
    padding-bottom: 50px;
  }
  .cartTitle {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #efe;

    .catrText {
      margin-left: 10px;
    }
  }
  .empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
