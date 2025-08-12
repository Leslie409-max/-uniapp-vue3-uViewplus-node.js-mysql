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
		
		<!-- 图片上传区域 -->
		<view class="title border">
			<view class="upload-title">添加图片</view>
			<up-upload
				:fileList="fileList"
				@afterRead="afterRead"
				@delete="deletePic"
				name="knowledge"
				multiple
				:maxCount="5"
				:previewFullImage="true"
			></up-upload>
		</view>
		
		<button @click="isEditmode ? updateKnowledge():open()">{{isEditmode ? '更新' : '发布'}}</button>
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
		type:'',
		picture:'', // 添加图片字段
		created_at:''
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
	
	onLoad((options)=>{
		console.log(options.mode)
		if(options.mode == 'edit'){
			isEditmode.value = true
			form.value = knowledgeStore.editData[0]
			console.log(form.value)
			
			// 如果是编辑模式，加载已有的图片
			if(form.value.picture){
				const pictureUrls = form.value.picture.split(',');
				fileList.value = pictureUrls.map(url => ({
					url: url,
					status: 'success',
					message: ''
				}));
			}
		}
	})
	
	const addPost = () =>{
		if(userinfo.expert_id == null){
			form.value.user_id = userinfo.id
		}
		form.value.created_at = dayjs().format('YYYY-MM-DD HH:mm:ss')
		console.log('提交内容', form.value)
		console.log('开始发送请求...用户发帖')
		uni.request({
			url:`http://127.0.0.1:3006/post/addPost`,
			method:'POST',
		    data: form.value,
			header: {
				'Content-Type': 'application/json'
			},
			success(res) {
				console.log('请求成功，响应数据:', res)
				if(res.data.status == 0){
					console.log('操作成功:', res.data)
					//弹出成功提示，跳转回上一个页面，并刷新
					uni.showToast({
						title: '用户发布贴子成功',
						duration: 2000
					});
					setTimeout(() => {
					    uni.navigateBack()
						addPost()
					  }, 2000);
				} else {
					console.log('操作失败:', res.data)
					uni.showToast({
						title: '发布失败',
						icon: 'error',
						duration: 2000
					});
				}
			},
			fail(err){
				console.log('请求失败:', err)
				uni.showToast({
					title: '网络请求失败',
					icon: 'error',
					duration: 2000
				});
			}
		})
	}
		
	const addKnowledge = () =>{
		if(userinfo.expert_id){
			form.value.expert_id = userinfo.expert_id
		}
		form.value.created_at = dayjs().format('YYYY-MM-DD HH:mm:ss')
		console.log('提交内容', form.value)
		// 添加请求前的日志
		console.log('开始发送请求...')
		uni.request({
			url:`http://127.0.0.1:3006/know/addKonwledge`,
			method:'POST',
		    data: form.value,
			header: {
				'Content-Type': 'application/json'
			},
			success(res) {
				console.log('请求成功，响应数据:', res)
				if(res.data.status == 0){
					console.log('操作成功:', res.data)
					//弹出成功提示，跳转回上一个页面，并刷新
					uni.showToast({
						title: '发布成功',
						duration: 2000
					});
					setTimeout(() => {
					    uni.navigateBack()
						addKnowledge()
					  }, 2000);
				} else {
					console.log('操作失败:', res.data)
					uni.showToast({
						title: '发布失败',
						icon: 'error',
						duration: 2000
					});
				}
			},
			fail(err){
				console.log('请求失败:', err)
				uni.showToast({
					title: '网络请求失败',
					icon: 'error',
					duration: 2000
				});
			}
		})
	}
	const open = ()=>{
		if(userinfo.expert_id){
			addKnowledge()
		}else{
			addPost()
		}
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
	.upload-title{
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 10px;
		color: #333;
	}
</style>
