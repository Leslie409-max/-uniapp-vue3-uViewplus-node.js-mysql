<template>
	<NavBar :showBack="true">
		
	</NavBar>
	<view class="variety">
		<view class="item" @click="toVarietyDeatil()">
			<image src="/static/2.jpg" class="item-img" mode="widthFix"></image>
			<view class="title">矮丛蓝莓</view>
		</view>
		<view class="item">
			<image src="/static/2.jpg" class="item-img" mode="widthFix"></image>
			<view class="title">矮丛蓝莓</view>
		</view>
		<view class="item">
			<image src="/static/2.jpg" class="item-img" mode="widthFix"></image>
			<view class="title">矮丛蓝莓</view>
		</view>
		<view class="item">
			<image src="/static/2.jpg" class="item-img" mode="widthFix"></image>
			<view class="title">矮丛蓝莓</view>
		</view>
		<view class="item">
			<image src="/static/2.jpg" class="item-img" mode="widthFix"></image>
			<view class="title">矮丛蓝莓</view>
		</view>
	</view>
</template>

<script setup>
import { onMounted } from 'vue';
import NavBar from '@/component/navBar.vue';
	const getVariety = ()=>{
		uni.request({
		   url: 'http://127.0.0.1:3005/cate/get_cate', // 示例接口地址
		   method:"GET",
		   header:{
		   	Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind6eWxxeSIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOm51bGwsImVtYWlsIjpudWxsLCJ1c2VyX3BpYyI6IiIsImlkIjoxMSwiaWF0IjoxNzUyNjQ0MjM0LCJleHAiOjE3NTI2NjIyMzR9.ELsCtQFcGl8PICdrwkTD-1qGGl2g52_tgOJTwA9Y9z0'
		   },
		   success: function (res) {
		       console.log(res.data);
		   }
		});
	}
	onMounted(()=>{
		getVariety()
	})
	
	const toVarietyDeatil = () =>{
		uni.navigateTo({
			url:'/pages/index/VarietyDetail'
		})
	}
</script>

<style scoped lang="scss">
	.variety{
		display: flex;
		flex-wrap: wrap;
		gap:10px;
		width:auto;
		margin:0 10px;
	}
	.item{
		width:46vw; /* 或用flex: 1，或百分比宽度 */
        margin: 0 auto;
        box-sizing: border-box;
		height: 200px;
		background-color: antiquewhite;
		position: relative;
		border-radius: 15px;
		.title{
			position: absolute;
			bottom: 0px;
			background-color: #e9f5e9;
			height: 35px;
			text-align: center;
			color:#333;
			font-size: 18px;
			width: 100%;      /* 让标题宽度等于item宽度 */
            text-align: center;
            word-break: break-all;
			margin:0 auto;
		}
		.item-img {
            width: 100%;
			/* 让图片宽度始终等于item宽度 */
            display: block;
			border-radius: 15px;
        }
	}

</style>
