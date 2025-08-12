<template>
	<NavBar></NavBar>
	<!-- <view style="width: 100px;height: 20px;background-color:#2E5A88"></view>
	<view style="width: 100px;height: 20px;background-color:#8BC34A"></view>
	<view style="width: 100px;height: 20px;background-color:#FAF9F6"></view>
	<view style="width: 100px;height: 20px;background-color:#FF6B35"></view> -->
	<view class="app">
	<view class="userinfo border">
		<block v-if="userStore.token">
			<image :src="userinfo.avatar" style="width:50px;height: 50px;border-radius: 50%;"></image>
			<block v-if="userinfo.nickname">
				<view>{{userinfo.nickname}}</view>
			</block>
			<block v-else>
				<view>{{userinfo.username}}</view>
			</block>
		</block>
		<block v-if="!userStore.token">
			<image src="/static/未登录-copy.png" mode="widthFix" style="width:50px;"></image>
			<view @click="tologin">去登录</view>
		</block>
		<view><up-icon name="arrow-right" @click="toUserinfo"></up-icon></view>
	</view>
	
	<block v-if="userStore?.role == 1">
		<view class="banner border">
		    <view class="banner__item" @click="toContain">
		    	<image src="/static/认证.png" mode="widthFix" style="width: 50px;"></image>
		    	<view>专家认证</view>
		    </view>
		    <view class="banner__item" @click="toQuestion">
		    	<image src="/static/收件.png" mode="widthFix" style="width: 50px;"></image>
		    	<view>收到提问</view>
		    </view>
		    <view class="banner__item" @click="toKnowledge">
		    	<image src="/static/文章管理.png" mode="widthFix" style="width: 50px;"></image>
		    	<view>发布管理</view>
		    </view>
		</view>
	</block>
	
	<block v-if="userStore?.role == 0">
		<view class="banner border">
		    <view class="banner__item" @click="tomypost">
		    	<image src="/static/我的贴子.png" mode="widthFix" style="width: 50px;"></image>
		    	<view>我的贴子</view>
		    </view>
		    <view class="banner__item" @click="tomyQuestion">
		    	<image src="/static/提问.png" mode="widthFix" style="width: 50px;"></image>
		    	<view>我的提问</view>
		    </view>
		    <view class="banner__item" @click="toKnowledge">
		    	<image src="/static/文章管理.png" mode="widthFix" style="width: 50px;"></image>
		    	<view>发布管理</view>
		    </view>
		</view>
	</block>
	
	<button @click="removeToken">退出登录</button>
	</view>
</template>

<script setup>
	import NavBar from '@/component/navBar.vue'
	import { userUserStore } from '../../store/userStore'
	const userStore = userUserStore()
		
	const userinfo = userStore.userInfo || {}
	
	const role = uni.getStorageSync('role') 
	
	const tologin = (id) =>{
		uni.navigateTo({
			url:'/pages/login/login'
		})
	}
	const toUserinfo = ()=>{
		uni.navigateTo({
			url:'/pages/mine/userinfo'
		})
	}
	const toContain = () =>{
		uni.navigateTo({
			url:'/pages/mine/expert/expertContain'
		})
	}
	const toQuestion = () =>{
		uni.navigateTo({
			url:'/pages/mine/expert/expertGetQuestion'
		})
	}
	const toKnowledge = () =>{
		uni.navigateTo({
			url:'/pages/mine/expert/expertKnowlege'
		})
	}
	const removeToken = userStore.removeToken()
</script>

<style scoped>
	.app{
		width:100vw;
		height: 100%;
		background-color: #f5f5f5;
	}
	.border{
		margin:0  10px;
		padding: 10px;
		border-radius: 25px;
		background-color: white;
		margin-bottom: 20px;
	}
	.userinfo{
		display: flex;
		gap:10px;
		align-items: center;
	}
	.banner{
		display: flex;
		align-items: center;
		justify-content: space-around
	}
	.banner__item{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	

</style>
