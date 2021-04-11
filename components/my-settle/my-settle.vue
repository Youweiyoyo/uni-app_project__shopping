<template>
	<view class="settle">
    <!-- 全选区域 -->
    <label class="radio" @click="allCheck">
      <radio :checked="isCheck" color="#ff6600" /><text>全选</text>
    </label>
    <!-- 合计区域 -->
    <view class="outBox">
      合计: <text class="outTxt">￥{{checkedGoodsAmount}}</text>
    </view>
    <!-- 结算区域 -->
    <view class="js" >
      结算({{checkoutCount}})
    </view>
	</view>
</template>

<script>
  import { mapGetters , mapMutations} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
    methods:{
      ...mapMutations('m_cart',['updateAllGoodsState']),
      // 全选按钮事件
      allCheck(){
          // 修改购物车中所有商品的选中状态
         // !this.isCheck 表示：当前全选按钮的状态取反之后，就是最新的勾选状态
        this.updateAllGoodsState(!this.isCheck)
      }
    },
    computed:{
      // 第一个参数导入那个模块，第二个参数是那个方法或选项
      ...mapGetters('m_cart',['checkoutCount','total','checkedGoodsAmount']),
     isCheck(){
       return this.total === this.checkoutCount
     }
      
    }
	}
</script>

<style lang="scss">
.settle{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #F8F8F8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-left: 10px;
  .outTxt{
    color: #DD524D;
  }
  .js{
    height: 50px;
    min-width: 100px;
    line-height: 50px;
    text-align: center;
    color: #FFFFFF;
    background-color: #ff0066;
  }
}
</style>
