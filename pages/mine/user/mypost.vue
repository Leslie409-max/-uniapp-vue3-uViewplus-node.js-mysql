<template>
	<NavBar :showBack="true" title="知识列表"></NavBar>
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
			<view class="knowledge-card" v-for="item in knowledge" @click="toKnowledge(item.id)">
				<view class="user-info">
					<view class="user-left">
						<view class="avatar">
							<image :src="item.avatar" mode="aspectFill"></image>
						</view>
						<view class="user-details">
							<view class="user-name">{{item.nickname || item.username || '用户'}}</view>
							<view class="post-meta">
								<view class="post-time">{{getLastTimeStr(item.created_at, true)}}</view>
							</view>
						</view>
					</view>
					<view class="status-tag">
						<block v-if="item.status==='pending'">
							<view class="status pending">待审核</view>
						</block>
						<block v-if="item.status==='approved'">
							<view class="status approved">已发布</view>
						</block>
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
							<up-icon name="eye" size="14"></up-icon>
							<text>{{item.views || 0}}</text>
						</view>
						<view class="stat-item">
							<up-icon name="chat" size="14"></up-icon>
							<text>{{item.comments || 0}}</text>
						</view>
						<view class="stat-item">
							<up-icon name="heart" size="14"></up-icon>
							<text>{{item.likes || 0}}</text>
						</view>
					</view>
				</view>
			</view>
			<EmtpyState :show='knowledge.length <= 4' title="没有更多内容啦">{{title}}</EmtpyState>
		</view>
		
		<view v-if="current == 1">
			<view class="knowledge-card" v-for="item in small" @click="toKnowledge(item.id)">
				<view class="user-info">
					<view class="user-left">
						<view class="avatar">
							<image :src="item.avatar || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20person%20avatar%2C%20headshot&image_size=square'" mode="aspectFill"></image>
						</view>
						<view class="user-details">
							<view class="user-name">{{item.nickname || item.username || '用户'}}</view>
							<view class="post-meta">
								<view class="post-time">{{getLastTimeStr(item.created_at, true)}}</view>
							</view>
						</view>
					</view>
					<view class="status-tag">
						<block v-if="item.status==='pending'">
							<view class="status pending">待审核</view>
						</block>
						<block v-if="item.status==='approved'">
							<view class="status approved">已发布</view>
						</block>
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
				   <block v-if="item.status==='pending'">
				   	 <view class="post-type blue">待审核</view>
				   </block>
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
							<text>{{item.views || 0}}</text>
						</view>
						<view class="stat-item">
							<up-icon name="chat" size="14"></up-icon>
							<text>{{item.comments || 0}}</text>
						</view>
						<view class="stat-item">
							<up-icon name="heart" size="14"></up-icon>
							<text>{{item.likes || 0}}</text>
						</view>
					</view>
				</view>
			</view>
			<EmtpyState :show='small.length <= 4' title="没有更多内容啦">{{title}}</EmtpyState>
		</view>
		<view v-if="current == 2">
			<view class="knowledge-card" v-for="item in long" @click="toKnowledge(item.id)">
				<view class="user-info">
					<view class="user-left">
						<view class="avatar">
							<image :src="item.avatar || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20person%20avatar%2C%20headshot&image_size=square'" mode="aspectFill"></image>
						</view>
						<view class="user-details">
							<view class="user-name">{{item.nickname || item.username || '用户'}}</view>
							<view class="post-meta">
								<view class="post-time">{{getLastTimeStr(item.created_at, true)}}</view>
							</view>
						</view>
					</view>
					<view class="status-tag">
						<block v-if="item.status==='pending'">
							<view class="status pending">待审核</view>
						</block>
						<block v-if="item.status==='approved'">
							<view class="status approved">已发布</view>
						</block>
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
				   <block v-if="item.status==='pending'">
				   	 <view class="post-type blue">待审核</view>
				   </block>
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
							<text>{{item.views || 0}}</text>
						</view>
						<view class="stat-item">
							<up-icon name="chat" size="14"></up-icon>
							<text>{{item.comments || 0}}</text>
						</view>
						<view class="stat-item">
							<up-icon name="heart" size="14"></up-icon>
							<text>{{item.likes || 0}}</text>
						</view>
					</view>
				</view>
			</view>
			<EmtpyState :show='long.length <= 4' title="没有更多内容啦">{{title}}</EmtpyState>
		</view>
	</view>
</template>

<script setup>
	import NavBar from '@/component/navBar.vue';
	import { ref,onMounted,reactive } from 'vue'
	import { userUserStore } from '../../../store/userStore';
	import {getLastTimeStr} from '@/utils/time.js'
	import EmtpyState from '../../../component/emtpyState.vue';
	import {onLoad} from '@dcloudio/uni-app'
	const userStore = userUserStore()
	const userinfo = userStore.userInfo
	console.log(userinfo.id)
	
    const list = ref([
    	{ name: '全部' },  
    	{ name: '种植心得' },  
    	{ name: '求助问答' },  
    ])
    const current = ref()
    const click = (item,index)=> {  
        console.log(item,index);
    	current.value = index
    }  
    	
	const option = ref()

	const timeformat = reactive({
	  getLastTimeStr(time, friendly){
	    return getLastTimeStr(time, friendly);
	  },
	})
	
	//获取专家发布的知识文章
	const knowledge = ref([])
	const small = ref([])
	const long = ref([])
	const getUserPost = (id) =>{
		uni.request({
			url:`http://127.0.0.1:3006/post/getUserPost/${id}`,
			success(res) {
				console.log(res)
				knowledge.value = res.data?.data
				small.value = knowledge.value.filter(item=>item.type === '种植心得')
				long.value = knowledge.value.filter(item=>item.type === '求助问答')
			},
			fail(err){
				console.log(err)
			}
		})
	}
	
	onMounted(()=>{
		current.value = 0
		if(option.value == undefined){
		    if(userinfo.id){
				getUserPost(userinfo.id)
				
		    }
		}
	})
	
	//跳转帖子详情
	const toKnowledge = (id) =>{
		uni.navigateTo({
			url:`/pages/post/postDetail?id=${id}`
		})
	}
	
</script>

<style scoped lang="scss">
	.app{
		width:100vw;
		height: 100%;
		background-color: #f5f5f5;
		padding-bottom: 20px;
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
		justify-content: space-between;
		gap: 12px;
	}
	
	.user-left{
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
	
	.status-tag{
		display: flex;
		align-items: center;
	}
	
	.status{
		font-size: 12px;
		padding: 4px 12px;
		border-radius: 12px;
		font-weight: 500;
	}
	
	.status.pending{
		background-color: #fff3e0;
		color: #f57c00;
		border: 1px solid #ffcc80;
	}
	
	.status.approved{
		background-color: #e8f5e9;
		color: #2e7d32;
		border: 1px solid #a5d6a7;
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
</style>
