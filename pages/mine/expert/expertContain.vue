<template>
	<view style="margin:10px;">
		<up-form
	    		labelPosition="left"
	    		:model="expertForm"
	    		:rules="rules"
	    		ref="form1"
				labelAlign="left"
	    >
		    <up-form-item
		    		label="头像:"
		    		prop="avatar"
		    		:borderBottom="true"
		    		ref="item1"
		    		label-width="75"
		    >
				<up-upload
						:fileList="fileList1"
						@afterRead="afterRead"
						@delete="deletePic"
						name="1"
						multiple
						:maxCount="10"
						:previewFullImage="true"
					></up-upload>
		    </up-form-item>
			
	    	<up-form-item
	    			label="姓名:"
	    			prop="expertName"
	    			:borderBottom="true"
	    			ref="item1"
					label-width="75"
	    	>
	    		<up-input
	    				v-model="expertForm.expertName"
	    				border="none"
						placeholder="请输入您的姓名"
	    		></up-input>
	    	</up-form-item>
			
	    	<up-form-item
	    			label="性别:"
	    			prop="sex"
	    			:borderBottom="true"
	    			ref="item1"
					label-width="75"
	    	>
	    		<up-input
	    				v-model="expertForm.sex"
	    				border="none"
						placeholder="选择"
	    		></up-input>
				<template #right>
					<up-icon @close="showSex = true"
						name="arrow-right"
					></up-icon>
				</template>
	    	</up-form-item>
			<up-action-sheet
					:show="showSex"
					:actions="actions"
					title="请选择性别"
					@close="showSex = false"
					@select="sexSelect"
			>
			</up-action-sheet>
			
			<up-form-item
					label="毕业院校"
					prop="college"
					:borderBottom="true"
					ref="item1"
					label-width="75"
			>
				<up-input
						v-model="expertForm.college"
						border="none"
						placeholder="请输入您毕业的院校"
				></up-input>
			</up-form-item>
			
			<up-form-item
					label="学历"
					prop="degree"
					:borderBottom="true"
					ref="item1"
					label-width="75"
			>
				<up-input
						v-model="expertForm.degree"
						border="none"
						placeholder="选择"
				></up-input>
			</up-form-item>
			
			<up-form-item
					label="专业"
					prop="major"
					:borderBottom="true"
					ref="item1"
					label-width="75"
			>
				<up-input
						v-model="expertForm.major"
						border="none"
						placeholder="请输入您的专业"
				></up-input>
			</up-form-item>
			
			<up-form-item
					label="专攻方向"
					prop="speciality"
					:borderBottom="true"
					ref="item1"
					label-width="75"
			>
				<up-input
						v-model="expertForm.speciality"
						border="none"
						placeholder="请输入您的专长"
				></up-input>
			</up-form-item>
			
			<up-form-item
					label="手机号"
					prop="phone"
					:borderBottom="true"
					ref="item1"
					label-width="75"
			>
				<up-input
						v-model="expertForm.phone"
						border="none"
						placeholder="请输入您的手机号"
				></up-input>
			</up-form-item>
		</up-form>
		
		<button @click="addExpert">确定认证</button>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	const expertForm = ref({
		avatar:'',
		expertName:'',
		sex:'',
		college:'',
		degree:'',
		major:'',
		speciality:'',
		phone:''
	})
	const showSex = ref(false)
	const actions = ref(
	[
	  { name: '男' },  
	  { name: '女' },  
	  { name: '保密' },  
	]
	)
	const fileList1 = ref([]);
	// 删除图片
	const deletePic = (event) => {
	  fileList1.value.splice(event.index, 1);
	};
	
	// 新增图片
	const afterRead = async (event) => {
	  // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
	  let lists = [].concat(event.file);
	  let fileListLen = fileList1.value.length;
	  lists.map((item) => {
	    fileList1.value.push({
	      ...item,
	      status: 'uploading',
	      message: '上传中',
	    });
	  });
	  for (let i = 0; i < lists.length; i++) {
	    try {
	      const result = await uploadFilePromise(lists[i].url);
	      let item = fileList1.value[fileListLen];
	      fileList1.value.splice(fileListLen, 1, {
	        ...item,
	        status: 'success',
	        message: '',
	        url: result,
	      });
	      // 将上传成功的图片URL保存到表单
	      expertForm.value.avatar = result;
	      fileListLen++;
	    } catch (error) {
	      // 上传失败，移除该文件
	      fileList1.value.splice(fileListLen, 1);
	      console.error('图片上传失败:', error);
	    }
	  }
	};
	
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
	
	const addExpert = () =>{
		uni.request({
			url:`http://127.0.0.1:3006/expert/addExpert`,
			method:'POST',
		    data: expertForm.value,
			success(res) {
				console.log(res.data)
				//弹出成功提示，跳转回上一个页面，并刷新
				uni.showToast({
					title: '认证成功，正在跳转首页...',
					duration: 2000
				});
				setTimeout(() => {
				    uni.switchTab({
				    	url:'/pages/index/index'
				    })
				  }, 1000);
			},
			fail(err){
				console.log(err)
			}
		})
	}
		
</script>

<style>
	       
</style>
