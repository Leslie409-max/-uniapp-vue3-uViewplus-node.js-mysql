<template>
	<view class="top">
		<view :style="{ height: state + 'px'}">
		</view>
		<view class="nav" :style="{ height: navBarHeight + 'px'}">
		    <u-search placeholder="搜索..." margin="0 20rpx"></u-search>
		</view>
	</view>
	
	<view class="app">
	    <view class="tabs">
	    	<up-tabs 
	    	:list="list" 
	    	 @click="click" 
	    	lineWidth="80"
	    	itemStyle="padding-left: 15px; padding-right: 15px; width:80px; height: 34px; padding-bottom:10px;"
	    	:activeStyle="{
	    	            color: '#303133',
	    	            fontWeight: 'bold',
	    	            transform: 'scale(1.05)'
	    	        }"
	    	></up-tabs>
	    </view>
		
		<view v-if="current == 0">
		    <view class="knowledge" v-for="item in knowledge" @click="toknowledge(item.id)">
				<view class="comment__user">
					<image :src="item.avatar" style="width: 50px;height: 50px;"></image>
					<view class="comment__user-1">
					   <view class="expertName">{{item.expertName}}</view>
					   <view style="display:flex;gap:5px;">
						    <view class="knowledgeDetail__time">{{getLastTimeStr(item.created_at, true)}}</view>
					   </view>
					</view>
				</view>
				
		    	<view class="know__title">
		    		<block v-if="item.type==='长文章'">
		    			<view class="know__title-type green">{{item.type}}</view>
		    		</block>
		    		<block v-if="item.type==='小知识'">
		    			<view class="know__title-type yellow">{{item.type}}</view>
		    		</block>
		    	   <view class="know__title-title">{{item.title}}</view>
		    	</view>
		    	<view class="divider"></view>
		    	<view class="know__content">{{item.content}}</view>
				<view v-if="item.picture">
					<image :src="item.picture"></image>
				</view>
		    </view>
		    <EmtpyState :show='knowledge.length <= 4' title="没有更多内容啦">{{title}}</EmtpyState>
		</view>
		
		<view v-if="current == 1">
			
		</view>
		<view v-if="current == 2">
			<view class="knowledge" v-for="item in small" @click="toKnowledge(item.id)">
				<view class="comment__user">
					<image :src="item.avatar" style="width: 50px;height: 50px;"></image>
					<view class="comment__user-1">
					   <view class="expertName">{{item.expertName}}</view>
					   <view style="display:flex;gap:5px;">
						    <view class="knowledgeDetail__time">{{getLastTimeStr(item.created_at, true)}}</view>
					   </view>
					</view>
				</view>
				<view class="know__title">
					<block v-if="item.type==='长文章'">
						<view class="know__title-type green">{{item.type}}</view>
					</block>
					<block v-if="item.type==='小知识'">
						<view class="know__title-type yellow">{{item.type}}</view>
					</block>
				   <view class="know__title-title">{{item.title}}</view>
				</view>
				<view class="divider"></view>
				<view class="know__content">{{item.content}}</view>
			<view v-if="item.picture">
				<image :src="item.picture"></image>
			</view>
			</view>
			<EmtpyState :show='small.length <= 4' title="没有更多内容啦">{{title}}</EmtpyState>
		</view>
		<view v-if="current == 3">
			<view class="knowledge" v-for="item in long" @click="toKnowledge(item.id)">
				<view class="comment__user">
					<image :src="item.avatar" style="width: 50px;height: 50px;"></image>
					<view class="comment__user-1">
					   <view class="expertName">{{item.expertName}}</view>
					   <view style="display:flex;gap:5px;">
						    <view class="knowledgeDetail__time">{{getLastTimeStr(item.created_at, true)}}</view>
					   </view>
					</view>
				</view>
				<view class="know__title">
					<block v-if="item.type==='长文章'">
						<view class="know__title-type green">{{item.type}}</view>
					</block>
					<block v-if="item.type==='小知识'">
						<view class="know__title-type yellow">{{item.type}}</view>
					</block>
				   <view class="know__title-title">{{item.title}}</view>
				</view>
				<view class="divider"></view>
				<view class="know__content">{{item.content}}</view>
				<view v-if="item.picture">
					<image :src="item.picture"></image>
				</view>
			</view>
			<EmtpyState :show='long.length <= 4' title="没有更多内容啦">{{title}}</EmtpyState>
		</view>
		<view v-if="current == 4">
			<view class="knowledge" v-for="item in knowledge" @click="toKnowledge(item.id)">
				<view class="comment__user">
					<image :src="item.avatar" style="width: 50px;height: 50px;"></image>
					<view class="comment__user-1">
					   <view class="expertName">{{item.expertName}}</view>
					   <view style="display:flex;gap:5px;">
						    <view class="knowledgeDetail__time">{{getLastTimeStr(item.created_at, true)}}</view>
					   </view>
					</view>
				</view>
				<view class="know__title">
					<block v-if="item.type==='长文章'">
						<view class="know__title-type green">{{item.type}}</view>
					</block>
					<block v-if="item.type==='小知识'">
						<view class="know__title-type yellow">{{item.type}}</view>
					</block>
				   <view class="know__title-title">{{item.title}}</view>
				</view>
				<view class="divider"></view>
				<view class="know__content">{{item.content}}</view>
				<view v-if="item.picture">
					<image :src="item.picture"></image>
				</view>
			</view>
			<EmtpyState :show='knowledge.length <= 4' title="没有更多内容啦">{{title}}</EmtpyState>
		</view>
		<view v-if="current == 5">
			<view class="knowledge" v-for="item in userPost" @click="toKnowledge(item.id)">
				<view class="comment__user">
					<image :src="item.avatar" style="width: 50px;height: 50px;"></image>
					<view class="comment__user-1">
					   <view class="expertName">{{item.nickname || item.username}}</view>
					   <view style="display:flex;gap:5px;">
						    <view class="knowledgeDetail__time">{{getLastTimeStr(item.created_at, true)}}</view>
					   </view>
					</view>
				</view>
				<view class="know__title">
					<block v-if="item.type==='问题'">
						<view class="know__title-type green">{{item.type}}</view>
					</block>
					<block v-if="item.type==='小知识'">
						<view class="know__title-type yellow">{{item.type}}</view>
					</block>
				   <view class="know__title-title">{{item.title}}</view>
				</view>
				<view class="divider"></view>
				<view class="know__content">{{item.content}}</view>
				<view v-if="item.picture">
					<image :src="item.picture"></image>
				</view>
			</view>
			<EmtpyState :show='userPost.length <= 4' title="没有更多内容啦">{{title}}</EmtpyState>
		</view>
		
	</view>
	<view class="addpost" @click="toaddpost">
		<up-icon name="plus" color="white" size="25" style="position: absolute;right:20;top:5px;"></up-icon>
	</view>
