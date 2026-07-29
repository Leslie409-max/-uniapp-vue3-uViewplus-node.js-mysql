<template>
	<NavBar :showBack="true" :addKnowledge="true" title="知识列表"></NavBar>
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
			<view class="knowledge" v-for="item in knowledge" @click="toKnowledge(item.id)">
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
				<view class="post-images" v-if="item.picture && item.picture.length > 0">
					<image 
						v-for="(img, idx) in getImageList(item.picture)" 
						:key="idx" 
						:src="img" 
						class="post-image" 
						mode="aspectFill"
					></image>
				</view>
				<image v-if="item.status==='pending'" src="/static/待审核.png" class="pending-badge"></image>
			</view>
			
			<EmtpyState :show='knowledge.length <= 4' title="没有更多内容啦">{{title}}</EmtpyState>
		</view>
		
		<view v-if="current == 1">
			<view class="knowledge" v-for="item in small" @click="toKnowledge(item.id)">
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
				<image v-if="item.status==='pending'" src="/static/待审核.png" class="pending-badge"></image>
			</view>
			
			<EmtpyState :show='knowledge.length <= 4' title="没有更多内容啦">{{title}}</EmtpyState>
		</view>
		<view v-if="current == 2">
			<view class="knowledge" v-for="item in long" @click="toKnowledge(item.id)">
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
				<image v-if="item.status==='pending'" src="/static/待审核.png" class="pending-badge"></image>
			</view>
			<EmtpyState :show='knowledge.length <= 4' title="没有更多内容啦">{{title}}</EmtpyState>
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
	console.log(userinfo.expert_id)
	
    const list = ref([
    	{ name: '全部' },  
    	{ name: '小知识' },  
    	{ name: '长文章' },  
    ])
    const current = ref()
    const click = (item,index)=> {  
        console.log(item,index);
    	current.value = index
    }  
    	
	const option = ref()
	onLoad((options)=>{
		option.value = options.expert_id
		console.log('options.expert_id',option.value)
		getKnowledge(option.value)
	})
	
	const timeformat = reactive({
	  getLastTimeStr(time, friendly){
	    return getLastTimeStr(time, friendly);
	  },
	})
	
	const getImageList = (pictureStr) => {
		if (!pictureStr) return []
		return pictureStr.split(',').filter(img => img.trim())
	}
	
	//获取专家发布的知识文章
	const knowledge = ref([])
	const small = ref([])
	const long = ref([])
	const getKnowledge = (id) =>{
		uni.request({
			url:`http://127.0.0.1:3006/know/getKnowledge/${id}`,
			success(res) {
				console.log(res.data)
				knowledge.value = res.data?.data
				small.value = knowledge.value.filter(item=>item.type === '小知识')
				long.value = knowledge.value.filter(item=>item.type === '长文章')
			},
			fail(err){
				console.log(err)
			}
		})
	}
	
	onMounted(()=>{
		current.value = 0
		if(option.value == undefined){
		    if(userinfo.expert_id){
		    	getKnowledge(userinfo.expert_id)
		    }
		}
	})
	
	//跳转专家发布的知识文章详情
	const toKnowledge = (id) =>{
		uni.navigateTo({
			url:`/pages/index/expertList/knowledgeDetail?know_id=${id}`
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
	
	.tabs {
		background-color: white;
		margin-bottom: 15px;
		padding-top: 10px;
	}
	
	.knowledge{
		margin: 0 15px;
		padding: 15px;
		background-color: white;
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		margin-bottom: 15px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s ease, box-shadow 0.2s ease;
		position: relative;
		
		&:hover {
			transform: translateY(-2px);
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		}
	}
	
	.pending-badge{
		position: absolute;
		top: 10px;
		right: 10px;
		width: 60px;
		height: 60px;
	}
	
	.divider{
		height: 1px;
		background-color: #f0f0f0;
		margin: 12px 0;
		width: 100%;
	}
	
	.know__title{
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 5px;
	}
	
	.know__title-type{
		padding: 4px 12px;
		text-align: center;
		font-size: 12px;
		border-radius: 16px;
		color: white;
		font-weight: 500;
	}
	
	.know__title-type.green {
		background-color: #4caf50;
	}
	
	.know__title-type.yellow {
		background-color: #ff9800;
	}
	
	.know__title-title{
		font-weight: 600;
		font-size: 16px;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		flex: 1;
	}
	
	.know__content{
		font-size: 14px;
		color: #666;
		line-height: 1.5;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 3;
	}
	
	.kong{
		text-align: center;
		padding: 40px 0;
		color: #999;
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
</style>
