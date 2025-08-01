<template>
	<view class="title">
		<view class="title-1">{{title}}</view>
		<view class="title-2">
			<view class="title-2-text"  @click="emit('more')">更多</view>
			<view><up-icon name="arrow-right" color="#333" size="20"></up-icon></view>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps({
	  title: {
	    type: String,
	    default: '标题'
	  }
	})
	const emit = defineEmits(['more'])
</script>

<style scoped>
	.title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin:20rpx;
		margin-left:30px;
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
</style>