</template>

<script setup>
	import {ref,onMounted,onBeforeMount,reactive} from 'vue'
	import {getLastTimeStr} from '@/utils/time.js'
	import EmtpyState from '@/component/emtpyState.vue'	
	const timeformat = reactive({
	  getLastTimeStr(time, friendly){
	    return getLastTimeStr(time, friendly);
	  },
	})
		
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
	
	const list = ref([
		{ name: '推荐' },  
		{ name: '关注' },  
		{ name: '小知识' },  
		{ name: '长文章' },  
		{ name: '专家发布' },
		{ name: '用户发布' },  
	])
	const current = ref()
	const click = (item,index)=> {  
	    console.log(item,index);
		current.value = index
	}  

	const knowledge = ref([])
	const small = ref([])
	const long = ref([])
	const getKnowledge = () =>{
		uni.request({
			url:`http://127.0.0.1:3006/know/getAllKnowledge`,
			success(res) {
				console.log(res.data)
				knowledge.value = res.data?.data
				small.value = knowledge.value.filter(item=>item.type === '小知识')
				long.value = knowledge.value.filter(item=>item.type === '长文章')
			},
			fail(err){
				console.log(err)
			}
		})
	}
	
	const userPost = ref()
	const getAllPost = () =>{
		uni.request({
			url:`http://127.0.0.1:3006/post/getAllPost`,
			success(res) {
				console.log(res.data)
				userPost.value = res.data?.data
			},
			fail(err){
				console.log(err)
			}
		})
	}
	
	onMounted(()=>{
		current.value = 0
		getKnowledge()
		getAllPost()
	})
	
	const toknowledge = (id) =>{
		uni.navigateTo({
			url:`/pages/index/expertList/knowledgeDetail?know_id=${id}`
		})
	}
	
	const toaddpost =()=>{
		uni.navigateTo({
			url:'/pages/mine/expert/addKnowledge'
		})
	}
</script>

<style scoped lang="scss">
	.top{
		background:linear-gradient(#3d6b3c, #f5f5f5); ;
	}
	.app{
		width:100vw;
		height: 100%;
		background-color: #f5f5f5;
		position: relative;
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
	.knowledge{
		margin:0 5px;
		padding:  10px 20px;
		background-color: white;
		border-radius: 25px;
		display: flex;
		flex-direction: column;
		margin-bottom:10px ;
	}
	.divider{
		height: 1px;
		background-color: #666;
		margin: 20rpx 0;
		width: 100%;
	}
	.know__title{
		display: flex;
	}
	.know__title-type{
		width: 70px;
		text-align: center;
		font-size:13px;
		border-radius: 25px;
		background-color: #3d6b3c;
		color:white;
	}
	.know__title-title{
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.yellow{
		background-color: #666;
	}
	.know__content{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 4;
	}
	.kong{
		text-align: center;
	}
	.comment{
		margin:0 20px;
		padding: 10px;
		border-radius: 25px;
		background-color: white;
	}
	.knowledgeDetail__time{
		font-size:12px;
		color:#666;
	}
	.comment__user{
		display: flex;
		align-items: center;
		gap:10px;
		margin:5px;
		image{
			width: 50px;
			height: 50px;
			border-radius: 50%;
		}
	}
	.comment__user-1{
		display: flex;
		flex-direction: column;
	}
	.comment__user-nickname{
		font-size:12px;
		color:#666;
	}
	.comment__user-content{
		color:#333;
	}
	.addpost{
		position:fixed;
		width:30px;
		height: 30px;
		background-color:#8BC34A;
		bottom:80px;
		right:30px;
		border-radius: 50%;
		text-align: center;
	}
</style>
