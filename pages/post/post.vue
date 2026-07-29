<template>
	<NavBar></NavBar>
	
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
    	            color: '#3d6b3c',
    	            fontWeight: 'bold',
    	            transform: 'scale(1.05)'
    	        }"
    	    lineColor="#3d6b3c"
	    	></up-tabs>
	    </view>
		
		<view v-if="current == 0">
	        <view class="knowledge-card" v-for="item in knowledge" @click="toknowledge(item.id)">
			<view class="user-info">
				<view class="avatar">
					<image :src="item.avatar" mode="aspectFill"></image>
				</view>
				<view class="user-details">
				   <view class="user-name">{{item.expertName}}</view>
				   <view class="post-meta">
					    <view class="post-time">{{getLastTimeStr(item.created_at, true)}}</view>
				   </view>
				</view>
			</view>
			
		    	<view class="post-header">
		    		<block v-if="item.type==='长文章'">
		    			<view class="post-type green">{{item.type}}</view>
		    		</block>
		    		<block v-if="item.type==='小知识'">
		    			<view class="post-type yellow">{{item.type}}</view>
		    		</block>
		    	   <view class="post-title">{{item.title}}</view>
		    	</view>
		    	<view class="divider"></view>
		    	<view class="post-content">{{item.content}}</view>
			<view v-if="item.picture" class="post-image">
				<image :src="item.picture" mode="aspectFill"></image>
			</view>
			<view class="post-footer">
				<view class="post-stats">
					<view class="stat-item">
						<up-icon name="chat" size="14"></up-icon>
						<text>12</text>
					</view>
					<view class="stat-item">
						<up-icon name="heart" size="14"></up-icon>
						<text>36</text>
					</view>
				</view>
			</view>
		    </view>
	        <EmtpyState :show='knowledge.length <= 4' title="没有更多内容啦">{{title}}</EmtpyState>
		</view>
		
		<view v-if="current == 1">
			<view class="empty-state">
				<up-empty mode="list" text="暂无关注内容"></up-empty>
			</view>
		</view>
		<view v-if="current == 2">
			<view class="knowledge-card" v-for="item in small" @click="toknowledge(item.id)">
			<view class="user-info">
				<view class="avatar">
					<image :src="item.avatar" mode="aspectFill"></image>
				</view>
				<view class="user-details">
				   <view class="user-name">{{item.expertName}}</view>
				   <view class="post-meta">
					    <view class="post-time">{{getLastTimeStr(item.created_at, true)}}</view>
				   </view>
				</view>
			</view>
			<view class="post-header">
				<block v-if="item.type==='长文章'">
					<view class="post-type green">{{item.type}}</view>
				</block>
				<block v-if="item.type==='小知识'">
					<view class="post-type yellow">{{item.type}}</view>
				</block>
			   <view class="post-title">{{item.title}}</view>
			</view>
			<view class="divider"></view>
			<view class="post-content">{{item.content}}</view>
			<view v-if="item.picture" class="post-image">
				<image :src="item.picture" mode="aspectFill"></image>
			</view>
			<view class="post-footer">
				<view class="post-stats">
					<view class="stat-item">
						<up-icon name="eye" size="14"></up-icon>
						<text>234</text>
					</view>
					<view class="stat-item">
						<up-icon name="chat" size="14"></up-icon>
						<text>12</text>
					</view>
					<view class="stat-item">
						<up-icon name="heart" size="14"></up-icon>
						<text>36</text>
					</view>
				</view>
			</view>
			</view>
			<EmtpyState :show='small.length <= 4' title="没有更多内容啦">{{title}}</EmtpyState>
		</view>
		<view v-if="current == 3">
			<view class="knowledge-card" v-for="item in long" @click="toknowledge(item.id)">
			<view class="user-info">
				<view class="avatar">
					<image :src="item.avatar" mode="aspectFill"></image>
				</view>
				<view class="user-details">
				   <view class="user-name">{{item.expertName}}</view>
				   <view class="post-meta">
					    <view class="post-time">{{getLastTimeStr(item.created_at, true)}}</view>
				   </view>
				</view>
			</view>
			<view class="post-header">
				<block v-if="item.type==='长文章'">
					<view class="post-type green">{{item.type}}</view>
				</block>
				<block v-if="item.type==='小知识'">
					<view class="post-type yellow">{{item.type}}</view>
				</block>
			   <view class="post-title">{{item.title}}</view>
			</view>
			<view class="divider"></view>
			<view class="post-content">{{item.content}}</view>
			<view v-if="item.picture" class="post-image">
				<image :src="item.picture" mode="aspectFill"></image>
			</view>
			<view class="post-footer">
				<view class="post-stats">
					<view class="stat-item">
						<up-icon name="eye" size="14"></up-icon>
						<text>234</text>
					</view>
					<view class="stat-item">
						<up-icon name="chat" size="14"></up-icon>
						<text>12</text>
					</view>
					<view class="stat-item">
						<up-icon name="heart" size="14"></up-icon>
						<text>36</text>
					</view>
				</view>
			</view>
			</view>
			<EmtpyState :show='long.length <= 4' title="没有更多内容啦">{{title}}</EmtpyState>
		</view>
		<view v-if="current == 4">
			<view class="knowledge-card" v-for="item in knowledge" @click="toknowledge(item.id)">
			<view class="user-info">
				<view class="avatar">
					<image :src="item.avatar" mode="aspectFill"></image>
				</view>
				<view class="user-details">
				   <view class="user-name">{{item.expertName}}</view>
				   <view class="post-meta">
					    <view class="post-time">{{getLastTimeStr(item.created_at, true)}}</view>
					    <view class="expert-badge">专家</view>
				   </view>
				</view>
			</view>
			<view class="post-header">
				<block v-if="item.type==='长文章'">
					<view class="post-type green">{{item.type}}</view>
				</block>
				<block v-if="item.type==='小知识'">
					<view class="post-type yellow">{{item.type}}</view>
				</block>
			   <view class="post-title">{{item.title}}</view>
			</view>
			<view class="divider"></view>
			<view class="post-content">{{item.content}}</view>
			<view v-if="item.picture" class="post-image">
				<image :src="item.picture" mode="aspectFill"></image>
			</view>
			<view class="post-footer">
				<view class="post-stats">
					<view class="stat-item">
						<up-icon name="eye" size="14"></up-icon>
						<text>234</text>
					</view>
					<view class="stat-item">
						<up-icon name="chat" size="14"></up-icon>
						<text>12</text>
					</view>
					<view class="stat-item">
						<up-icon name="heart" size="14"></up-icon>
						<text>36</text>
					</view>
				</view>
			</view>
			</view>
			<EmtpyState :show='knowledge.length <= 4' title="没有更多内容啦">{{title}}</EmtpyState>
		</view>
		<view v-if="current == 5">
			<view class="knowledge-card" v-for="item in userPost" @click="toUserPost(item.id)">
			<view class="user-info">
				<view class="avatar">
					<image :src="item.avatar" mode="aspectFill"></image>
				</view>
				<view class="user-details">
				   <view class="user-name">{{item.nickname || item.username}}</view>
				   <view class="post-meta">
					    <view class="post-time">{{getLastTimeStr(item.created_at, true)}}</view>
				   </view>
				</view>
			</view>
			<view class="post-header">
				<block v-if="item.type==='种植心得'">
					<view class="post-type green">{{item.type}}</view>
				</block>
				<block v-if="item.type==='求助问答'">
					<view class="post-type yellow">{{item.type}}</view>
				</block>
			   <view class="post-title">{{item.title}}</view>
			</view>
			<view class="divider"></view>
			<view class="post-content">{{item.content}}</view>
			<view v-if="item.picture" class="post-image">
				<image :src="item.picture" mode="aspectFill"></image>
			</view>
			<view class="post-footer">
				<view class="post-stats">
					<view class="stat-item">
						<up-icon name="chat" size="16"></up-icon>
						<text>{{knowComment?.length || 0}}</text>
					</view>
					<view class="stat-item" @click="addLike">
						<up-icon name="heart" size="16" :color="isLiked ? '#ff6b6b' : '#999'"></up-icon>
						<text :style="{ color: isLiked ? '#ff6b6b' : '#999' }">{{ knowledgeDetail[0]?.likes || 0 }}</text>
					</view>
				</view>
			</view>
			</view>
			<EmtpyState :show='userPost.length <= 4' title="没有更多内容啦">{{title}}</EmtpyState>
		</view>
		
	</view>
	<view class="add-post-btn" @click="toaddpost">
		<up-icon name="plus" color="white" size="25"></up-icon>
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
				// 确保数据不为undefined
				if (res.data && res.data.status === 0 && res.data.data) {
					knowledge.value = res.data.data
					small.value = knowledge.value.filter(item=>item.type === '小知识')
					long.value = knowledge.value.filter(item=>item.type === '长文章')
				} else {
					knowledge.value = []
					small.value = []
					long.value = []
				}
			},
			fail(err){
				console.log(err)
				knowledge.value = []
				small.value = []
				long.value = []
			}
		})
	}
	
	const userPost = ref([])
	const getAllPost = () =>{
		uni.request({
			url:`http://127.0.0.1:3006/post/getAllPost`,
			success(res) {
				console.log(res.data)
				if (res.data && res.data.status === 0 && res.data.data) {
					userPost.value = res.data.data
				} else {
					userPost.value = []
				}
			},
			fail(err){
				console.log(err)
				userPost.value = []
			}
		})
	}
	
	// 点赞状态
	const isLiked = ref(false);
	
	// 添加点赞
	const addLike = () => {
		const knowId = knowledgeDetail.value[0]?.id;
		if (!knowId) return;
		
		uni.request({
			url: `http://127.0.0.1:3006/post/addLike/${knowId}`,
			method: 'POST',
			success(res) {
				console.log('点赞成功:', res.data);
				if (res.data.status === 0) {
					isLiked.value = !isLiked.value;
					// 更新本地点赞数
					const currentLikes = Number(knowledgeDetail.value[0]?.likes || 0);
					knowledgeDetail.value[0].likes = isLiked.value ? currentLikes + 1 : currentLikes - 1;
					uni.showToast({
						title: isLiked.value ? '点赞成功' : '取消点赞',
						icon: 'success'
					});
				}
			},
			fail(err) {
				console.log('点赞失败:', err);
				uni.showToast({
					title: '操作失败',
					icon: 'none'
				});
			}
		});
	};
	
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
	
	const toUserPost = (id) =>{
		uni.navigateTo({
			url:`/pages/post/postDetail?id=${id}`
		})
	}
