<template>
	<NavBar :showBack="true">
		
	</NavBar>
	<view class="app">
		<view class="item">
			<view class="content">
		        <view class="img"><image src="/static/2.jpg" class="item-img" mode="widthFix"></image></view>
				<view class="title">矮丛草莓</view>
		        <view class="order">矮丛蓝莓与一般蓝莓品种不同，矮丛蓝莓植株高度为30~50 cm，具有较强的抗旱和抗寒能力，可在-40℃的严寒地区生长。</view>
		        <view class="bottom">
		        	<view class="bottom_content-1"><span class="span_title">特点：</span>相较于其他蓝莓类型，矮丛蓝莓富含更多抗氧化物质，因此广泛应用于生产加工方面。</view>
		        	<view class="bottom_content-2"><span class="span_title">育种情况：</span>矮丛蓝莓主要的育种国家是美国和加拿大，主要从狭叶越桔中筛选出优良的野生杂交种。少量矮丛蓝莓品种通过种间杂交获得北方越桔（V.boreale）、绒叶越桔（V.myrtilloides）、伞房花越桔（V. corymbosum）和康斯越桔（V.constablaei）的基因。</view>
		        </view>
		   </view>
		</view>
	</view>
</template>

<script setup>
import NavBar from '@/component/navBar.vue';
	
</script>

<style scoped>
	.app{
		width:100vw;
		height: 100vh;
		background-color: #e9f5e9;
	}
	.item{
		margin:0 10px;
		height: 100vh;
		background-color: white;
	}
	.content{
		margin:0 10px;
		padding-top: 10px;
	}
	.title{
		color:#2c5e91;
		font-weight: 800;
		font-size: 20px;
	}
	.img{
		width: 100%;
		background-color: #e9f5e9;
	}
	.order{
		margin:10rpx;
		font-size: 15px;
		line-height: 45rpx;
	}
	.bottom{
		background-color:#f0f7fd ;
		padding: 20rpx;
		border-left: 5px solid #2c5e91;
		display: flex;
		flex-direction: column;
		gap:20rpx;
	}
	.bottom_content-1{
		
	}
	.span_title{
		font-weight: 800;
		line-height: 45rpx;
	}

</style>
