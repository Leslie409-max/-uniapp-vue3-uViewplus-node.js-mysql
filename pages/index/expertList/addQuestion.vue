<template>
	<NavBar :showBack="true"></NavBar>
	<view class="app">
		<form>
			<textarea v-model="form.content" placeholder="想问什么"></textarea>
		</form>
		    <button @click="addQuestion">提交</button>
	</view>
</template>

<script setup>
	import NavBar from '@/component/navBar.vue'
	import {onLoad} from '@dcloudio/uni-app'
	import { ref,onMounted } from 'vue'
	import { userUserStore } from '../../../store/userStore'
	
	const userStore = userUserStore()
	const userinfo = userStore.userInfo
	
	onLoad((option)=>{
		console.log("传过来的专家id",option.expert_id)
		form.value.expert_id = Number(option.expert_id)
		console.log('expert_id',form.value.expert_id)
	})
	
	const form = ref({
		content:'',
		expert_id:'',
		asker_id:userinfo.id
	})
	
	const addQuestion = () =>{
		uni.request({
			url:`http://127.0.0.1:3006/question/addQuestion`,
			method:'POST',
		    data: form.value,
			success(res) {
				console.log(res.data)
				//弹出成功提示，跳转回上一个页面，并刷新
				uni.showToast({
					title: '提问成功',
					duration: 2000
				});
				setTimeout(() => {
				    uni.navigateBack()
				  }, 2000);
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
		height: 100%;
		background-color: #f5f5f5;
	}
</style>
