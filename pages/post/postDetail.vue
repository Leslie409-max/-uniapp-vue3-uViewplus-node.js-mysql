<template>
	<NavBar :showBack="true" :title="postDetail[0]?.title || '帖子详情'"></NavBar>
	
	<view class="container">
		<!-- 帖子内容 -->
		<view class="post-card">
			<view class="user-info">
				<view class="avatar">
					<image :src="postDetail[0]?.avatar || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20person%20avatar%2C%20headshot%2C%20friendly%20face&image_size=square'" mode="aspectFill"></image>
				</view>
				<view class="user-details">
				   <view class="user-name">{{ postDetail[0]?.nickname || '用户' }}</view>
				   <view class="post-meta">
					    <view class="post-time">{{ getLastTimeStr(postDetail[0]?.created_at, true) }}</view>
					    <block v-if="postDetail[0]?.type === '种植心得'">
							<view class="post-type green">{{ postDetail[0]?.type }}</view>
						</block>
						<block v-if="postDetail[0]?.type === '求助问答'">
							<view class="post-type yellow">{{ postDetail[0]?.type }}</view>
						</block>
						<block v-if="postDetail[0]?.post_type === '0'">
							<view class="post-type blue">问题贴</view>
						</block>
						<block v-if="postDetail[0]?.post_type === '1'">
							<view class="post-type orange">宣传贴</view>
						</block>
				   </view>
				</view>
			</view>
			
			<view class="post-content">
				<view class="post-title">{{ postDetail[0]?.title || '暂无标题' }}</view>
				<view class="post-body">
					{{ postDetail[0]?.content || '暂无内容' }}
				</view>
				
				<!-- 图片展示区域 -->
				<view v-if="postDetail[0]?.picture" class="post-image">
					<image :src="postDetail[0]?.picture" mode="aspectFill"></image>
				</view>
			</view>
			
			<view class="post-footer">
				<view class="post-stats">
					<view class="stat-item">
						<up-icon name="eye" size="16"></up-icon>
						<text>{{ postDetail[0]?.views || 0 }}</text>
					</view>
					<view class="stat-item">
						<up-icon name="chat" size="16"></up-icon>
						<text>{{ postComments?.length || 0 }}</text>
					</view>
					<view class="stat-item" @click="addLike">
						<up-icon name="heart" size="16" :color="isLiked ? '#ff6b6b' : '#999'"></up-icon>
						<text :style="{ color: isLiked ? '#ff6b6b' : '#999' }">{{ postDetail[0]?.likes || 0 }}</text>
					</view>
					<view class="stat-item">
						<up-icon name="star" size="16"></up-icon>
						<text>{{ postDetail[0]?.collect || 0 }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 评论区 -->
		<view class="comments-section">
			<view class="section-title">
				<text>全部评论 ({{ postComments?.length || 0 }})</text>
			</view>
			
			<!-- 评论列表 -->
			<view class="comment-item" v-for="item in postComments" :key="item.id">
				<view class="comment-user">
					<view class="avatar">
						<image :src="item.avatar || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%2C%20headshot%2C%20friendly%20face&image_size=square'" mode="aspectFill"></image>
					</view>
					<view class="comment-user-info">
						<view class="comment-user-name">{{ item.nickname || '用户' }}</view>
						<view class="comment-time">{{ getLastTimeStr(item.created_time, true) }}</view>
					</view>
				</view>
				<view class="comment-content">
					{{ item.content || '' }}
				</view>
				<view class="comment-actions">
					<view class="comment-action">
						<up-icon name="heart" size="14"></up-icon>
						<text>{{ item.likes || 0 }}</text>
					</view>
					<view class="comment-action">
						<up-icon name="chat" size="14"></up-icon>
						<text>回复</text>
					</view>
				</view>
			</view>
			
			<!-- 空状态 -->
			<view v-if="postComments.length <= 0" class="empty-state">
				<text>暂无评论</text>
			</view>
		</view>
		
		<!-- 评论输入框 -->
		<view class="comment-input-section">
			<view class="comment-input">
				<view class="avatar">
					<image :src="postComments[0]?.avatar || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%2C%20headshot&image_size=square'" mode="aspectFill"></image>
				</view>
				<input class="input-field" v-model="form.content" placeholder="写下你的评论..."/>
				<button class="send-btn" @click="addComment">发表</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import NavBar from '../../component/navBar.vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { ref } from 'vue';
	import { getLastTimeStr } from '@/utils/time.js';
	import dayjs from 'dayjs';
	
	// 帖子详情
	const postDetail = ref([]);
	// 评论列表
	const postComments = ref([]);
	// 评论表单
	const form = ref({
		content: '',
		post_id: '',
		user_id: 1,
		created_time: ''
	});
	
	// 点赞状态
	const isLiked = ref(false);
	
	onLoad((option) => {
		console.log('页面加载，选项:', option);
		if (option.id) {
			form.value.post_id = option.id;
			getPostDetail(option.id);
			getPostComments(option.id);
		}
	});
	
	// 获取帖子详情
	const getPostDetail = (id) => {
		uni.request({
			url: `http://127.0.0.1:3006/post/getPostDetail/${id}`,
			success(res) {
				console.log('获取帖子详情成功:', res.data);
				postDetail.value = res.data?.data || [];
			},
			fail(err) {
				console.log('获取帖子详情失败:', err);
			}
		});
	};
	
	// 获取帖子评论
	const getPostComments = (id) => {
		uni.request({
			url: `http://127.0.0.1:3006/post/getPostComments/${id}`,
			success(res) {
				console.log('获取帖子评论成功:', res.data);
				postComments.value = res.data?.data || [];
			},
			fail(err) {
				console.log('获取帖子评论失败:', err);
			}
		});
	};
	
	// 添加点赞
	const addLike = () => {
		const postId = postDetail.value[0]?.id;
		if (!postId) return;
		
		uni.request({
			url: `http://127.0.0.1:3006/post/addLike/${postId}`,
			method: 'POST',
			success(res) {
				console.log('点赞成功:', res.data);
				if (res.data.status === 0) {
					isLiked.value = !isLiked.value;
					// 更新本地点赞数
					const currentLikes = Number(postDetail.value[0]?.likes || 0);
					postDetail.value[0].likes = isLiked.value ? currentLikes + 1 : currentLikes - 1;
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
	
	// 添加评论
	const addComment = () => {
		if (!form.value.content.trim()) {
			uni.showToast({
				title: '请输入评论内容',
				icon: 'none'
			});
			return;
		}
		
		form.value.created_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
		
		uni.request({
			url: 'http://127.0.0.1:3006/post/addPostComment',
			method: 'POST',
			data: form.value,
			success(res) {
				console.log('添加评论成功:', res.data);
				getPostComments(form.value.post_id);
				form.value.content = '';
				uni.showToast({
					title: '评论成功',
					icon: 'success'
				});
			},
			fail(err) {
				console.log('添加评论失败:', err);
				uni.showToast({
					title: '评论失败',
					icon: 'none'
				});
			}
		});
	};
</script>

<style scoped lang="scss">
	.container {
		width: 100vw;
		min-height: 100vh;
		background-color: #f5f5f5;
		padding-bottom: 80px;
	}
	
	.post-card {
		background-color: white;
		padding: 15px;
		margin-bottom: 10px;
	}
	
	.user-info {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 15px;
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
	
	.expert-badge {
		font-size: 10px;
		padding: 2px 8px;
		background-color: #e9f5e9;
		color: #3d6b3c;
		border-radius: 10px;
	}
	
	.post-content {
		margin-bottom: 20px;
	}
	
	.post-title {
		font-size: 18px;
		font-weight: 600;
		color: #333;
		margin-bottom: 12px;
		line-height: 1.3;
	}
	
	.post-body {
		font-size: 14px;
		color: #666;
		line-height: 1.5;
	}
	
	.post-image {
		width: 100%;
		height: 200px;
		border-radius: 10px;
		overflow: hidden;
		margin-top: 15px;
		
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.post-footer {
		border-top: 1px solid #f0f0f0;
		padding-top: 12px;
	}
	
	.post-type {
		font-size: 11px;
		padding: 3px 10px;
		border-radius: 12px;
		color: white;
	}
	
	.post-type.green {
		background-color: #3d6b3c;
	}
	
	.post-type.yellow {
		background-color: #f0c040;
	}

	.post-type.blue {
		background-color: #3498db;
	}

	.post-type.orange {
		background-color: #e67e22;
	}
	
	.post-stats {
		display: flex;
		align-items: center;
		gap: 24px;
	}
	
	.stat-item {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 14px;
		color: #999;
	}
	
	.comments-section {
		background-color: white;
		padding: 15px;
	}
	
	.section-title {
		font-size: 16px;
		font-weight: 600;
		color: #333;
		margin-bottom: 15px;
	}
	
	.comment-item {
		margin-bottom: 20px;
		padding-bottom: 15px;
		border-bottom: 1px solid #f0f0f0;
	}
	
	.comment-item:last-child {
		border-bottom: none;
		margin-bottom: 0;
		padding-bottom: 0;
	}
	
	.comment-user {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 10px;
	}
	
	.comment-user-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	
	.comment-user-name {
		font-size: 14px;
		font-weight: 500;
		color: #333;
	}
	
	.comment-time {
		font-size: 12px;
		color: #999;
	}
	
	.comment-content {
		font-size: 14px;
		color: #666;
		line-height: 1.4;
		margin-bottom: 10px;
		padding-left: 58px;
	}
	
	.comment-actions {
		display: flex;
		align-items: center;
		gap: 20px;
		padding-left: 58px;
	}
	
	.comment-action {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 12px;
		color: #999;
	}
	
	.comment-input-section {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: white;
		padding: 10px 15px;
		border-top: 1px solid #f0f0f0;
	}
	
	.comment-input {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	
	.comment-input .avatar {
		width: 36px;
		height: 36px;
	}
	
	.input-field {
		flex: 1;
		padding: 10px 15px;
		background-color: #f5f5f5;
		border-radius: 20px;
		font-size: 14px;
	}
	
	.send-btn {
		padding: 8px 16px;
		background-color: #3d6b3c;
		color: white;
		border-radius: 15px;
		font-size: 14px;
		border: none;
	}
</style>
