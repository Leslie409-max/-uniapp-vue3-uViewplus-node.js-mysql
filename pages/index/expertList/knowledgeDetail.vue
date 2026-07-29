<template>
	<NavBar :showBack="true" title="知识详情"></NavBar>
	<view class="container">
		<!-- 知识文章内容 -->
		<view class="post-card">
			<view class="user-info">
				<view class="avatar" @click="toexpertDetail(knowledgeDetail[0].expert_id)">
					<image :src="knowledgeDetail[0].avatar" mode="aspectFill"></image>
				</view>
				<view class="user-details">
				   <view class="user-name">{{knowledgeDetail[0].expertName}}</view>
				   <view class="post-meta">
					    <view class="post-time">{{getLastTimeStr(knowledgeDetail[0].created_at, true)}}</view>
						<block v-if="knowledgeDetail[0].type==='长文章'">
							<view class="post-type green">{{knowledgeDetail[0].type}}</view>
						</block>
						<block v-if="knowledgeDetail[0].type==='小知识'">
							<view class="post-type yellow">{{knowledgeDetail[0].type}}</view>
						</block>
				   </view>
				</view>
			</view>
			
			<view class="post-content">
				<view class="post-title">{{knowledgeDetail[0].title}}</view>
				<view class="divider"></view>
				<view class="post-body">{{knowledgeDetail[0].content}}</view>
				
				<!-- 图片展示区域 -->
				<view v-if="knowledgeDetail[0].picture" class="post-image">
					<image :src="knowledgeDetail[0].picture" mode="aspectFill"></image>
				</view>
			</view>
			
			<view class="post-footer">
				<view class="post-actions">
					<view class="action-item">
						<up-icon name="chat" size="16"></up-icon>
						<text>{{knowComment?.length || 0}}</text>
					</view>
					<view class="action-item" @click="addLike">
						<up-icon name="heart" size="16" :color="isLiked ? '#ff6b6b' : '#999'"></up-icon>
						<text :style="{ color: isLiked ? '#ff6b6b' : '#999' }">{{ knowledgeDetail[0]?.likes || 0 }}</text>
					</view>
				</view>
			</view>
			
			<!-- 编辑和删除按钮 -->
			<block v-if="userStore?.role == 1 && userStore?.userInfo?.expert_id == knowledgeDetail[0]?.expert_id">
				<view class="edit-actions">
					<image src="/static/删 除 .png" mode="widthFix" style="width:20px;" @click="delContainShow = true"></image>
					<image src="/static/编辑.png" mode="widthFix" style="width:20px;" @click="toupdate"></image>
				</view>
			</block>
		</view>
		
		<!-- 评论区 -->
		<view class="comments-section">
			<view class="section-title">
				<text>全部评论 ({{knowComment?.length || 0}})</text>
			</view>
			
			<!-- 评论列表 -->
			<view class="comment-item" v-for="item in knowComment" :key="item.id">
				<!-- approved: 公开显示 -->
				<block v-if="item.status === 'approved'">
				<view class="comment-user">
					<view class="avatar">
						<image :src="item.avatar" mode="aspectFill"></image>
					</view>
					
						<view class="comment-user-info">
							<view class="comment-user-name">{{item.nickname}}</view>
							<view class="comment-content">{{item.content}}</view>
							<view class="comment-time">{{getLastTimeStr(item.created_time, true)}}</view>
						</view>
				</view>
				</block>
				<!-- pending: 仅登录用户可见，待审核样式 -->
				<block v-if="item.status === 'pending' && item.user_id === userStore.userInfo.id">
				<view class="comment-user pending">
					<view class="avatar">
						<image :src="item.avatar" mode="aspectFill"></image>
					</view>
					<view class="comment-user-info">
						<view class="comment-header">
							<view class="comment-user-name">{{item.nickname}}</view>
							<view class="pending-tag">待审核</view>
						</view>
						<view class="comment-content">{{item.content}}</view>
						<view class="comment-time">{{getLastTimeStr(item.created_time, true)}}</view>
					</view>
				</view>
				</block>
			</view>
			
			<EmtpyState :show='knowComment.length > 0 && knowComment.length <= 2' title="没有更多评论啦">{{title}}</EmtpyState>
		</view>
		
		<!-- 评论输入框 -->
		<block v-if="userStore?.role == 0">
			<view class="comment-input-section">
				<view class="comment-input">
					<view class="avatar">
						<image :src="knowComment[0]?.avatar || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%2C%20headshot&image_size=square'" mode="aspectFill"></image>
					</view>
					<input class="input-field" v-model="form.content" placeholder="请输入评论..."/>
					<button class="send-btn" @click="addComment">发表</button>
				</view>
			</view>
		</block>
	</view>
	
	<view>
		<up-modal 
		:show="delContainShow" 
		title="确认删除吗" 
		content='如果你删除了该文章，文章以下的所有评论也将被删除'
		showConfirmButton="true"
		showCancelButton="true"
		@confirm="delKnowledge(knowledgeDetail[0].id)"
		@cancel="delContainShow = false"
		>
		</up-modal>
	</view>
</template>

