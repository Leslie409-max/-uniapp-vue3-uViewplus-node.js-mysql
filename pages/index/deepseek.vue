<template>
	<view>
	  <input v-model="input" placeholder="请输入你的问题..." />
	  <button @click="sendMessage">大模型问答</button>
	  <view>
	    <text v-for="(msg, idx) in messages" :key="idx">{{ msg }}</text>
	  </view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	
	const input = ref('')
	const messages = ref([])
	
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

<style>
	       
</style>
