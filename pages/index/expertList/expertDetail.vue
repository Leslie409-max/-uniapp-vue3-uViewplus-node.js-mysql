<template>
	<NavBar :showBack="true"></NavBar>
	<view class="app">
		<view style="height: 30px;"></view>
		<view v-for="item in expertDetail" class="detailShow">
			<image :src="item.avatar" class="detailShow__avatar" style="width:75px;height: 75px;"></image>
			<view class="detailShow__message-1">
				<span style="font-size: 24px;font-weight: 600;">{{item.expertName}}</span>
				<span >{{item.major}}</span>
				<span style="color:aquamarine">蓝莓</span>
			</view>
			<view class="detailShow__message-2">
				<span>{{item.degree}}</span>
				<span>辽宁大学</span>
			</view>
			<view class="detailShow__message-3">
				<p style="font-weight: 500;color:#666"><span style="font-size: 18px;font-weight: 600;color:#3d6b3c">擅长：</span>{{item.speciality}}</p>
			</view>
		</view>
		
		<Title title="知识发布" @more="toknowledgelist(expertDetail[0].id)"></Title>
		<view class="knowledge" v-for="item in knowledge.slice(0, 2)" @click="toKnowledge(item.id)">
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
		</view>
		
		<Title title="所获提问" @more="toquestion(expertDetail[0].id)"></Title>
		
		<view class="item__container">
			<view class="item" @click="topostDeatil" v-for="item in questionList">
				<view class="item__title">
					{{item.content}}
				</view>
				<view class="item__content">
					<block v-if="item.answer">
						专家回答：{{item.answer}}
					</block>
					<block v-if="item.answer === null" style="display: flex;align-items: center;">
						<view><up-icon name="info-circle"></up-icon></view>
						<view>暂无回答</view>
					</block>
				</view>
				<view class="item__message">
					<view>{{getLastTimeStr(item.created_at, true)}}</view>
				</view>
			</view>
		</view>
		
		<view class="bottom">
			<view class="bottom_content" @click="showPhone = true">
				<image src="/static/电话.png" mode="widthFix" style="width:50px;"></image>
			</view>
			<view class="bottom_content">
				<image src="/static/消息.png" mode="widthFix" style="width:50px;"></image>
			</view>
			<view class="bottom_content-1">
				<button @click="addQuestion(expertDetail[0].id)">有问题就沟通</button>
			</view>
			<!-- 浮窗 -->
		</view>
		<view style="height: 100px;"></view>
	</view>
	
	<up-popup :show="showPhone">
		<view style="text-align: center;">
		    <view>
		        <text style="color:blue">{{expertDetail[0].phone}}</text>
		    </view>
		    <view>
		    	<up-copy content="{{expertDetail[0].phone}}">
		            <text>点我复制</text>
		        </up-copy>
		    </view>
	        <view><up-icon name="close-circle" @click="showPhone = fasle"></up-icon></view>
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
	.app{
		width:100vw;
		height: 100%;
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
		gap:10px;
		margin:10px;
		margin-left:20px;
	}
	.knowledge{
		margin:0 20px;
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
		width: 60px;
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
	.detailShow{
		position: relative;
		margin:0 20px;
		padding: 10px;
		background-color: white;
		border-radius: 25px;
		margin-top:50px;
		padding-top:35px;
		z-index: 0;
	}
	.detailShow__avatar{
		position: absolute;
		width:100px;
		height: 100px;
		top:-40px;
		border-radius: 50%;
		z-index: 0;
	}
	.detailShow__message-1{
		display: flex;
		gap:10px;
		align-items: center;
		padding:0 20px;
	}
	.detailShow__message-2{
		display: flex;
		gap:10px;
		align-items: center;
		padding:0 20px;
	}
	.detailShow__message-3{
		padding:0 20px;
	}
	.bottom{
		display: flex;
		align-items: center;
		gap:10px;
		width:100vw;
		position: fixed;
		bottom:0;
		background-color: #3d6b3c;
		padding:10px;
	}
	.bottom_content{
		width:55px;
		height: 55px;
		background-color: white;
		border-radius: 15px;
	}
	.bottom_content-1{
		width:90%;
		margin:0 10px;
	}

</style>
