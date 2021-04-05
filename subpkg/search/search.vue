<template>
  <view class="search-box">
    <!-- 使用uniUI搜素插件 -->
    <uni-search-bar placeholder="请输入关键字" :bgColor="'#FFF'" @input="input" :radius="100" :cancelButton="none">
    </uni-search-bar>
    <!-- 历史记录 -->
    <view class="history-box" v-if="srarchList.length === 0">
      <!-- 标题区 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="16" @click="cleanHistory"></uni-icons>
      </view>
      <!-- 历史区 -->
      <view class="history">
        <uni-tag :text="item" v-for="(item,index) in historyRse" :key="index" @click="gotogoodList(item)"></uni-tag>
      </view>
    </view>
    <!-- 搜索建议 -->
    <view class="seaechList" v-else>
      <view class="Listbox" v-for="(item,index) in srarchList" :key="index" @click="gotoList(item.goods_id)">
        <view class="List">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timeId: null, // 定时器id
        kw: '', // 搜索关键词
        srarchList: [] , // 搜索查询建议列表
        historyList:[], // 搜索历史假数据
      };
    },
    onLoad(){
      // 获取存储在本地的搜索历史记录保存给历史记录数组
     this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    computed:{
      historyRse(){
        return [...this.historyList].reverse()
      }
    },
    methods: {
      input(e) {
        // 1.先清除对应的定时器
        clearTimeout(this.timeId)
        // 2.创建一个新的定时器并赋值给timeId，如果500mm内没有输入事件，就为kw赋值,如果有输入事件就清除定时器重新计时
        this.timeId = setTimeout(() => {
          this.kw = e,
            this.getSrarchList()
        }, 500)
      },
      // 发起搜索查询建议列表的请求
      async getSrarchList() {
        if (this.kw === '') {
          this.srarchList = []
          return
        }
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.kw
        })
        if (res.meta.status !== 200) return uni.$showMsg('查询失败')
        this.srarchList = res.message,
        this.preservationHistory() // 请求完毕之后发起保存关键字的方法，保存历史搜索记录
      },
      // 跳转商品详情页面
      gotoList(good_id){
        uni.navigateTo({
          url:'../good_detail/good_detail?good_id=' +good_id
        })
      },
      // 保存搜索关键词的方法
      preservationHistory(){
        // this.historyList.unshift(this.kw)  // 也可以使用数组方法unshift添加元素，这样就可避免翻转数组
        // this.historyList.push(this.kw) 
        // 解决关键字重复的问题
        // 1.new Set
        const set = new Set(this.historyList)   // const 接收传进去的数组，而后可以基于这个数组使用set的方法
        // 2.先删除传进去的关键字
        set.delete(this.kw)
        // 3.在将关键字添加到数组的末尾
        set.add(this.kw)
        // 4.调用数组的方法给历史记录数组赋值
        this.historyList = Array.from(set)
        // 将数据持久化保存到本地
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      // 清除历史记录
      cleanHistory(){
        this.historyList = [],   //  清空data中的数据
        uni.setStorageSync('kw','[]') // 清空本地存储中的数据
      },
      // 点击搜索记录跳转商品列表
      gotogoodList(kw){
        uni.navigateTo({
          url:'../good_list/good_list?query='+ kw
        })
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

  .seaechList {
    padding: 0 5px;
    .Listbox {
      display: flex;
      padding: 13px 0;
      border-bottom: 1px solid #3F536E;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      .List {
        // 文字不允许换行（单行文本）
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本溢出后，使用 ... 代替
        text-overflow: ellipsis;
      }
    }
  }
  .history-box{
    display: flex;
    flex-direction: column;
    padding: 0px 10px;
    .history-title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 16px;
      border-bottom: 1px solid #007AFF;
    }
    .history{
      display: flex;
      flex-wrap: wrap;
      .uni-tag{
        margin: 10px 5px 0 0 ;
      }
    }
  }
</style>
