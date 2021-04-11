<template>
	<view>
		<!-- 选择收货地址的盒子 -->
    <view class="address" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="addressButton" @click="addAddress">请选择收货地址+</button>
    </view>
    <!-- 收货信息盒子 -->
    <view class="infoBox" v-else @click="addAddress">
      <!-- 上 -->
      <view class="infoTop">
        <!-- 左侧 -->
        <view class="infoTopLeft">
          <view class="infoName">收货人:<text>{{address.userName}}</text></view>
        </view>
        <!-- 右侧 -->
        <view class="infoTopRight">
          <view class="infoPhone">联系电话: <text>{{address.telNumber}}</text></view>
          <uni-icons type="arrowright" size="16" class="icons"></uni-icons>
        </view>
      </view>
      <!-- 下 -->
      <view class="infoBottom">
        <view class="infoBottomLeft">收货地址:</view>
        <view class="addressInfo"> {{addStr}}</view>
      </view>
    </view>
    <!-- 底部分隔线 -->
    <image src="../../static/cart_border@2x.png" class="fgx"></image>
	</view>
</template>

<script>
  import {mapState, mapMutations,mapGetters} from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
				// address:{}   // 收货地址信息
			};
		},
    methods:{
      // 添加收货地址事件
      ...mapMutations('m_user',['updataAdderss']),
     async addAddress(){
       const [err,res] = await uni.chooseAddress().catch(err => err)
        console.log(res)
        if(err === null && res.errMsg === 'chooseAddress:ok'){
          // this.address = res
          this.updataAdderss(res)
        }
        if(err && (err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response')){
          this.reAuth()
        }
      },
      async reAuth(){
        // 提示用户对地址进行授权
        const [err2,confirmResult] = await uni.showModal({
          content: '检测到您没打开地址权限，是否去设置打开？',
          confirmText: "确认",
          cancelText: "取消",
        })
        if(err2) return
        // 提示用户进行授权
        if(confirmResult.cancel) return uni.$showMsg('您取消了地址授权')
        // 如果用户点击了确认
        if(confirmResult.confirm) return uni.openSetting({
          success(res) {
            console.log(res)
            if(res.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
            if(!res.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权')
          }
        })
      }
    },
    computed:{
      ...mapState('m_user',['address']),
      ...mapGetters('m_user',['addStr'])
    }
	}
</script>

<style lang="scss">
.address{
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.infoBox{
  padding: 0px 5px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  .infoTop{
    display: flex;
    justify-content: space-between;
    .infoTopRight{
      display: flex;
    }
  }
  .infoBottom{
    display: flex;
    margin-top: 10px;
    .addressInfo{
      white-space: nowrap;
    }
  }
}
.fgx{
  display: block;
  width: 100%;
  height: 5px;
}
</style>
