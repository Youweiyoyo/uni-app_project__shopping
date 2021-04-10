<template>
	<view>
		<view class="iemtList" >
		  <!-- 左侧图片 -->
		  <view class="listLeft">
        <!-- 如果在使用组件的时候传递的值是true则展示该组件，否则不做展示，默认是false不展示 -->
        <radio :checked="goods.goods_state" color="#DD524D" v-if="radio" @click="radioChangeHandler"></radio>
		    <image :src="goods.goods_small_logo || defaultPic" mode="widthFix"></image>
		  </view>
		  <!-- 右侧文字 -->
		  <view class="rightList">
		    <view class="text">
		      {{goods.goods_name}}
		    </view>
        <view class="num">
          <view class="Price">
            ￥{{goods.goods_price | tofixed}}
          </view>
          <view class="pice" v-if="isShowNum">
            <uni-number-box :min="0" :value="goods.goods_count" @change="numChange"></uni-number-box>
          </view>
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
      },
      // 定义控制radio的展示和隐藏
      radio:{
        type:Boolean,
        default:false
      },
      // 定义控制显示num框的展示和隐藏
      isShowNum:{
        type:Boolean,
        default:false
      }
    },
    filters:{
      // 保留两位小数过滤器
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
		},
    methods:{
      radioChangeHandler(){
        // 向外界的@radio-change，发送id和按钮状态
        this.$emit('radio-change',{
          goods_id:this.goods.goods_id,
          goods_state:!this.goods.goods_state  // 状态为取反后的结果
        })
      },
      // num框change事件
      numChange(val){
        console.log(val,'<====')
        this.$emit('num-change',{
          goods_id:this.goods.goods_id,
          goods_count:val - 0   // 因为无法保证val永远都是数字，需要隐式转换
        })
      }
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
      .num{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .pice{
          margin-bottom: 10px;
        }
      }
      .Price{
        font-size: 16px;
        color: #c00000;
      }
    }
    .listLeft{
      display: flex;
      align-items: center;
      image {
        width: 100px;
        height: 100px;
        display: block;
        margin-right: 10px;
      }
    }
  }
</style>
