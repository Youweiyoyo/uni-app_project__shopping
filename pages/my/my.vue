<template>
	<view>
		<!-- 用户登录时显示的组件 -->
    <my-login v-if="!token"></my-login>
    <!-- 用户未登录时显示的组件 -->
    <my-user-info></my-user-info>
	</view>
</template>

<script>
  import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
    computed:{
      ...mapState('m_user',['token'])
    }
	}
</script>

<style lang="scss">

</style>
