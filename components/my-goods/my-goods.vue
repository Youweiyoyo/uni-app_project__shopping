<template>
	<view>
		<view class="iemtList" >
		  <!-- 左侧图片 -->
		  <view class="listLeft">
		    <image :src="goods.goods_small_logo || defaultPic" mode="widthFix"></image>
		  </view>
		  <!-- 右侧文字 -->
		  <view class="rightList">
		    <view class="text">
		      {{goods.goods_name}}
		    </view>
		    <view class="Price">
		      ￥{{goods.goods_price | tofixed}}
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
    props:{
      goods:{
        type:Object,
        default:{}
      }
    },
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)
      }
    },
    onLoad(){
    },
		data() {
			return {
				// 默认图片
				defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		}
	}
</script>

<style lang="scss">
.iemtList{
    display: flex;
    padding: 5px 0;
    border-bottom: 1px solid #f0f0f0;
    .rightList{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .text{
        font-size: 13px;
      }
      .Price{
        font-size: 16px;
        color: #c00000;
      }
    }
    .listLeft{
      image {
        width: 100px;
        height: 100px;
        display: block;
        margin-right: 10px;
      }
    }
  }
</style>
