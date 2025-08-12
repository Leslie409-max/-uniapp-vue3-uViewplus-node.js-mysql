<template>
	<NavBar :showBack="true"></NavBar>
	<view>
		<View class="role">
			<view
				@click="selectRole(0)"
				class="role__item"
				:class="{ active: form.role === 0 }"
			>
				<image src="/static/农民.SVG (1).png" mode="widthFix" style="width:150px"></image>
				<view class="role__item-text">我是普通用户</view>
			</view>
			<view
				@click="selectRole(1)"
				class="role__item"
				:class="{ active: form.role === 1 }"
			>
				<image src="/static/专家 (1).png" mode="widthFix" style="width:100px" class="role__item-image"></image>
				<view class="role__item-text">我是专家</view>
			</view>
		</View>
		<view style="font-size: 16px;font-weight: 600; color:#666;text-align: center;">蓝莓e家亲</view>
		<view class="reg">
		<up-form
				labelPosition="left"
				:model="form"
				:rules="rules"
				ref="form1"
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
		
		<button @click="reg" style="background-color: #5a6198;color:white;border-radius: 25px;">注册</button>
		</view>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	import NavBar from '@/component/navBar.vue'
	
	const form = ref({
		username:'',
		password:'',
		role:'',
	})
	
	const rules = {
		'username': {
			type: 'string',
			required: true,
			message: '请填写用户名',
			trigger: ['blur', 'change']
		},
		'password': {
			type: 'string',
			required: true,
			message: '请填写密码',
			trigger: ['blur','change']
		},
		'role': {
			type: 'number',
			required: true,
			message: '请确认身份',
			trigger: ['blur','change']
		}
	}
	
	
	const selectRole = (val) => {
		form.value.role = val
	}
	
	const reg = () =>{
		uni.request({
			url:`http://127.0.0.1:3006/api/reg`,
			method:'POST',
		    data: form.value,
			success(res) {
				console.log(res.data)
				uni.showToast({
						title: '注册成功',
						duration: 2000
					});
				setTimeout(() => {
				    uni.navigateTo({
				    	url:'/pages/login/login'
				    })
				  }, 1000);
				},
			fail(err){
				console.log(err)
			}
		})
	}
	
</script>

<style scoped lang="scss">
	.role{
		display: flex;
		justify-content: center;
		align-items: center;
		gap:10px;
		text-align: center;
		margin:10px;
	}
	.role__item{
		position: relative;
		width: 150px;
		height: 175px;
		border-radius: 25px;
		background-color: white;
		text-align: center;
		transition: background 0.2s;
	}
	.role__item.active {
	  background-color: #5a6198; /* 你想要的高亮色 */
	  .role__item-text{
		  color:white;
	  }
	}
	.role__item-text{
		font-size: 12px;
		position: absolute;
		left:25%;
		bottom: 0;
		color: #666;
	}
	.role__item-image{
		position:absolute;
		top:30px;
		left:10px;
	}
	.reg{
		margin:10px;
	}
	
	       
</style>
