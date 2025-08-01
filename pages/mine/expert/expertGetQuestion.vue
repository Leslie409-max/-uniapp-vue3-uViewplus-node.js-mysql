<template>
	<view class="app">
		<view class="item__container">
			<view class="item" @click="topostDeatil" v-for="item in questionList">
				<view class="item__title">
					{{item.content}}
				</view>
				<view class="item__content">
					<block v-if="item.answer">
						<span style="color:greenyellow">专家回答：</span>{{item.answer}}
					</block>
					<block v-if="item.answer === null" style="display: flex;align-items: center;">
						<view style="color:greenyellow" @click="answerShow[item.id] = true">去回答:</view>
					</block>
					<view v-show="answerShow[item.id]">
						<view style="display: flex;justify-content: space-between;">
							<input v-model="answer[item.id]" placeholder="输入回答"/>
							<view @click="addAnswer(item.id)">提交</view>
						</view>
					</view>
					
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
		width:100vw;
		height: 100vh;
		background-color: #f5f5f5;
	}
	.item__container{
		display: flex;
		flex-direction: column;
		gap:10px;
		margin:0 20px;
	}
	.item{
		width:98%;
		background-color: white;
		margin: 10rpx;
		display: flex;
		flex-direction: column;
		border-radius: 15rpx;
	}
	.item__title{
		font-weight: 600;
		line-height: 25px;
		margin:10px;
		margin-left:20px;
		
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 3;
	}
	.item__content{
		background-color: #f5f5f5;
		border-radius: 15rpx;
		padding: 10px;
		margin:0 10px;
		margin-left:20px;
		color:#333;
	}
	.item__message{
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap:10px;
		margin:10px;
		margin-left:20px;
	}
	.item__message-2{
		display: flex;
	    align-items: center;
		gap:10px;
		font-size:12px;
		color:#666;
	}
	       
</style>
