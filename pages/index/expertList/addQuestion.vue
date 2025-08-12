<template>
	<NavBar :showBack="true"></NavBar>
	<view class="app">
		<view class="upload-section">
		<form>
			<textarea v-model="form.content" placeholder="想问什么"></textarea>
		</form>
		<!-- 图片上传区域 -->
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
	
	// 图片上传函数
	const uploadFilePromise = (url) => {
	  return new Promise((resolve, reject) => {
	    // 临时方案：直接使用本地文件URL，不上传到服务器
	    // 如果你有后端上传接口，请取消注释下面的代码
	    /*
	    uni.uploadFile({
	      url: 'http://127.0.0.1:3006/upload', // 修改为你的后端上传接口
	      filePath: url,
	      name: 'file',
	      formData: {
	        user: 'test',
	      },
	      success: (res) => {
	        console.log('上传成功:', res);
	        try {
	          const data = JSON.parse(res.data);
	          resolve(data.data || data.url || res.data);
	        } catch (e) {
	          resolve(res.data);
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
	    */
	    
	    // 临时方案：直接返回本地文件URL
	    console.log('使用本地文件URL:', url);
	    resolve(url);
	  });
	};
	
	const addQuestion = () =>{
		// 确保图片字段已更新
		updatePictureField();
		
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
	.upload-section{
		padding: 15px;
		border-radius: 10px;
		background-color: white;
	}
	.upload-title{
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 10px;
		color: #333;
	}
</style>