</script>

<style scoped lang="scss">
	.top{
		background:linear-gradient(#3d6b3c, #f5f5f5);
	}
	.app{
		width:100vw;
		height: 100%;
		background-color: #f5f5f5;
		position: relative;
		padding-bottom: 80px;
	}
	
	.tabs{
		background-color: white;
		padding-top: 10px;
	}
	
	.knowledge-card{
		margin: 0 15px;
		margin-top: 15px;
		padding: 15px;
		background-color: white;
		border-radius: 16px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	
	.user-info{
		display: flex;
		align-items: center;
		gap: 12px;
	}
	
	.avatar{
		width: 48px;
		height: 48px;
		border-radius: 50%;
		overflow: hidden;
		
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.user-details{
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	
	.user-name{
		font-size: 15px;
		font-weight: 600;
		color: #333;
	}
	
	.post-meta{
		display: flex;
		align-items: center;
		gap: 8px;
	}
	
	.post-time{
		font-size: 12px;
		color: #999;
	}
	
	.expert-badge{
		font-size: 10px;
		padding: 2px 8px;
		background-color: #e9f5e9;
		color: #3d6b3c;
		border-radius: 10px;
	}
	
	.post-header{
		display: flex;
		align-items: center;
		gap: 8px;
	}
	
	.post-type{
		font-size: 11px;
		padding: 3px 10px;
		border-radius: 12px;
		color: white;
	}
	
	.post-type.green{
		background-color: #3d6b3c;
	}
	
	.post-type.yellow{
		background-color: #f0c040;
	}
	
	.post-title{
		font-size: 16px;
		font-weight: 600;
		color: #333;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.divider{
		height: 1px;
		background-color: #f0f0f0;
		margin: 8px 0;
		width: 100%;
	}
	
	.post-content{
		font-size: 14px;
		color: #666;
		line-height: 1.4;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 4;
	}
	
	.post-image{
		width: 100%;
		height: 160px;
		border-radius: 10px;
		overflow: hidden;
		margin-top: 8px;
		
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.post-footer{
		margin-top: 8px;
	}
	
	.post-stats{
		display: flex;
		align-items: center;
		gap: 20px;
	}
	
	.stat-item{
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 12px;
		color: #999;
	}
	
	.empty-state{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 400px;
	}
	
	.add-post-btn{
		position: fixed;
		width: 56px;
		height: 56px;
		background-color: #3d6b3c;
		bottom: 80px;
		right: 20px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 4px 12px rgba(61, 107, 60, 0.3);
	}
</style>
