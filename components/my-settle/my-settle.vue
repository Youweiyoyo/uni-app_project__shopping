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
    <view class="js" @click="settle">
      结算({{checkoutCount}})
    </view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    name: "my-settle",
    data() {
      return {
        // 倒计时的秒数
        seconds: 3,
        // 定时器的 Id
        timer: null
      };
    },
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      ...mapMutations('m_user', ['updateRedirectInfo']),
      // 全选按钮事件
      allCheck() {
        // 修改购物车中所有商品的选中状态
        // !this.isCheck 表示：当前全选按钮的状态取反之后，就是最新的勾选状态
        this.updateAllGoodsState(!this.isCheck)
      },
      // 结算按钮事件
      settle() {
        // 1.先判断是否选中了商品
        if (!this.checkoutCount) return uni.$showMsg('请选择要结算的商品');
        // 2.在判断用户是否填写了收货地址
        if (!this.addStr) return uni.$showMsg('请选择收货地址');
        // 3.判断用户是否登录
        if (!this.token) return this.delayNavigate()
      },
      // 延迟导航到 my 页面
      delayNavigate() {
        // 1. 展示提示消息，此时 seconds 的值等于 3
        this.seconds = 3
        this.showTips(this.seconds)
        this.timer = setInterval(() => {
          this.seconds--
          // 2. 判断秒数是否 <= 0
          if (this.seconds <= 0) {
            // 2.1 清除定时器
            clearInterval(this.timer)

            // 2.2 跳转到 my 页面
            uni.switchTab({
              url: '/pages/my/my',
              // 页面跳转成功之后的回调函数
              success: () => {
                // 调用 vuex 的 updateRedirectInfo 方法，把跳转信息存储到 Store 中
                this.updateRedirectInfo({
                  // 跳转的方式
                  openType: 'switchTab',
                  // 从哪个页面跳转过去的
                  from: '/pages/cart/cart'
                })
              }
            })

            // 2.3 终止后续代码的运行（当秒数为 0 时，不再展示 toast 提示消息）
            return
          }

          this.showTips(this.seconds)
        }, 1000)
      },
      // 展示倒计时的提示消息
      showTips(n) {
        // 调用 uni.showToast() 方法，展示提示消息
        uni.showToast({
          // 不展示任何图标
          icon: 'none',
          // 提示的消息
          title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
          // 为页面添加透明遮罩，防止点击穿透
          mask: true,
          // 1.5 秒后自动消失
          duration: 1500
        })
      }
    },
    computed: {
      // 第一个参数导入那个模块，第二个参数是那个方法或选项
      ...mapGetters('m_cart', ['checkoutCount', 'total', 'checkedGoodsAmount']),
      // 导入用户模块
      ...mapGetters('m_user', ['addStr']),
      ...mapState('m_user', ['token']),
      isCheck() {
        return this.total === this.checkoutCount
      }
    },
  }
</script>

<style lang="scss">
  .settle {
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

    .outTxt {
      color: #DD524D;
    }

    .js {
      height: 50px;
      min-width: 100px;
      line-height: 50px;
      text-align: center;
      color: #FFFFFF;
      background-color: #ff0066;
    }
  }
</style>
