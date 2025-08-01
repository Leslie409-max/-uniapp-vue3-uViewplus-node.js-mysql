<template>
	<view class="top">
		<view :style="{ height: state + 'px'}">
		</view>
		<view class="nav" :style="{ height: navBarHeight + 'px'}">
			<view class="flex">
			   <view v-if="props.showBack" @click="goBack">
			   	<up-icon name="arrow-left" color="#333" size="20"></up-icon>
			   </view>
			   <view v-if="props.addKnowledge" style="margin:10px;" @click="toaddledge">
			   	<view>去发布</view>
			   </view>
			</view>
			<!-- <view v-if="props.title" style="font-size: 16px;font-weight: 600; color:#666;position: absolute;left:30%;">
				{{title}}
			</view> -->
		</view>
	</view>
	
	<view class="zan" style="height: 100px;">
	</view>
</template>

<script setup>
	import { ref, defineProps } from 'vue'
	import { onBeforeMount } from 'vue'
	const props = defineProps({
	  showBack: {
	    type: Boolean,
	    default: false
	  },
	  addKnowledge: {
	    type: Boolean,
	    default: false
	  },
	  title: {
	    type: String,
	    default: '庄河蓝莓技术平台服务'
	  },
	})
	const state = ref()
	const navBarHeight = ref()
	const setNavSize = ()=>{
		const res = uni.getSystemInfoSync() //调用了一个方法，获取当前页面状态栏高度
		state.value = res.statusBarHeight
		const res2 = uni.getMenuButtonBoundingClientRect()
	  //调用了一个方法，获取当前页面胶囊高度
		navBarHeight.value = res2.height+(res2.top-res.statusBarHeight)*2
	}
	onBeforeMount(()=>{ //在页面挂载之前执行
		setNavSize()
	})
	function goBack() {
		uni.navigateBack();
	}
	const toaddledge = ()=>{
		uni.navigateTo({
			url:'/pages/mine/expert/addKnowledge'
		})
	}
</script>

<style scoped>
	.top{
		width:100vw;
		height: 100px;
		background:linear-gradient(#8BC34A, #f5f5f5);
		position: fixed;
	}
	.nav{
		display: flex;
		align-items: center;
		text-align: center;
		width: 100vw;
	}
	.flex{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100vw;
	}
</style>
