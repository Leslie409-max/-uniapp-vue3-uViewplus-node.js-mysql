<template>
	<NavBar :showBack="true">
	</NavBar>
	
	<view class="app">
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
		
		<view class="comment">
			输入框
			发送键
		</view>
		
		<view>
			<!-- <block v-if="Comment.lenght<=0">
				
			</block> -->
			<up-empty
			    mode="list"
			    ></up-empty>
			评论的状态
			头像：评论
		</view>
	</view>
</template>

<script setup>
	import NavBar from '../../component/navBar.vue';
</script>

<style scoped>
	.app{
		width:100vw;
		height: 100vh;
		background-color: #f5f5f5;
	}
	/* .item{
		width:98%;
		// height: 300rpx;
		background-color: white;
		margin: 10rpx;
		display: flex;
		flex-direction: column;
		gap:20rpx;
		border-radius: 15rpx;
	} */
	.item__title{
		font-size: 20px;
		font-weight: 800;
		line-height: 20px;
		padding:10px;
	}
	.item__content{
		background-color: #f5f5f5;
		border-radius: 15rpx;
		margin:0 10px;
		color:#333;
	}
	.item__message{
		display: flex;
		gap:10px;
		margin:10px;
	}
	.comment{
		width: 100%;
		height: 50px;
		background-color: antiquewhite;
	}
	       
</style>
