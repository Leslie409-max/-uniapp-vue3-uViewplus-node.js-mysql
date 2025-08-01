<template>
	<view class="top">
		<view :style="{ height: state + 'px'}">
		</view>
		<view class="nav" :style="{ height: navBarHeight + 'px'}">
		    <u-search placeholder="日照香炉生紫烟" margin="0 20rpx"></u-search>
		</view>
	</view>
	
	<view class="app">
	
	<view class="banner">
		<image class="banner__image" src="/static/banner.png" mode="widthFix"></image>
	</view>

	<view class="title">
		<view class="title-1">热门回答</view>
		<view class="title-2">
			<view class="title-2-text">更多</view>
			<view><up-icon name="arrow-right" color="#333" size="20"></up-icon></view>
		</view>
	</view>
	
	<view class="item__container">
	    <view class="item" @click="topostDeatil">
	    	<view class="item__title">
	    		蓝莓到季节为什么不成熟?
	    	</view>
	    	<view class="item__content">
	    		我家的蓝莓到季节为什么不成熟，我家的蓝莓到季节为什么不成熟，我家的蓝莓到季节为什么不成熟，我家的蓝莓到季节为什么不成熟，我家的蓝莓到季节为什么不成熟，
	    	</view>
	    	<view class="item__message">
	    		<view>5人回答</view>
	    		<view>2025-7-16</view>
	    	</view>
	    </view>
	    
	    <view class="item">
	    	<view class="item__title">
	    		蓝莓到季节为什么不成熟?
	    	</view>
	    	<view class="item__content">
	    		我家的蓝莓到季节为什么不成熟，我家的蓝莓到季节为什么不成熟，我家的蓝莓到季节为什么不成熟，我家的蓝莓到季节为什么不成熟，我家的蓝莓到季节为什么不成熟，
	    	</view>
	    	<view class="item__message">
	    		<view>5人回答</view>
	    		<view>2025-7-16</view>
	    	</view>
	    </view>
	</view>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	import { onBeforeMount } from 'vue'
	const state = ref()
	const navBarHeight = ref()
	const setNavSize = ()=>{
		const res = uni.getSystemInfoSync() //调用了一个方法，获取当前页面状态栏高度
		console.log(res)
		state.value = res.statusBarHeight
		
		const res2 = uni.getMenuButtonBoundingClientRect()
	  //调用了一个方法，获取当前页面胶囊高度
		console.log(res2)
		
		navBarHeight.value = res2.height+(res2.top-res.statusBarHeight)*2
	  //计算导航栏高度的方法
		console.log(navBarHeight.value,'nav')
	}
	onBeforeMount(()=>{ //在页面挂载之前执行
		setNavSize()
	})
	
	const topostDeatil = () =>{
		uni.navigateTo({
			url:'/pages/post/postDetail'
		})
	}
</script>

<style scoped lang="scss">
	.top{
		background:linear-gradient(#3d6b3c, #f5f5f5); ;
	}
	.app{
		width:100vw;
		height: 100vh;
		background-color: #f5f5f5;
	}
	.banner{
		margin:10px;
	}
	.banner__image{
		width: 100%;
		border-radius: 25px;
	}
	.title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin:20rpx;
	}
	.title-1{
		font-size: 20px;
		font-weight: 800;
		color:#333;
	}
	.title-2{
		display: flex;
	}
	.title-2-text{
		font-size: 15px;
		color:#333;
	}
	.item__container{
		display: flex;
		flex-direction: column;
		gap:10px;
	}
	.item{
		width:98%;
		// height: 300rpx;
		background-color: white;
		margin: 10rpx;
		display: flex;
		flex-direction: column;
		gap:20rpx;
		border-radius: 15rpx;
    }
	.item__title{
		font-size: 20px;
		font-weight: 800;
		line-height: 20px;
		margin:10px;
	}
	.item__content{
		background-color: #f5f5f5;
		border-radius: 15rpx;
		padding: 10px;
		margin:0 10px;
		color:#333;
	}
	.item__message{
		display: flex;
		gap:10px;
		margin:10px;
	}
</style>
