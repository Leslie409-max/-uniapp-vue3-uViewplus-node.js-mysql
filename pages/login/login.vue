<template>
	<NavBar :showBack="true"></NavBar>
	<view class="app">
		<view style="text-align: center;">
			<image src="/static/蓝莓.png" mode="widthFix" style="width: 150px;margin:0 auto;"></image>
			<view style="font-size: 16px;font-weight: 600; color:#666;">蓝莓e家亲</view>
			</view>
		<view style="margin:10px;">
		<up-form
	    		labelPosition="left"
	    		:model="form"
	    		:rules="rules"
	    		ref="form1"
				labelAlign="left"
	    >
	    	<up-form-item
	    			label="用户名:"
	    			prop="username"
	    			:borderBottom="true"
	    			ref="item1"
					label-width="75"
	    	>
	    		<up-input
	    				v-model="form.username"
	    				border="none"
						placeholder="请输入用户名"
	    		></up-input>
	    	</up-form-item>
	    	<up-form-item
	    			label="密码:"
	    			prop="password"
	    			:borderBottom="true"
	    			ref="item1"
					label-width="75"
	    	>
	    		<up-input
	    				v-model="form.password"
	    				border="none"
						placeholder="请输入密码"
	    		></up-input>
	    	</up-form-item>
		</up-form>
		
		<button @click="login" style="background-color: #5a6198;color:white;border-radius: 25px;">登录</button>
		<view @click="toreg">
			还未登录，<span style="color:blue;">去注册</span></view>
		</view>
		
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	import { userUserStore } from '../../store/userStore'
	import NavBar from '@/component/navBar.vue'
	
	const userStore = userUserStore()
	
	
	const rules ={
		'username': {
			type: 'string',
					required: true,
					message: '请填写用户名',
					trigger: ['blur', 'change']
		},
		'password': {
			type: 'password',
					required: true,
					message: '请填写4位验证码',
					trigger: ['blur','change']
		},
		}
	
	const form = ref({
		username:'',
		password:'',
		role:'',
	})
	
	const login = () =>{
		uni.request({
			url:`http://127.0.0.1:3006/api/login`,
			method:'POST',
		    data: form.value,
			success(res) {
				console.log(res.data)
				if(res.data.status == 0 ){
				userStore.setUserInfo(res.data?.userinfo)
				userStore.setToken(res.data?.token)
				userStore.setRole(res.data?.role)
				uni.showToast({
					title: '登录成功',
					duration: 2000
				});
				setTimeout(() => {
				    uni.switchTab({
				    	url:'/pages/index/index'
				    })
				  }, 1000);
				}
			},
			fail(err){
				console.log(err)
			}
		})
	}
	
	const toreg = (id) =>{
		uni.navigateTo({
			url:'/pages/login/reg'
		})
	}
</script>

<style scoped>
	.app{
		width:100vw;
		height: 100vh;
		background-color: #f5f5f5;
	}
	       
</style>
