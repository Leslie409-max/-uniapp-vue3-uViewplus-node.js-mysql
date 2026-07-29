<template>
	<view class="app">
		<NavBar :showBack="true" :title="isEdit ? '编辑地址' : '新增地址'"></NavBar>
		
		<view class="form">
			<view class="form-item">
				<view class="form-label">联系人姓名</view>
				<input class="form-input" v-model="formData.contact_name" placeholder="请输入联系人姓名" />
			</view>
			
			<view class="form-item">
				<view class="form-label">联系电话</view>
				<input class="form-input" v-model="formData.contact_phone" placeholder="请输入联系电话" type="number" />
			</view>
			
			<view class="form-item">
				<view class="form-label">所在地区</view>
				<view class="region-row">
					<input class="region-input" v-model="formData.province" placeholder="省" />
					<input class="region-input" v-model="formData.city" placeholder="市" />
					<input class="region-input" v-model="formData.district" placeholder="区/县" />
				</view>
			</view>
			
			<view class="form-item">
				<view class="form-label">详细地址</view>
				<textarea class="form-textarea" v-model="formData.detail_address" placeholder="请输入详细地址（街道、门牌号等）" />
			</view>
			
			<view class="form-item switch-item">
				<view class="form-label">设为默认地址</view>
				<switch :checked="formData.is_default === 1" @change="onSwitchChange" color="#3d6b3c" />
			</view>
			
			<view class="btn-submit" @click="submitForm">
				{{isEdit ? '保存修改' : '保存地址'}}
			</view>
		</view>
		
		<up-toast ref="toastRef"></up-toast>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import NavBar from '@/component/navBar.vue'

const isEdit = ref(false)
const addressId = ref(null)
const toastRef = ref(null)

const formData = reactive({
	contact_name: '',
	contact_phone: '',
	province: '',
	city: '',
	district: '',
	detail_address: '',
	is_default: 0
})

onLoad((options) => {
	if (options?.id) {
		isEdit.value = true
		addressId.value = options.id
		loadAddressDetail(options.id)
	}
})

const loadAddressDetail = (id) => {
	uni.showLoading({ title: '加载中...' })
	uni.request({
		url: `http://127.0.0.1:3006/address/detail/${id}`,
		method: 'GET',
		success: (res) => {
			uni.hideLoading()
			if (res.data.status === 0 && res.data.data) {
				const data = res.data.data
				formData.contact_name = data.contact_name || ''
				formData.contact_phone = data.contact_phone || ''
				formData.province = data.province || ''
				formData.city = data.city || ''
				formData.district = data.district || ''
				formData.detail_address = data.detail_address || ''
				formData.is_default = data.is_default || 0
			}
		},
		fail: () => {
			uni.hideLoading()
		}
	})
}

const onSwitchChange = (e) => {
	formData.is_default = e.detail.value ? 1 : 0
}

const submitForm = () => {
	if (!formData.contact_name) {
		uni.showToast({ title: '请输入联系人姓名', icon: 'none' })
		return
	}
	if (!formData.contact_phone) {
		uni.showToast({ title: '请输入联系电话', icon: 'none' })
		return
	}
	if (!formData.province || !formData.city || !formData.district) {
		uni.showToast({ title: '请填写完整的省市区', icon: 'none' })
		return
	}
	if (!formData.detail_address) {
		uni.showToast({ title: '请输入详细地址', icon: 'none' })
		return
	}
	
	const userinfo = uni.getStorageSync('userinfo') || {}
	const submitData = {
		...formData,
		user_id: userinfo.id || 1
	}
	
	if (isEdit.value) {
		submitData.id = addressId.value
	}
	
	uni.showLoading({ title: '保存中...' })
	uni.request({
		url: isEdit.value ? 'http://127.0.0.1:3006/address/update' : 'http://127.0.0.1:3006/address/add',
		method: isEdit.value ? 'PUT' : 'POST',
		data: submitData,
		success: (res) => {
			uni.hideLoading()
			if (res.data.status === 0) {
				uni.showToast({ title: '保存成功', icon: 'success' })
				setTimeout(() => {
					uni.navigateBack()
				}, 1500)
			} else {
				uni.showToast({ title: res.data.message || '保存失败', icon: 'none' })
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

.form {
	padding: 20rpx;
}

.form-item {
	background: white;
	border-radius: 16rpx;
	padding: 24rpx;
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

.region-row {
	display: flex;
	gap: 16rpx;
}

.region-input {
	flex: 1;
	height: 80rpx;
	background: #f8f8f8;
	border-radius: 8rpx;
	padding: 0 20rpx;
	font-size: 28rpx;
	text-align: center;
	box-sizing: border-box;
}

.switch-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	
	.form-label {
		margin-bottom: 0;
	}
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
	margin-top: 40rpx;
}
</style>