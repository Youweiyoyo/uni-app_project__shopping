<template>
  <view>
    <view class="login">
      <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
      <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
      <view class="tips-text">登录后尽享更多权益</view>
    </view>
  </view>
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    name: "my-login",
    data() {
      return {

      };
    },
    computed: {
      ...mapState('m_user', ['redirectInfo']),
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
      // 获取用户的登录信息
      getUserInfo(e) {
        console.log(e)
        // 判断用户是否登录成功
        if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权')
        console.log(e.detail.userInfo)
        // 调用方法，将用户的基本信息存储进vuex中
        this.updateUserInfo(e.detail.userInfo)
        // 获取登录成功后的 Token 字符串
        this.getToken(e.detail)
      },
      // 获取token
      async getToken(info) {
        console.log(info, 'info<===')
        // 调用微信的登录接口
        const [err, res] = await uni.login().catch(err => err)
        console.log(res, 'res<===')
        if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败!')
        // 创建参数对象
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature,
        }
        console.log(query)
        const {
          data: loginResult
        } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        console.log(loginResult, '<===')
        if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败')
        uni.$showMsg('登录成功')
        // 更新token
        this.updateToken(loginResult.message.token)
        this.navigateBack()
      },
      navigateBack() {
        // redirectInfo 不为 null，并且导航方式为 switchTab
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          // 调用小程序提供的 uni.switchTab() API 进行页面的导航
          uni.switchTab({
            // 要导航到的页面地址
            url: this.redirectInfo.from,
            // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .login {
    height: 700rpx;
    background-color: #F1F1F1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    &::after {
      content: ' ';
      display: block;
      background-color: #FFFFFF;
      width: 100%;
      height: 40px;
      position: absolute;
      left: 0;
      bottom: 0;
      border-radius: 100%;
      transform: translateY(50%);
    }

    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #007AFF;
    }

    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
