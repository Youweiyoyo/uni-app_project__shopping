<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
		  <swiper-item v-for="(item ,index) in swiperList" :key='index' >
        <navigator class="swiper-item" :url="'/subpkg/good_detail/good_detail?goods_id='+item.goods_id">
           <image :src="item.image_src" mode="widthFix"></image>
        </navigator>
		  </swiper-item>
		</swiper>
    <view class="navList">
      <view v-for="(item,index) in navList" :key='index' @click="goNavbar(item)">
        <image :src="item.image_src" mode="widthFix"></image>
      </view>
    </view>
    <view class="floorlist">
        <view class="flooritem" v-for="(item,i) in floorList" :key='i'>
          <!-- 标题 -->
          <image :src="item.floor_title.image_src" mode="widthFix" class="floortitle"></image>
          <!-- 商品图片 -->
          <view class="floor_img_box">
            <!-- 左侧大盒子 -->
            <navigator class="img_box_left" :url="item.product_list[0].url">
              <image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx'} " mode="widthFix"></image>
            </navigator>
            <!-- 右侧小盒子 -->
            <view class="img_box_right">
              <navigator class="right-img-item" v-for="(item2,i2) in item.product_list" :key='i2' v-if="i2 !== 0" :url="item2.url">
                 <image :src="item2.image_src" mode="widthFix" :style="{width:item2.image_width +'rpx'}"></image>
              </navigator>
            </view>
          </view>
        </view>
        
    </view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[] ,  //  轮播图
        navList:[],    // 分类导航
        floorList:[], // 获取楼层数据
			};
		},
    onLoad() {
      this.getList()
      this.getnavList()
      this.getfloorList()
    },
    methods:{
      // tabBar
      async getList(){
        const {data : res} =  await uni.$http.get('/api/public/v1/home/swiperdata')
        console.log(res)
        if(res.meta.status !== 200) return uni.$showMsg()
        this.swiperList = res.message
      },
      // navBar
     async getnavList(){
          const {data:res} =  await uni.$http.get('/api/public/v1/home/catitems')
          if(res.meta.status !== 200) return uni.$showMsg()
          this.navList = res.message
          console.log(this.navList)
      },
      // 跳转分类
      goNavbar(item){
        if(item.name === '分类'){
          uni.switchTab({
            url:'../cate/cate'
          })
        }
      },
      // 楼层数据
    async  getfloorList(){
      const{data:res} = await uni.$http.get('/api/public/v1/home/floordata')
      if(res.meta.status !== 200) return uni.$showMsg()
      // 将图品路径进行处理
      res.message.forEach(list =>{
        list.product_list.forEach(prod =>{
          prod.url = '/subpkg/good_list/good_list?' + prod.navigator_url.split('?')[1]
        })
      })
      this.floorList = res.message
      console.log('--->',this.floorList)
      }
    }
	}
  
</script>

<style lang="scss">
swiper{
  height: 300rpx;
  .swiper-item ,image {
    width: 100%;
    height: 100%;
  } 
}
.navList{
  display: flex;
  justify-content: space-around;
  margin-top: 15rpx;
  image{
    width: 128rpx;
    height: 140rpx;
  }
}
.floortitle {
  height: 60rpx;
  width: 100%;
  display: flex;
}
.floor_img_box{
  display: flex;
  padding-left: 10rpx;
  .img_box_right{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
