<template>
	<view class="search-view-container" :style="{'background-color':bgcolor}">
    <!-- 使用view模拟search框 -->
		<view class="search-box" :style="{'border-radius': radius + 'px'}" @click="searchBoxHandler">
      <!-- 使用 uni-UI组件 -->
      <uni-icons type="search" size="17"></uni-icons>
       <text class="placholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
    props:{
      // 背景颜色
      bgcolor:{
        type:String,
        default:'#007AFF'
      },
      // 圆角尺寸
      radius:{
        type:Number,
        // 单位是px
        default:19
      }
    },
		data() {
			return {
				
			};
		},
    methods:{
      // 该事件通过$emit触发在父组件中使用的子组件标签上通过@绑定click事件
      searchBoxHandler(){
        this.$emit('click')
      }
    }
    
	}
</script>

<style lang="scss">
.search-view-container{
  display: flex;
  align-items: center;
  height: 50px;
  // background-color: #007AFF;   // 移除了背景颜色，由props控制
  padding: 5px 10px;
  .search-box{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 36px;
    // border-radius: 19px;    // 移除了圆角尺寸，由props控制
    background-color: #FFFFFF;
    .placholder{
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>
