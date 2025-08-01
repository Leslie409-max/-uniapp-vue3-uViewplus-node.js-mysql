<template>
	<NavBar :showBack="true"></NavBar>
	<view class="app">
		<view class="title border">
			<input v-model="form.title" placeholder="请输入标题">
		</view>
		<view class="title border">
			<textarea v-model="form.content" placeholder="请输入内容"></textarea>
		</view>
		<view class="title border">
			<input v-model="form.type" placeholder="请输入知识类型">
		</view>
		<button @click="isEditmode ? updateKnowledge():addKnowledge()">{{isEditmode ? '更新' : '发布'}}</button>
	</view>
</template>

<script setup>
	import NavBar from '@/component/navBar.vue'
	import {onLoad} from '@dcloudio/uni-app'
	import { ref,onMounted } from 'vue'
	import { userUserStore } from '../../../store/userStore'
	import { useknowledgeStore } from '../../../store/knowledge'
	import dayjs from 'dayjs'
	const isEditmode = ref(false)
	
	const userStore = userUserStore()
	const userinfo = userStore.userInfo
	const knowledgeStore = useknowledgeStore()
	
	const form = ref({
		title:'',
		content:'',
		expert_id:userinfo.expert_id,
		type:'',
		created_at:''
	})
	
	onLoad((options)=>{
		console.log(options.mode)
		if(options.mode == 'edit'){
			isEditmode.value = true
			form.value = knowledgeStore.editData[0]
			console.log(form.value)
		}
	})
		
	const addKnowledge = () =>{
		form.value.created_at = dayjs().format('YYYY-MM-DD HH:mm:ss')
		console.log('提交内容', form.value)
		uni.request({
			url:`http://127.0.0.1:3006/know/addKonwledge`,
			method:'POST',
		    data: form.value,
			success(res) {
				if(res.data.status == 0){
					console.log(res.data)
					//弹出成功提示，跳转回上一个页面，并刷新
					uni.showToast({
						title: '发布成功',
						duration: 2000
					});
					setTimeout(() => {
					    uni.navigateBack()
					  }, 2000);
				}
			},
			fail(err){
				console.log(err)
			}
		})
	}
	
	const updateKnowledge = () =>{
		uni.request({
			url:`http://127.0.0.1:3006/know/updateKonwledge`,
			method:'POST',
		    data: form.value,
			success(res) {
				console.log(res.data)
				//弹出成功提示，跳转回上一个页面，并刷新
				if(res.data.status == 0){
					uni.showToast({
						title: '修改成功',
						duration: 2000
					});
					setTimeout(() => {
					    uni.navigateBack()
					  }, 2000);
				}
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
	.border{
		margin:0  10px;
		padding: 10px;
		border-radius: 25px;
		background-color: white;
		margin-bottom: 20px;
	}
	.title{
		
	}
</style>
