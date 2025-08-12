<template>
	<view class="app">
		<image src="/static/deepseek.jpg" mode="widthFix" style="text-align: center;margin:0 10px;width:95%;border-radius: 15px;"></image>
	    <view class="question">
			
	      <input class="input" v-model="input" placeholder="请输入你的问题..." />
	      <button class="btn" @click="sendMessage">大模型问答</button>
		  
	    </view>
		
		<view class="answer" v-if="messages">
		  <text v-for="(msg, idx) in messages" :key="idx">{{ msg }}</text>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	
	const input = ref('')
	const messages = ref('')
	
	async function sendMessage() {
	  // 1. 组装 POST 数据
	  const postData = {
	    messages: [
	      { role: "system", content: "你是AI助手" },
	      { role: "user", content: input.value }
	    ]
	  };
	  // 2. 发送 POST 请求
	  uni.request({
	    url: 'http://127.0.0.1:3006/deepseek/chat',
	    method: 'POST',
	    // header: { 'Content-Type': 'application/json' }, // 注意是 header
	    data: postData, // 注意是 data
	    success(res) {
	      console.log(res.data)
		  messages.value = res.data
	      // 3. 清空输入框
	      input.value = ''
	      // 4. 监听 SSE 流
	    //   const evtSource = new EventSource('http://127.0.0.1:3006/deepseek/chat')
	    //   evtSource.onmessage = function(event) {
	    //     if (event.data === "[DONE]") {
	    //       evtSource.close()
	    //     } else {
	    //       messages.value.push(event.data)
			  // console.log(event.data)
			  // console.log(messages.value)
	    //     }
	      // }
	    },
	    fail(err) {
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
	.question{
		margin:0 10px;
		background-color: white;
		border-radius: 25px;
		display: flex;
		margin-bottom: 15px;
	}
	.input{
		padding: 10px;
	}
	.btn{
		background-color: #4cb5d4;
		color:white;
	}
	.answer{
		margin:0 10px;
		background-color: white;
		border-radius: 25px;
		padding: 10px;
	}
</style>
