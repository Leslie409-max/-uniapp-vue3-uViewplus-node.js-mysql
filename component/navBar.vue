<template>
	<view class="top">
		<view :style="{ height: state + 'px'}">
		</view>
		<view class="nav" :style="{ height: navBarHeight + 'px'}">
			<view class="flex">
			   <view v-if="props.showBack" @click="goBack">
			   	  <up-icon name="arrow-left" color="#333" size="20"></up-icon>
			   </view>
			</view>
			<view v-if="props.name" class="name">蓝莓e家亲</view>
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
	  name: {
	    type: String,
	    default: false
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
		background:linear-gradient(#3d6b3c, #f5f5f5);
		position: fixed;
	}
	.nav{
		display: flex;
		align-items: center;
		text-align: center;
		width: 100vw;
	}
	.name{
		margin:10px;
		font-weight: 600;
		font-size: 20px;
		color:white;
		font-family: "Microsoft Yahei", "微软雅黑", "黑体", sans-serif;
	}
</style>
