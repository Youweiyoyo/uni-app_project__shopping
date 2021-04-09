<template>
	<view>
		<view class="goodList">
		  <block v-for="(item,index) in goodLsit" :key="index" class="block">
        <my-goods :goods="item"></my-goods>
      </block>
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
          pagenum:'',    // 页码值
          pagesize:''  // 每页显示多少条数据
        },
        goodLsit:[] , // 存total:0 放分页商品列表数据
        total:0 , // 数据条数，用来实现分页
			};
		},
    onLoad(option){
      this.queryObj.query = option.query || '' // ||遇到假就往后走，遇到真或者走到最后就返回当前的值
      this.queryObj.cid = option.cid || ''
      this.getGoodList()   // 调用获取商品列表的数据
    },
    methods:{
      async getGoodList(){
       const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
       console.log(res)
       if(res.meta.status !== 200) return uni.$showMsg('获取数据失败')
       this.goodLsit = res.message.goods
       this.total = res.message.total
      }
    }
	}
</script>

<style lang="scss">
.goodList{
  padding: 10px;
}
</style>
