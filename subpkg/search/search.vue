<template>
	<view class="search-box">
    <!-- 使用uniUI搜素插件 -->
		<uni-search-bar placeholder="请输入关键字" :bgColor="'#FFF'" @input="input" :radius="100" :cancelButton="none" ></uni-search-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timeId:null , // 定时器id
        kw:'' , // 搜索关键词
        srarchList:[] // 搜索查询建议列表
			};
		},
    methods:{
      input(e){
        // 1.先清除对应的定时器
       clearTimeout(this.timeId)
       // 2.创建一个新的定时器并赋值给timeId，如果500mm内没有输入事件，就为kw赋值,如果有输入事件就清除定时器重新计时
       this.timeId = setTimeout(()=>{
         this.kw = e,
         this.getSrarchList()
       },500)
      },
      // 发起搜索查询建议列表的请求
     async getSrarchList(){
        if(this.kw === ''){
          this.srarchList = []
          return
        }
       const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
       if(res.meta.status !== 200) return uni.$showMsg('查询失败')
       this.srarchList = res.message
      }
    }
	}
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
