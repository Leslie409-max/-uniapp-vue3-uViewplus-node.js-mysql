<template>
	<NavBar></NavBar>
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
		<view class="arrow-icon" @click="toUserinfo">›</view>
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
			<view class="banner__item" @click="toMyOrder">
				<image src="/static/订单 (2).png" mode="widthFix" style="width: 50px;"></image>
				<view>我的订单</view>
			</view>
			<view class="banner__item" @click="toAddress">
				<image src="/static/位置.png" mode="widthFix" style="width: 50px;"></image>
				<view>地址管理</view>
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
		    <view class="banner__item" @click="toInfo">
		    	<image src="/static/文章管理.png" mode="widthFix" style="width: 50px;"></image>
		    	<view>发布管理</view>
		    </view>
			<view class="banner__item" @click="toMyOrder">
				<image src="/static/订单 (2).png" mode="widthFix" style="width: 50px;"></image>
				<view>我的订单</view>
			</view>
			<view class="banner__item" @click="toAddress">
				<image src="/static/位置.png" mode="widthFix" style="width: 50px;"></image>
				<view>地址管理</view>
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
	const toInfo = () =>{
		uni.navigateTo({
			url:'/pages/mine/user/myInfo'
		})
	}
	const toKnowledge = () =>{
		uni.navigateTo({
			url:'/pages/mine/expert/expertKnowlege'
		})
	}
	const tomypost = () =>{
		uni.navigateTo({
			url:'/pages/mine/user/mypost'
		})
	}
	const tomyQuestion = () =>{
		uni.navigateTo({
			url:'/pages/mine/user/myQuestion'
		})
	}
	const toMyOrder = () =>{
		uni.navigateTo({
			url:'/pages/mine/user/myOrder'
		})
	}
	const toAddress = () =>{
		uni.navigateTo({
			url:'/pages/mine/user/addressList'
		})
	}
	
	// 退出登录
	const removeToken = () => {
		userStore.removeToken()
		uni.navigateTo({
			url: '/pages/login/login'
		})
	}
</script>

<style scoped lang="scss">
	.app{
		width:100vw;
		height: 100%;
		background-color: #f5f5f5;
	}

	.border{
		margin:0 10px;
		margin-bottom: 10px;
		padding: 20px;
		border-radius: 12px;
		background-color: white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.userinfo{
		display: flex;
		gap: 15px;
		align-items: center;

		image {
			width: 60px;
			height: 60px;
			border-radius: 50%;
			object-fit: cover;
			border: 2px solid #f0f0f0;
		}

		view {
			font-size: 16px;
			font-weight: 600;
			color: #333;
		}

		& > view:last-child {
			margin-left: auto;
			color: #999;
		}
	}

	.arrow-icon {
		font-size: 24px;
		color: #999;
		font-weight: bold;
		margin-left: auto;
	}

	.banner{
		display: flex;
		align-items: center;
		justify-content: start;
		padding: 10px 0;
		flex-wrap: wrap;
	}

	.banner__item{
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 15px;
		border-radius: 8px;
		transition: all 0.2s ease;
		cursor: pointer;

		&:hover {
			background-color: #f9f9f9;
			transform: translateY(-2px);
		}

		image {
			width: 50px;
			height: 50px;
			object-fit: contain;
		}

		view {
			font-size: 14px;
			color: #666;
			font-weight: 500;
		}
	}

	button {
		width: 100%;
		padding: 14px;
		background-color: #f44336;
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.2s ease;

		&:hover {
			background-color: #d32f2f;
		}

		&:active {
			background-color: #b71c1c;
		}
	}
</style>