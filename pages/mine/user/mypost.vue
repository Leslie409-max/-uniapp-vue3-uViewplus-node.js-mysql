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

<style scoped>
	.app{
		width:100vw;
		height: 100%;
		background-color: #f5f5f5;
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
		width: 70px;
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
	.kong{
		text-align: center;
	}
</style>
