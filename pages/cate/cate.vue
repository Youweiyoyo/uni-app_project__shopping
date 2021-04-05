<template>
  <view >
    <!-- 使用自定义的搜索组件 -->
    <my-search :radius=15 :bgcolor="'#007AFF'" @click='gotoSearch'></my-search>
    <view class="scroll-view-continer">
      <!-- 左侧的盒子 -->
      <scroll-view scroll-y="true" :style="{height:wh + 'px'}" class="left-scroll">
        <block v-for="(item,index) in CateList" :key="index">
          <view :class="['left-scroll-item-view',  index=== active ? 'active':'']" @click="activeChanged(index)">
            {{item.cat_name}}
          </view>
        </block>
      </scroll-view>
      <!-- 右侧的盒子 -->
      <scroll-view scroll-y="true" :style="{height:wh + 'px'}" :scroll-top=scrollTop >
        <view class="cate-lv2" v-for="(item2,index2) in cateLevel2" :key="index2">
          <view class="cate-lv2-title">
            {{item2.cat_name}}
          </view>
          <!-- 渲染三级菜单 -->
          <view class="cate-lv3" >
            <view class="cate-lv3-continer" v-for="(item3,index3) in item2.children" @click="gotoGoodList(item3)">
             <image :src="item3.cat_icon" mode="widthFix"></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
      wh:0,  // 当前设备的可用高度
      CateList:[] ,// 一级分类信息
      active:0 ,  // 控制激活项的变量
      cateLevel2:[] , // 二级分类信息
      scrollTop:0  // 滚动条位置
      };
    },
   async onLoad(){
      const Info = await uni.getSystemInfo()  // 获取用户的设备型号
       // 可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度 - 自定义的search组件高度
      this.wh = Info[1].windowHeight - 50// 拿到屏幕的可用高度
      this.getCateInfo()
    },
    methods:{
      // 获取分类的请求
     async getCateInfo(){
      const {data:res}  =  await uni.$http.get('/api/public/v1/categories')
      console.log(res)
      if(res.meta.status !== 200) return uni.$showMsg('获取分类数据失败')
      this.CateList = res.message  
      this.cateLevel2 = res.message[0].children // 为二级菜单赋值
      },
      // 激活事件
      activeChanged(i){
        this.active = i
        this.cateLevel2 = this.CateList[i].children  // 点击某一项后，为其点击的选项重新赋值显示
        this.scrollTop  = this.scrollTop === 0 ? 1 : 0 // 判断滚顶条距离顶部的距离
      },
      // 点击商品跳转到详情页
      gotoGoodList(item3){
        uni.navigateTo({
          url:'../../subpkg/good_list/good_list?cid='+item3.cat_id
        })
      },
      // 跳转倒search页面
      gotoSearch(){
        uni.navigateTo({
          url:'../../subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
.scroll-view-continer{
  display: flex;
  .left-scroll{
    width: 120px;
    .left-scroll-item-view{
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;
      &.active{
        background-color: #FFFFFF;
        position: relative;
        &::before{
          content: '';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #007AFF;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
  .cate-lv2-title{
    font-size: 12px;
    font-weight: 700;
    text-align: center;
    padding: 15px 0;
  }
  .cate-lv3{
    display: flex;    
    flex-wrap: wrap;
    .cate-lv3-continer{
     display: flex;
     width: 33.33%;
     flex-direction: column;
     text-align: center;
     align-items: center;
    }
    image{
      width: 60px;
    }
    text {
      font-size: 16px;
    }
  }
}
</style>
