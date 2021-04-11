<template>
  <view>
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
</style>
