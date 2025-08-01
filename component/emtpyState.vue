<template>
	<block v-if="show">
		<view class="empty">
			<image :src="img" mode="widthFix"></image>
			<view style="color:#999">{{title}}</view>
		</view>
	</block>
</template>

<script setup>
	const props = defineProps({
		show:{type:Boolean,default:false},
		img:{type:String,default:'/static/空状态.png'},
		title:{type:String,default:'没有更多内容啦'}
	})
</script>

<style scoped>
	.empty{
		text-align: center;
	}
</style>
