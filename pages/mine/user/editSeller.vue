<template>
	<view class="app">
		<NavBar :showBack="true" :title="isEdit ? '编辑卖家信息' : '新增卖家信息'"></NavBar>
		
		<scroll-view class="form-scroll" scroll-y>
			<view class="form-section">
				<view class="form-title">基本信息</view>
				
				<view class="form-item">
					<view class="form-label">卖家昵称</view>
					<input class="form-input" v-model="formData.nickname" placeholder="请输入卖家昵称" />
				</view>
				
				<view class="form-item">
					<view class="form-label">联系电话</view>
					<input class="form-input" v-model="formData.phone" placeholder="请输入联系电话" type="number" />
				</view>
				
				<view class="form-item">
					<view class="form-label">位置</view>
					<input class="form-input" v-model="formData.location" placeholder="请输入位置" />
				</view>
				
				<view class="form-item">
					<view class="form-label">头像</view>
					<view class="avatar-upload" @click="uploadAvatar">
						<image v-if="formData.avatar" :src="formData.avatar" mode="aspectFill"></image>
						<view v-else class="upload-placeholder">
							<up-icon name="plus" size="32" color="#999" />
							<text>上传头像</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="form-section">
				<view class="form-title">蓝莓品种</view>
				<view class="variety-list">
					<view class="variety-item" v-for="(item, index) in formData.varieties" :key="index">
						<view class="variety-header">
							<text class="variety-index">品种{{index + 1}}</text>
							<up-icon name="minus-circle" size="20" color="#ff6b6b" @click="removeVariety(index)" />
						</view>
						<input class="form-input small" v-model="item.name" placeholder="品种名称" />
						<input class="form-input small" v-model="item.price" placeholder="价格（元/斤）" type="digit" />
						<input class="form-input small" v-model="item.description" placeholder="品种描述" />
					</view>
				</view>
				<view class="add-btn" @click="addVariety">
					<up-icon name="plus" size="20" color="#3d6b3c" />
					<text>添加品种</text>
				</view>
			</view>
			
			<view class="form-section">
				<view class="form-title">大棚信息</view>
				
				<view class="form-item">
					<view class="form-label">大棚位置</view>
					<input class="form-input" v-model="formData.greenhouse_location" placeholder="请输入大棚位置" />
				</view>
				
				<view class="form-item">
					<view class="form-label">大棚描述</view>
					<textarea class="form-textarea" v-model="formData.greenhouse_desc" placeholder="请输入大棚描述"></textarea>
				</view>
			</view>
			
			<view class="form-section">
				<view class="form-title">蓝莓实拍图片</view>
				<view class="image-upload-grid">
					<view class="image-upload-item" v-for="(img, index) in formData.blueberry_images" :key="index">
						<image :src="img" mode="aspectFill"></image>
						<view class="image-delete" @click="removeImage('blueberry_images', index)">
							<up-icon name="close" size="16" color="white" />
						</view>
					</view>
					<view class="image-upload-add" v-if="formData.blueberry_images.length < 9" @click="uploadImage('blueberry_images')">
						<up-icon name="plus" size="24" color="#999" />
					</view>
				</view>
			</view>
			
			<view class="form-section">
				<view class="form-title">大棚环境图片</view>
				<view class="image-upload-grid">
					<view class="image-upload-item" v-for="(img, index) in formData.greenhouse_images" :key="index">
						<image :src="img" mode="aspectFill"></image>
						<view class="image-delete" @click="removeImage('greenhouse_images', index)">
							<up-icon name="close" size="16" color="white" />
						</view>
					</view>
					<view class="image-upload-add" v-if="formData.greenhouse_images.length < 9" @click="uploadImage('greenhouse_images')">
						<up-icon name="plus" size="24" color="#999" />
					</view>
				</view>
			</view>
			
			<view class="submit-area">
				<view class="btn-submit" @click="submitForm">
					{{isEdit ? '保存修改' : '提交信息'}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import NavBar from '@/component/navBar.vue'

const isEdit = ref(false)
const sellerId = ref(null)

const formData = reactive({
	nickname: '',
	phone: '',
	location: '',
	avatar: '',
	varieties: [],
	greenhouse_location: '',
	greenhouse_desc: '',
	blueberry_images: [],
	greenhouse_images: []
})

onLoad((options) => {
	if (options?.id) {
		isEdit.value = true
		sellerId.value = options.id
		loadSellerInfo(options.id)
	} else {
		formData.varieties.push({ name: '', price: '', description: '' })
	}
})

const loadSellerInfo = (id) => {
	uni.showLoading({ title: '加载中...' })
	uni.request({
		url: 'http://127.0.0.1:3006/seller/getShellErListDetail/' + id,
		method: 'GET',
		success: (res) => {
			uni.hideLoading()
			if (res.data.status === 0 && res.data.data.length > 0) {
				const data = res.data.data[0]
				formData.nickname = data.nickname || ''
				formData.phone = data.phone || ''
				formData.location = data.location || ''
				formData.avatar = data.avatar || ''
				formData.varieties = data.varieties ? JSON.parse(data.varieties) : [{ name: '', price: '', description: '' }]
				formData.greenhouse_location = data.greenhouse_location || ''
				formData.greenhouse_desc = data.greenhouse_desc || ''
				formData.blueberry_images = data.blueberry_images ? JSON.parse(data.blueberry_images) : []
				formData.greenhouse_images = data.greenhouse_images ? JSON.parse(data.greenhouse_images) : []
			}
		},
		fail: () => {
			uni.hideLoading()
			uni.showToast({ title: '加载失败', icon: 'none' })
		}
	})
}

const addVariety = () => {
	formData.varieties.push({ name: '', price: '', description: '' })
}

const removeVariety = (index) => {
	formData.varieties.splice(index, 1)
}

const uploadAvatar = () => {
	uni.chooseImage({
		count: 1,
		success: (res) => {
			// 模拟上传
			formData.avatar = res.tempFilePaths[0]
		}
	})
}

const uploadImage = (type) => {
	uni.chooseImage({
		count: 9 - formData[type].length,
		success: (res) => {
			res.tempFilePaths.forEach(img => {
				formData[type].push(img)
			})
		}
	})
}

const removeImage = (type, index) => {
	formData[type].splice(index, 1)
}

const submitForm = () => {
	if (!formData.nickname) {
		uni.showToast({ title: '请输入卖家昵称', icon: 'none' })
		return
	}
	
	const submitData = {
		...formData,
		varieties: JSON.stringify(formData.varieties),
		blueberry_images: JSON.stringify(formData.blueberry_images),
		greenhouse_images: JSON.stringify(formData.greenhouse_images)
	}
	
	if (isEdit.value) {
		submitData.id = sellerId.value
	}
	
	uni.showLoading({ title: '提交中...' })
	
	uni.request({
		url: isEdit.value ? 'http://127.0.0.1:3006/seller/update' : 'http://127.0.0.1:3006/seller/add',
		method: isEdit.value ? 'PUT' : 'POST',
		header: {
			'Content-Type': 'application/json'
		},
		data: submitData,
		success: (res) => {
			uni.hideLoading()
			if (res.data.status === 0) {
				uni.showToast({ title: isEdit.value ? '修改成功' : '添加成功', icon: 'success' })
				setTimeout(() => {
					uni.navigateBack()
				}, 1500)
			} else {
				uni.showToast({ title: res.data.message || '提交失败', icon: 'none' })
			}
		},
		fail: () => {
			uni.hideLoading()
			uni.showToast({ title: '网络错误', icon: 'none' })
		}
	})
}
</script>

<style lang="scss" scoped>
.app {
	min-height: 100vh;
	background-color: #f5f5f5;
}

.form-scroll {
	height: calc(100vh - 88rpx);
	padding: 20rpx;
}

.form-section {
	background: white;
	border-radius: 16rpx;
	padding: 24rpx;
	margin-bottom: 20rpx;
}

.form-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
	padding-left: 12rpx;
	border-left: 6rpx solid #3d6b3c;
}

