<template>
	<view class="app">
		<NavBar :showBack="true" title="收到提问"></NavBar>
		<view class="item__container">
			<view class="item" v-for="item in questionList" :key="item.id">
				<view class="item__title">
					{{item.content}}
				</view>
				<view class="post-images" v-if="item.picture && item.picture.length > 0">
					<image 
						v-for="(img, idx) in getImageList(item.picture)" 
						:key="idx" 
						:src="img" 
						class="post-image" 
						mode="aspectFill"
					></image>
				</view>
				
				<view class="item__content">
					<block v-if="item.answer">
						<span style="color:greenyellow">专家回答：</span>{{item.answer}}
					</block>
					
					<block v-else-if="userinfo.expert_id !== item.expert_id">
						暂无回答
					</block>
					<block v-else>
						<view style="color:greenyellow" @click="answerShow[item.id] = true">去回答:</view>
						<view v-show="answerShow[item.id]" style="margin-top: 10px;">
							<view style="display: flex; gap: 10px;">
								<input v-model="answer[item.id]" placeholder="输入回答"/>
								<view class="submit-btn" @click="addAnswer(item.id)">提交</view>
							</view>
						</view>
					</block>
				</view>
				<view class="item__message">
					<view>{{formatDate(item.created_at)}}</view>
					<view class="item__message-2">
						<view>{{item.nickname}}</view>
						<image :src="item.avatar" mode="widthFix" style="width:50px;border-radius: 50%;"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import NavBar from '@/component/navBar.vue';
	import {onLoad} from '@dcloudio/uni-app'
	import { ref,onMounted } from 'vue'
	import { userUserStore } from '../../../store/userStore';
	import dayjs from 'dayjs'
	
	
	// 格式化日期
	const formatDate = (dateString) => {
	  return dayjs(dateString).format('YYYY-MM-DD')
	}
	
	const getImageList = (pictureStr) => {
		if (!pictureStr) return []
		return pictureStr.split(',').filter(img => img.trim())
	}
	
	const option = ref()
	onLoad((options)=>{
		option.value = options.expert_id
		console.log('options.expert_id',options.expert_id)
		getQuestion(options.expert_id)
	})
	
	const userStore = userUserStore()
	const userinfo = userStore.userInfo
	console.log(userinfo.expert_id)
	
	//获取专家收到的问题
	const questionList = ref()
	const getQuestion = (id) =>{
		uni.request({
			url:`http://127.0.0.1:3006/question/getQuestion/${id}`,
			success(res) {
				console.log(res.data)
				questionList.value = res.data?.data
				console.log(questionList.value)
			},
			fail(err){
				console.log(err)
			}
		})
	}
	
	onMounted(()=>{
		if(option.value == undefined){
		    if(userinfo.expert_id){
		    	getQuestion(userinfo.expert_id)
		    }
		}
	})
	
	const answerShow = ref({})
	const answer = ref({});
	
	const addAnswer = (id) =>{
		uni.request({
			url:`http://127.0.0.1:3006/question/addAnswer`,
			method:'POST',
		    data: {
				answer:answer.value[id],
				id
			},
			success(res) {
				console.log(res.data)
				//弹出成功提示，跳转回上一个页面，并刷新
				answer.value = ' '
				uni.showToast({
					title: '回答成功',
					duration: 1000
				});
				answerShow[id] = false
				getQuestion(userinfo.expert_id)
				
			},
			fail(err){
				console.log(err)
			}
		})
	}
</script>

<style scoped>
	.app{
		width: 100vw;
		min-height: 100vh;
		background-color: #f5f5f5;
		padding-bottom: 20px;
	}
	
	.item__container{
		display: flex;
		flex-direction: column;
		gap: 15px;
		padding: 15px;
	}
	
	.item{
		background-color: white;
		border-radius: 16px;
		padding: 15px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
	}
	
	.item__title{
		font-size: 16px;
		font-weight: 600;
		line-height: 1.5;
		color: #333;
		margin-bottom: 12px;
		padding-left: 5px;
		
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 3;
	}
	
	.post-images {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 12px;
		padding-left: 5px;
	}
	
	.post-image {
		width: calc(33.33% - 6px);
		height: 100px;
		border-radius: 10px;
		overflow: hidden;
		
		image {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	
	.item__content{
		background-color: #f8f9fa;
		border-radius: 12px;
		padding: 12px;
		margin-bottom: 12px;
		font-size: 14px;
		color: #666;
		line-height: 1.5;
	}
	
	.item__message{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 10px;
		border-top: 1px solid #f0f0f0;
	}
	
	.item__message > view:first-child {
		font-size: 12px;
		color: #999;
	}
	
	.item__message-2{
		display: flex;
	    align-items: center;
		gap: 8px;
		font-size: 13px;
		color: #666;
	}
	
	.item__message-2 image {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		object-fit: cover;
	}
	
	/* 回答输入框样式 */
	.item__content input {
		flex: 1;
		height: 40px;
		padding: 0 12px;
		background-color: white;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		font-size: 14px;
	}
	
	.item__content .submit-btn {
		padding: 0 20px;
		height: 40px;
		line-height: 40px;
		background-color: #3d6b3c;
		color: white;
		border-radius: 8px;
		font-size: 14px;
	}
	       
</style>
