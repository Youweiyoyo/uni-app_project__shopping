<template>
	<view>
		<view class="goodList">
		  <view v-for="(item,index) in goodLsit" :key="index" class="block" @click="gotoDetail(item)">
        <my-goods :goods="item"></my-goods>
      </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        // 需要传递的商品列表数据
				queryObj:{
          query:'',        // 查询关键词
          cid:'' ,        // 查询商品的id
          pagenum:1,    // 页码值
          pagesize:10  // 每页显示多少条数据
        },
        goodLsit:[] , // 存total:0 放分页商品列表数据
        total:0 , // 数据条数，用来实现分页
        isShow:false // 是否正在请求数据
			};
		},
    onLoad(option){
      this.queryObj.query = option.query || '' // ||遇到假就往后走，遇到真或者走到最后就返回当前的值
      this.queryObj.cid = option.cid || ''
      this.getGoodList()   // 调用获取商品列表的数据
    },
    methods:{
      // 获取商品列表数据
      async getGoodList(cb){
        this.isShow = true  // 开始请求数据
       const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
       // 只要数据请求完毕，就立刻调用cb回调函数
        cb && cb()
       if(res.meta.status !== 200) return uni.$showMsg('获取数据失败')
       this.goodLsit = [...this.goodLsit,...res.message.goods]
       this.total = res.message.total
       this.isShow = false  // 数据请求完毕
      },
      // 触底事件
      onReachBottom(){
        // 判断数据是否还有下一页数据
        // 当前的页码值 * 每页显示多少条数据 >= 总数条数
        // pagenum * pagesize >= total
        if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕')  
        if(this.isShow) return  // 判断数据是否加载完毕，如果为true就是正在加载数据，不触发触底事件
        this.queryObj.pagenum ++
        this.getGoodList()
      },
      // 下拉刷新事件
      onPullDownRefresh(){
        this.queryObj.pagenum = 1; // 页数归 1
        this.total = 0;           // 总数据条数归 0
        this.isShow = false;     // 节流变量关闭
        this.goodLsit = []      // 清空数组
        // 重新发起请求
        this.getGoodList(()=>uni.stopPullDownRefresh())
      },
      // 跳转到商品详情页
      gotoDetail(item){
        uni.navigateTo({
          url:'../good_detail/good_detail?goods_id=' + item.goods_id
        })
      }
    }
	}
</script>

<style lang="scss">
.goodList{
  padding: 10px;
}
</style>
