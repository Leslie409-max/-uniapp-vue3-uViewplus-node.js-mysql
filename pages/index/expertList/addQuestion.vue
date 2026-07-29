<template>
	<NavBar :showBack="true"></NavBar>
	<view class="app">
		<view class="upload-section">
		<form>
			<textarea v-model="form.content" placeholder="想问什么"></textarea>
		</form>
		<view>
			<view class="upload-title">添加图片（可选）</view>
			<up-upload
				:fileList="fileList"
				@afterRead="afterRead"
				@delete="deletePic"
				name="question"
				multiple
				:maxCount="3"
				:previewFullImage="true"
			></up-upload>
		</view>
		</view>
		<view style="width:95%;">
			<button @click="addQuestion" style="margin:10px;">提交</button>
		</view>
	</view>
</template>

<script setup>
	import NavBar from '@/component/navBar.vue'
	import {onLoad} from '@dcloudio/uni-app'
	import { ref,onMounted } from 'vue'
	import { userUserStore } from '../../../store/userStore'
	import dayjs from 'dayjs'
	
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
		picture:'', // 添加图片字段
		asker_id:userinfo.id
	})
	
	// 图片上传相关
	const fileList = ref([]);
	
	// 删除图片
	const deletePic = (event) => {
	  fileList.value.splice(event.index, 1);
	  // 更新表单中的图片字段
	  updatePictureField();
	};
	
	// 新增图片
	const afterRead = async (event) => {
	  // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
	  let lists = [].concat(event.file);
	  let fileListLen = fileList.value.length;
	  lists.map((item) => {
	    fileList.value.push({
	      ...item,
	      status: 'uploading',
	      message: '上传中',
	    });
	  });
	  for (let i = 0; i < lists.length; i++) {
	    try {
	      const result = await uploadFilePromise(lists[i].url);
	      let item = fileList.value[fileListLen];
	      fileList.value.splice(fileListLen, 1, {
	        ...item,
	        status: 'success',
	        message: '',
	        url: result,
	      });
	      fileListLen++;
	    } catch (error) {
	      // 上传失败，移除该文件
	      fileList.value.splice(fileListLen, 1);
	      console.error('图片上传失败:', error);
	    }
	  }
	  // 更新表单中的图片字段
	  updatePictureField();
	};
	
	// 更新表单中的图片字段
	const updatePictureField = () => {
	  const pictureUrls = fileList.value
	    .filter(item => item.status === 'success')
	    .map(item => item.url);
	  form.value.picture = pictureUrls.join(','); // 多个图片用逗号分隔
	};
		
	// 图片上传函数 - 使用 uni.uploadFile（更兼容uni-app）
	const uploadFilePromise = (url) => {
	  return new Promise((resolve, reject) => {
	    uni.uploadFile({
	      url: 'http://localhost:3006/upload',
	      filePath: url,
	      name: 'image',  // 字段名必须是 image
	      success: (res) => {
	        console.log('上传响应原始数据:', res);
	        try {
	          const result = JSON.parse(res.data);
	          console.log('上传结果:', JSON.stringify(result));
	          
	          // 后端返回结构: {status, message, data: {filename, url, ...}}
	          if (result.data && result.data.filename) {
	            const fullUrl = `http://localhost:3006/uploads/${result.data.filename}`;
	            console.log('返回完整URL:', fullUrl);
	            resolve(fullUrl);
	          } else if (result.data && result.data.url) {
	            // 如果后端返回了完整URL
	            const fullUrl = result.data.url.startsWith('http') 
	              ? result.data.url 
	              : `http://localhost:3006${result.data.url}`;
	            console.log('返回URL:', fullUrl);
	            resolve(fullUrl);
	          } else {
	            console.error('无法获取图片URL:', result);
	            reject(new Error('上传成功但无法获取图片URL'));
	          }
	        } catch (e) {
	          console.error('JSON解析失败:', e);
	          console.log('原始响应数据:', res.data);
	          reject(new Error('响应数据不是有效JSON'));
	        }
	      },
	      fail: (err) => {
	        console.error('上传失败:', err);
	        uni.showToast({
	          title: '图片上传失败',
	          icon: 'error'
	        });
	        reject(err);
	      }
	    });
	  });
	};
	
	const addQuestion = () =>{
		// 确保图片字段已更新
		updatePictureField();
		form.value.created_at = dayjs().format('YYYY-MM-DD HH:mm:ss')
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

<style scoped lang="scss">
	.app{
		width:100vw;
		height: 100%;
		background-color: #f5f5f5;	
	}
	
	.upload-section{
		margin:0 10px;
	    padding: 10px;
		border-radius: 12px;
		background-color: white;
		margin-bottom: 15px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		gap:10px;
	}
	
	form {
		margin-bottom: 20px;
		
		textarea {
			width: 95%;
			min-height: 120px;
			padding: 10px;
			border: 1px solid #e0e0e0;
			border-radius: 8px;
			font-size: 14px;
			line-height: 1.5;
			resize: none;
			
			&:focus {
				outline: none;
				border-color: #4caf50;
				box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
			}
		}
	}
	
	.upload-title{
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 15px;
		color: #333;
	}

	.filter-section {
		display: flex;
		padding: 15px;
		gap: 10px;
		background-color: white;
		border-radius: 12px;
		margin-bottom: 20px;
		overflow-x: auto;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		
		.filter-item {
			display: flex;
			align-items: center;
			gap: 5px;
			padding: 8px 16px;
			background-color: #f0f0f0;
			border-radius: 20px;
			font-size: 14px;
			color: #666;
			white-space: nowrap;
			cursor: pointer;
			transition: all 0.2s ease;
			
			&.active {
				background-color: #4caf50;
				color: white;
			}
			
			&:hover {
				background-color: #e0e0e0;
			}
			
			&.active:hover {
				background-color: #45a049;
			}
			
			.select-box {
				display: flex;
				align-items: center;
				gap: 5px;
			}
		}
	}
	
	button {
		width: 100%;
		padding: 14px;
		background-color: #4caf50;
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.2s ease;
		
		&:hover {
			background-color: #45a049;
		}
		
		&:active {
			background-color: #3d8b40;
		}
	}
</style>