<script setup>
	import NavBar from '@/component/navBar.vue';
	import {onLoad} from '@dcloudio/uni-app'
	import {ref,reactive, computed} from 'vue'
	import { userUserStore } from '../../../store/userStore';
	import { useknowledgeStore } from '../../../store/knowledge';
	import {getLastTimeStr} from '@/utils/time.js'
	import EmtpyState from '../../../component/emtpyState.vue';
	import dayjs from 'dayjs'
	const userStore = userUserStore()
	const knowledge = useknowledgeStore()
	
	  const timeformat = reactive({
	    getLastTimeStr(time, friendly){
	      return getLastTimeStr(time, friendly);
	    },
	  })
	
	onLoad((option)=>{
		console.log(option)
		form.value.k_id = option.know_id
		getKnowledgeDetail(option.know_id)
		getknowComment(option.know_id)
	})
	
	const knowledgeDetail = ref()
	const getKnowledgeDetail = (id) =>{
		uni.request({
			url:`http://127.0.0.1:3006/know/getKnowledgeDetail/${id}`,
			success(res) {
				console.log(res.data)
				knowledgeDetail.value = res.data?.data
			},
			fail(err){
				console.log(err)
			}
		})
	}
	
	const knowComment = ref()
	const getknowComment = (id) =>{
		uni.request({
			url:`http://127.0.0.1:3006/know/getKnowComment/${id}`,
			success(res) {
				console.log(res.data)
				knowComment.value = res.data?.data
			},
			fail(err){
				console.log(err)
			}
		})
	}
	
	const form = ref({
		content:" ",
		k_id:" ",
		user_id:1,
		created_time:''
	})
	
	const addComment = () =>{
		form.value.created_time = dayjs().format('YYYY-MM-DD HH:mm:ss')
		form.value.status = 'pending'
		uni.request({
			url:`http://127.0.0.1:3006/know/addKnowComment`,
			method:'POST',
		    data: form.value,
			success(res) {
				console.log(res.data)
				getknowComment(form.value.k_id)
				form.value.content = " "
			},
			fail(err){
				console.log(err)
			}
		})
	}
	
	const delContainShow = ref(false)
	const delKnowledge = (id)=>{
		uni.request({
			url:`http://127.0.0.1:3006/know/delKnowledge/${id}`,
			method:"DELETE",
			success(res) {
				console.log(res.data)
				uni.showToast({
					title:'删除成功'
				})
				delContainShow.value = false
				uni.navigateTo({
					url:'/pages/mine/expert/expertKnowlege'
				})
			},
			fail(err){
				console.log(err)
			}
		})
	}
	
	const updateKnowledge = () =>{
		uni.request({
			url:`http://127.0.0.1:3006/know/updateKnowledge`,
			method:'POST',
		    data: 0,
			success(res) {
				console.log(res.data)
			},
			fail(err){
				console.log(err)
			}
		})
	}
	
	const toupdate = ()=>{
		knowledge.setEdit(knowledgeDetail.value)
		uni.navigateTo({
			url:`/pages/mine/expert/addKnowledge?mode=edit`
		})
	}
	
	const toexpertDetail = (id) =>{
		uni.navigateTo({
			url:`/pages/index/expertList/expertDetail?id=${id}`
		})
	}
	

	const pictureList = computed(() => {
		return knowledgeDetail.value && knowledgeDetail.value[0] && knowledgeDetail.value[0].picture
			? knowledgeDetail.value[0].picture.split(',').filter(Boolean)
			: [];
	});

	function previewImage(idx) {
		// 预览大图，支持多图切换
		uni.previewImage({
			urls: pictureList.value,
			current: pictureList.value[idx]
		});
	}
	
	// 点赞状态
const isLiked = ref(false);

// 添加点赞
const addLike = () => {
	const knowId = knowledgeDetail.value[0]?.id;
	if (!knowId) return;
	
	uni.request({
		url: `http://127.0.0.1:3006/know/addLike/${knowId}`,
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
	
	.divider {
		height: 1px;
		background-color: #f0f0f0;
		margin: 15px 0;
		width: 100%;
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
	
	.post-actions {
		display: flex;
		align-items: center;
		gap: 24px;
	}
	
	.action-item {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 14px;
		color: #999;
	}
	
	.edit-actions {
		position: absolute;
		top: 15px;
		right: 15px;
		display: flex;
		gap: 10px;
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
		align-items: flex-start;
		gap: 10px;
	}
	
	.comment-user.pending {
		background-color: #fff8e1;
		padding: 10px;
		border-radius: 8px;
		border: 1px dashed #ffc107;
	}
	
	.comment-header {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	
	.pending-tag {
		font-size: 11px;
		padding: 2px 8px;
		background-color: #ffc107;
		color: #fff;
		border-radius: 10px;
		font-weight: 500;
	}
	
	.comment-user-info {
		display: flex;
		flex-direction: column;
		gap: 6px;
		flex: 1;
	}
	
	.comment-user-name {
		font-size: 14px;
		font-weight: 500;
		color: #333;
	}
	
	.comment-content {
		font-size: 14px;
		color: #666;
		line-height: 1.4;
	}
	
	.comment-time {
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