.form-item {
	margin-bottom: 20rpx;
}

.form-label {
	font-size: 28rpx;
	color: #666;
	margin-bottom: 12rpx;
}

.form-input {
	width: 100%;
	height: 80rpx;
	background: #f8f8f8;
	border-radius: 8rpx;
	padding: 0 20rpx;
	font-size: 28rpx;
	box-sizing: border-box;
	
	&.small {
		margin-bottom: 12rpx;
	}
}

.form-textarea {
	width: 100%;
	height: 160rpx;
	background: #f8f8f8;
	border-radius: 8rpx;
	padding: 20rpx;
	font-size: 28rpx;
	box-sizing: border-box;
}

.avatar-upload {
	width: 160rpx;
	height: 160rpx;
	border-radius: 50%;
	background: #f8f8f8;
	border: 2rpx dashed #ddd;
	overflow: hidden;
	
	image {
		width: 100%;
		height: 100%;
	}
	
	.upload-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #999;
		font-size: 24rpx;
	}
}

.variety-list {
	margin-bottom: 16rpx;
}

.variety-item {
	background: #f8f8f8;
	border-radius: 8rpx;
	padding: 16rpx;
	margin-bottom: 12rpx;
}

.variety-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12rpx;
}

.variety-index {
	font-size: 26rpx;
	color: #3d6b3c;
	font-weight: bold;
}

.add-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 80rpx;
	border: 2rpx dashed #3d6b3c;
	border-radius: 8rpx;
	color: #3d6b3c;
	font-size: 28rpx;
	
	icon {
		margin-right: 8rpx;
	}
}

.image-upload-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 16rpx;
}

.image-upload-item {
	width: calc(33.33% - 12rpx);
	padding-bottom: calc(33.33% - 12rpx);
	position: relative;
	border-radius: 8rpx;
	overflow: hidden;
	
	image {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	
	.image-delete {
		position: absolute;
		top: 8rpx;
		right: 8rpx;
		width: 40rpx;
		height: 40rpx;
		background: rgba(0,0,0,0.6);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

.image-upload-add {
	width: calc(33.33% - 12rpx);
	padding-bottom: calc(33.33% - 12rpx);
	background: #f8f8f8;
	border: 2rpx dashed #ddd;
	border-radius: 8rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.submit-area {
	padding: 20rpx;
	padding-bottom: 40rpx;
}

.btn-submit {
	height: 88rpx;
	background: linear-gradient(135deg, #3d6b3c, #5a9b58);
	border-radius: 44rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-size: 32rpx;
	font-weight: bold;
}
</style>
