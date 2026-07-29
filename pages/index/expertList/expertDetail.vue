<template>
	<NavBar :showBack="true" title="专家详情"></NavBar>
	<view class="container">
		<!-- 专家信息卡片 -->
		<view class="expert-card">
			<view v-for="item in expertDetail" :key="item.id" class="expert-info">
				<view class="avatar-container">
					<image :src="item.avatar" class="expert-avatar" mode="aspectFill"></image>
				</view>
				
				<view class="expert-details">
					<view class="expert-name">{{item.expertName}}</view>
					<view class="expert-meta">
						<view class="expert-major">{{item.major}}</view>
						<view class="expert-tag">蓝莓</view>
					</view>
					<view class="expert-education">
						<view class="expert-degree">{{item.degree}}</view>
						<view class="expert-school">辽宁大学</view>
					</view>
					<view class="expert-speciality">
						<view class="speciality-label">擅长：</view>
						<view class="speciality-content">{{item.speciality}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 知识发布 -->
		<Title title="知识发布" @more="toknowledgelist(expertDetail[0].id)"></Title>
		<view class="knowledge-list">
			<view class="knowledge-card" v-for="item in knowledge.slice(0, 2)" :key="item.id" @click="toKnowledge(item.id)">
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
				<!-- 显示图片 -->
				<view class="post-content">{{item.content}}</view>
				<view class="post-images" v-if="item.picture && item.picture.length > 0">
					<image 
						v-for="(img, idx) in getImageList(item.picture)" 
						:key="idx" 
						:src="img" 
						class="post-image" 
						mode="aspectFill"
					></image>
				</view>
			</view>
		</view>
		
		<!-- 所获提问 -->
		<Title title="所获提问" @more="toquestion(expertDetail[0].id)"></Title>
		<view class="question-list">
			<view class="question-card" v-for="item in questionList" :key="item.id" @click="topostDeatil">
				<view class="question-content">{{item.content}}</view>
				<!-- 显示问题图片 -->
				<view class="question-images" v-if="item.picture && item.picture.length > 0">
					<image 
						v-for="(img, idx) in getImageList(item.picture)" 
						:key="idx" 
						:src="img" 
						class="question-image" 
						mode="aspectFill"
					></image>
				</view>
				<view class="answer-section">
					<block v-if="item.answer">
						<view class="answer-label">专家回答：</view>
						<view class="answer-content">{{item.answer}}</view>
					</block>
					<view v-if="item.answer === null" class="no-answer">
						<up-icon name="info-circle" size="16" color="#999"></up-icon>
						<text>暂无回答</text>
					</view>
				</view>
				<view class="question-time">{{getLastTimeStr(item.created_at, true)}}</view>
			</view>
		</view>
		
		<!-- 底部操作栏 -->
		<view class="bottom-actions">
			<view class="action-item" @click="showPhone = true">
				<image src="/static/电话.png" mode="widthFix" style="width:24px;"></image>
				<text>电话</text>
			</view>
			<view class="action-item">
				<image src="/static/消息.png" mode="widthFix" style="width:24px;"></image>
				<text>消息</text>
			</view>
			<view class="action-button">
				<button @click="addQuestion(expertDetail[0].id)">有问题就沟通</button>
			</view>
		</view>
		<view style="height: 80px;"></view>
	</view>
	
	<up-popup :show="showPhone">
		<view class="phone-popup">
		    <view class="popup-title">专家联系方式</view>
		    <view class="phone-number">{{expertDetail[0].phone}}</view>
		    <view class="copy-button">
		    	<up-copy content="{{expertDetail[0].phone}}">
		            <text>点我复制</text>
		        </up-copy>
		    </view>
	        <view class="close-button"><up-icon name="close-circle" @click="showPhone = false"></up-icon></view>
		</view>
	</up-popup>
	
</template>
<script setup>
	import NavBar from '@/component/navBar.vue';
	import Title from '@/component/title.vue'
	import {onLoad,onShow} from '@dcloudio/uni-app'
	import { ref,onMounted,reactive } from 'vue'
	import {getLastTimeStr} from '@/utils/time.js'
	
	const timeformat = reactive({
	  getLastTimeStr(time, friendly){
	      return getLastTimeStr(time, friendly);
	    },
	})
	
	const expertId = ref(null)
	onLoad((option)=>{
		console.log(option)
		// 从option中获取id参数并调用API
		if(option.id) {
			expertId.value = option.id
			getExpertTest(option.id)
			getQuestion(option.id)
			getKnowledge(option.id)
		}
	})
	
	onShow(() => {
	  // 重新获取专家详情和提问列表
	  if (expertId.value) {
	    getExpertTest(expertId.value)
	    getQuestion(expertId.value)
	  }
	})
	
	//获取专家详情信息
	const expertDetail = ref(null)
	const getExpertTest = (id) =>{
		uni.request({
			url:`http://127.0.0.1:3006/expert/getExpertDetail/${id}`,
			success(res) {
				console.log(res.data)
				expertDetail.value = res.data.data
			},
			fail(err){
				console.log(err)
			}
		})
	}
	//获取专家发布的知识文章
	const knowledge = ref()
	const getKnowledge = (id) =>{
		uni.request({
			url:`http://127.0.0.1:3006/know/getKnowledge/${id}`,
			success(res) {
				console.log(res.data)
				knowledge.value = res.data?.data
			},
			fail(err){
				console.log(err)
			}
		})
	}
	//获取专家收到的问题
	const questionList = ref()
	const getQuestion = (id) =>{
		uni.request({
			url:`http://127.0.0.1:3006/question/getQuestion/${id}`,
			success(res) {
				console.log(res.data)
				questionList.value = res.data?.data
			},
			fail(err){
				console.log(err)
			}
		})
	}
	const showPhone = ref(false)
	
	// 将图片字符串转换为数组
	const getImageList = (pictureStr) => {
		if (!pictureStr) return []
		return pictureStr.split(',').filter(img => img.trim())
	}
	
	//跳转到用户向专家提问页面
	const addQuestion = (id) =>{
		uni.navigateTo({
			url:`/pages/index/expertList/addQuestion?expert_id=${id}`
		})
	}
	//跳转专家发布的知识文章详情
	const toKnowledge = (id) =>{
		uni.navigateTo({
			url:`/pages/index/expertList/knowledgeDetail?know_id=${id}`
		})
	}
	//跳转专家发布的更多知识
	const toknowledgelist = (id) =>{
		uni.navigateTo({
			url:`/pages/mine/expert/expertKnowlege?expert_id=${id}`
		})
	}
	//跳转专家获得的更多问题
	const toquestion = (id) =>{
		uni.navigateTo({
			url:`/pages/mine/expert/expertGetQuestion?expert_id=${id}`
		})
	}
</script>

<style scoped lang="scss">
	.container {
		width: 100vw;
		min-height: 100vh;
		background-color: #f5f5f5;
		padding-bottom: 80px;
	}
	
	.expert-card {
		background-color: white;
		margin: 0 15px;
		border-radius: 16px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		padding: 20px;
		position: relative;
	}
	
	.avatar-container {
		position: absolute;
		top: -40px;
		left: 50%;
		transform: translateX(-50%);
		width: 80px;
		height: 80px;
		border-radius: 50%;
		overflow: hidden;
		border: 4px solid white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}
	
	.expert-avatar {
		width: 100%;
		height: 100%;
	}
	
	.expert-details {
		text-align: center;
		margin-top: 20px;
	}
	
	.expert-name {
		font-size: 20px;
		font-weight: 600;
		color: #333;
		margin-bottom: 8px;
	}
	
	.expert-meta {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		margin-bottom: 8px;
	}
	
	.expert-major {
		font-size: 14px;
		color: #666;
	}
	
	.expert-tag {
		font-size: 12px;
		padding: 2px 10px;
		background-color: #e9f5e9;
		color: #3d6b3c;
		border-radius: 10px;
	}
	
	.expert-education {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		margin-bottom: 12px;
	}
	
	.expert-degree {
		font-size: 14px;
		color: #666;
	}
	
	.expert-school {
		font-size: 14px;
		color: #666;
	}
	
	.expert-speciality {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		padding: 0 20px;
	}
	
	.speciality-label {
		font-size: 14px;
		font-weight: 600;
		color: #3d6b3c;
		min-width: 40px;
	}
	
	.speciality-content {
		font-size: 14px;
		color: #666;
		flex: 1;
		text-align: left;
		line-height: 1.4;
	}
	
	.knowledge-list {
		padding: 0 15px;
		margin-top: 20px;
	}
	
	.knowledge-card {
		background-color: white;
		border-radius: 12px;
		padding: 15px;
		margin-bottom: 12px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	}
	
	.post-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 10px;
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
	
	.post-title {
		font-size: 16px;
		font-weight: 600;
		color: #333;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.divider {
		height: 1px;
		background-color: #f0f0f0;
		margin: 10px 0;
		width: 100%;
	}
	
	.post-images {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 10px;
	}
	
	.post-image {
		width: calc(33.33% - 6px);
		height: 80px;
		border-radius: 8px;
		overflow: hidden;
	}
	
	.post-content {
		font-size: 14px;
		color: #666;
		line-height: 1.4;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 3;
	}
	
	.question-list {
		padding: 0 15px;
		margin-top: 20px;
	}
	
	.question-card {
		background-color: white;
		border-radius: 12px;
		padding: 15px;
		margin-bottom: 12px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	}
	
	.question-content {
		font-size: 14px;
		font-weight: 500;
		color: #333;
		line-height: 1.4;
		margin-bottom: 10px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 3;
	}
	
	.answer-section {
		margin-bottom: 10px;
	}
	
	.answer-label {
		font-size: 13px;
		font-weight: 500;
		color: #3d6b3c;
		margin-bottom: 5px;
	}
	
	.answer-content {
		font-size: 14px;
		color: #666;
		line-height: 1.4;
		background-color: #f9f9f9;
		padding: 10px;
		border-radius: 8px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 3;
	}
	
	.no-answer {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
		color: #999;
		background-color: #f9f9f9;
		padding: 10px;
		border-radius: 8px;
	}
	
	.question-images {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: 10px 0;
	}
	
	.question-image {
		width: calc(33.33% - 6px);
		height: 80px;
		border-radius: 8px;
		overflow: hidden;
	}
	
	.question-time {
		font-size: 12px;
		color: #999;
	}
	
	.bottom-actions {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		gap: 15px;
		background-color: white;
		padding: 10px 15px;
		border-top: 1px solid #f0f0f0;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
	}
	
	.action-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}
	
	.action-item text {
		font-size: 12px;
		color: #666;
	}
	
	.action-button {
		flex: 1;
	}
	
	.action-button button {
		width: 100%;
		height: 40px;
		background-color: #3d6b3c;
		color: white;
		border: none;
		border-radius: 20px;
		font-size: 14px;
		font-weight: 500;
	}
	
	.phone-popup {
		background-color: white;
		border-radius: 16px;
		padding: 20px;
		text-align: center;
		position: relative;
	}
	
	.popup-title {
		font-size: 16px;
		font-weight: 600;
		color: #333;
		margin-bottom: 15px;
	}
	
	.phone-number {
		font-size: 18px;
		font-weight: 600;
		color: #3d6b3c;
		margin-bottom: 15px;
	}
	
	.copy-button {
		margin-bottom: 20px;
	}
	
	.close-button {
		position: absolute;
		top: 10px;
		right: 10px;
	}
</style>
