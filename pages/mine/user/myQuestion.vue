<template>
	<NavBar :showBack="true" title="我的提问"></NavBar>
	<view class="app">
		<view class="question-list" v-if="questions.length > 0">
			<view class="question-card" v-for="item in questions">
				<view class="user-info">
					<view class="avatar">
						<image :src="item.avatar || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20person%20avatar%2C%20headshot&image_size=square'" mode="aspectFill"></image>
					</view>
					<view class="user-details">
					   <view class="user-name">{{item.nickname || item.username || '用户'}}</view>
					   <view class="post-meta">
						    <view class="post-time">{{getLastTimeStr(item.created_at, true)}}</view>
						    <view class="status-badge" :class="item.answer ? 'answered' : 'pending'">
							    {{item.answer ? '已回复' : '待回复'}}
						    </view>
					   </view>
					</view>
				</view>
				
				<view class="question-content">
					<view class="question-title">{{item.title}}</view>
					<view class="question-body">{{item.content}}</view>
				</view>
				
				<!-- 专家回答区域 -->
				<view v-if="item.answer" class="expert-answer">
					<view class="expert-answer-header">
						<up-icon name="star" size="12" color="#3d6b3c"></up-icon>
						<text>专家回答：</text>
					</view>
					<view class="expert-answer-content">{{item.answer}}</view>
				</view>
				
				<view class="post-footer">
					<view class="post-stats">
						<view class="stat-item">
							<up-icon name="chat" size="14"></up-icon>
							<text>{{item.answer ? '已回复' : '待回复'}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view v-else class="empty-state">
			<up-empty mode="list" text="暂无提问"></up-empty>
		</view>
	</view>
</template>

<script setup>
	import NavBar from '@/component/navBar.vue';
	import { ref, onMounted } from 'vue'
	import { userUserStore } from '../../../store/userStore';
	import { getLastTimeStr } from '@/utils/time.js'
	
	const userStore = userUserStore()
	const userinfo = userStore.userInfo
	console.log('当前用户ID:', userinfo.id)
	
	const questions = ref([])
	
	// 获取用户的所有提问
	const getUserQuestions = (askerId) => {
		uni.request({
			url: `http://127.0.0.1:3006/question/getQuestionByUser/${askerId}`,
			success(res) {
				console.log('获取用户提问成功:', res.data)
				if (res.data.status === 0) {
					questions.value = res.data.data || []
				}
			},
			fail(err) {
				console.log('获取用户提问失败:', err)
			}
		})
	}
	
	onMounted(() => {
		if (userinfo.id) {
			getUserQuestions(userinfo.id)
		}
	})
	
</script>

<style scoped lang="scss">
	.app {
		width: 100vw;
		min-height: 100vh;
		background-color: #f5f5f5;
		padding-bottom: 20px;
	}
	
	.question-list {
		padding-top: 15px;
	}
	
	.question-card {
		margin: 0 15px;
		margin-bottom: 15px;
		padding: 15px;
		background-color: white;
		border-radius: 16px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	
	.user-info {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	
	.avatar {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		overflow: hidden;
		
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.user-details {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	
	.user-name {
		font-size: 15px;
		font-weight: 600;
		color: #333;
	}
	
	.post-meta {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	
	.post-time {
		font-size: 12px;
		color: #999;
	}
	
	.status-badge {
		font-size: 11px;
		padding: 2px 8px;
		border-radius: 10px;
		color: white;
	}
	
	.status-badge.answered {
		background-color: #3d6b3c;
	}
	
	.status-badge.pending {
		background-color: #f0c040;
	}
	
	.question-content {
		margin-top: 8px;
	}
	
	.question-title {
		font-size: 16px;
		font-weight: 600;
		color: #333;
		margin-bottom: 8px;
		line-height: 1.3;
	}
	
	.question-body {
		font-size: 14px;
		color: #666;
		line-height: 1.5;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 3;
	}
	
	.expert-answer {
		background-color: #f5f5f5;
		border-radius: 10px;
		padding: 12px;
		margin-top: 10px;
	}
	
	.expert-answer-header {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
		color: #3d6b3c;
		font-weight: 600;
		margin-bottom: 6px;
	}
	
	.expert-answer-content {
		font-size: 14px;
		color: #333;
		line-height: 1.5;
	}
	
	.post-image {
		width: 100%;
		height: 160px;
		border-radius: 10px;
		overflow: hidden;
		margin-top: 10px;
		
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.post-footer {
		margin-top: 10px;
		border-top: 1px solid #f0f0f0;
		padding-top: 10px;
	}
	
	.post-stats {
		display: flex;
		align-items: center;
		gap: 20px;
	}
	
	.stat-item {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 12px;
		color: #999;
	}
	
	.empty-state {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 400px;
	}
</style>
