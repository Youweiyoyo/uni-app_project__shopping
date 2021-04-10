import {mapGetters} from "vuex"
export default {
  computed:{
    ...mapGetters('m_cart',['total'])
  },
  onShow(){
    this.setBadge()
  },
  methods:{
    // 设置右上角徽标
    setBadge(){
      uni.setTabBarBadge({
        index:2 , // 索引
        text:this.total + ''
      })
    }
  }
}