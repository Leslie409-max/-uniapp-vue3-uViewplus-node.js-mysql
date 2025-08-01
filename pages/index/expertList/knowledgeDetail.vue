<template>
	<NavBar :showBack="true"></NavBar>
	<view class="app">
		<view class="knowledgeDetail">
			<view class="comment__user">
				<image :src="knowledgeDetail[0].avatar" style="width: 50px;height: 50px;"></image>
				<view class="comment__user-1">
				   <view class="expertName">{{knowledgeDetail[0].expertName}}</view>
				   <view style="display:flex;gap:5px;">
					    <view class="knowledgeDetail__time">{{getLastTimeStr(knowledgeDetail[0].created_at, true)}}</view>
						<block v-if="knowledgeDetail[0].type==='长文章'">
							<view class="know__title-type green">{{knowledgeDetail[0].type}}</view>
						</block>
						<block v-if="knowledgeDetail[0].type==='小知识'">
							<view class="know__title-type yellow">{{knowledgeDetail[0].type}}</view>
						</block>
				   </view>
				</view>
			</view>
			
			<view class="knowledge_titie">
			    <view class="knowledgeDetail__title">
			    	{{knowledgeDetail[0].title}}
			    </view>
			</view>
			<view class="divider"></view>
			<view class="knowledgeDetail__content">
				{{knowledgeDetail[0].content}}
			</view>
		</view>
		
		<block v-if="userStore?.role == 1">
			<view style="display: flex;gap:10px;right: 20px;position: absolute;margin:10px;">
				<image src="/static/删 除 .png" mode="widthFix" style="width:20px;" @click="delContainShow = true"></image>
				<image src="/static/编辑.png" mode="widthFix" style="width:20px;" @click="toupdate"></image>
			</view>
		</block>
		
		<view class="title">评论</view>
		<view class="comment">
			<view v-for="item in knowComment">
				<view class="comment__user">
					<image :src="item.avatar" mode="widthFix"></image>
					<view class="comment__user-1">
					   <view class="comment__user-nickname">{{item.nickname}}</view>
					   <view class="comment__user-content">{{item.content}}</view>
					   <view class="comment__user-nickname">{{getLastTimeStr(item.created_time, true)}}</view>
					</view>
				</view>
				<view class="hr"></view>
			</view>
			<EmtpyState :show='knowComment.length <= 2' title="没有更多评论啦">{{title}}</EmtpyState>
			<EmtpyState :show='knowComment.length <= 0' title="暂无评论">{{title}}</EmtpyState>
		</view>
		
		<view style="height: 25px;"></view>
		
		<block v-if="userStore?.role == 0">
			<view class="input">
				<image :src="knowComment[0].avatar" mode="widthFix" style="width: 25px;height: 25px;border-radius: 50%;"></image>
				<view class="input__input-0">
					<input class="input__input" v-model="form.content" placeholder="请输入评论..."/>
				</view>	
				<button @click="addComment" style="height: 25px;font-size: 12px;text-align: center;">发表评论</button>
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
			@cancel="delContainShow = fasle"
			>
			</up-modal>
		</view>
</template>

<script setup>
	import NavBar from '@/component/navBar.vue';
	import {onLoad} from '@dcloudio/uni-app'
	import {ref,reactive} from 'vue'
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
</script>

<style scoped lang="scss">
    .app{
		width:100vw;
		height: 100%;
		background-color: #f5f5f5;
	}
	.knowledgeDetail{
		margin:0 20px;
		padding: 10px;
		border-radius: 25px;
		background-color: white;
		color:#333;
	}
	.divider{
		height: 0.5px;
		background-color: #ddd;
		margin: 20rpx 0;
		width: 100%;
	}
	.hr{
		height: 0.5px;
		background-color: #ddd;
		margin: 20rpx 0;
		width: 100%;
	}
	.title{
		margin:20px;
		width:35px;
		border-bottom: 3px solid greenyellow;
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
	.kong{
		text-align: center;
	}
	.expertName{
		font-size:15px;
		color:#333;
		font-weight: 600;
	}
	.knowledge_titie{
		display: flex;
	}
	.know__title-type{
		width: 60px;
		text-align: center;
		font-size:12px;
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
	.green{
		background-color: #3d6b3c;
	}
    .input{
		width:100vw;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-around;
		gap:10px;
		padding:10px;
		background-color: #3d6b3c;
	}
	.input__input{
		background-color: white;
		border-radius: 25px;
	}
	.input__input-0{
		height: 25px;
		background-color: white;
	}
</style>
