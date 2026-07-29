<template>
	<view class="app">
		<NavBar :showBack="true" title="地址管理"></NavBar>
		
		<view class="content">
			<view class="address-list" v-if="addressList.length > 0">
				<view class="address-item" v-for="item in addressList" :key="item.id">
					<view class="address-info" @click="selectAddress(item)">
						<view class="contact">
							<text class="name">{{item.contact_name}}</text>
							<text class="phone">{{item.contact_phone}}</text>
							<view class="default-tag" v-if="item.is_default === 1">默认</view>
						</view>
						<view class="address-detail">
							{{item.province}} {{item.city}} {{item.district}} {{item.detail_address}}
						</view>
					</view>
					<view class="address-actions">
						<view class="action-btn" @click="setDefault(item)">
							<up-icon name="star" :color="item.is_default === 1 ? '#ffcc00' : '#999'" size="18" />
							<text>{{item.is_default === 1 ? '已设默认' : '设为默认'}}</text>
						</view>
						<view class="action-btn" @click="editAddress(item)">
							<up-icon name="edit-pen" color="#3d6b3c" size="18" />
							<text>编辑</text>
						</view>
						<view class="action-btn" @click="deleteAddress(item.id)">
							<up-icon name="trash" color="#ff6b6b" size="18" />
							<text>删除</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="empty-state" v-else>
				<up-icon name="map" size="100" color="#ccc" />
				<text class="empty-text">暂无收货地址</text>
				<text class="empty-desc">点击下方按钮添加收货地址</text>
			</view>
			
			<view class="bottom-bar">
				<view class="btn-add" @click="goToAdd">
					<up-icon name="plus" size="20" color="white" />
					<text>添加新地址</text>
				</view>
			</view>
		</view>
		
		<up-toast ref="toastRef"></up-toast>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavBar from '@/component/navBar.vue'

const addressList = ref([])
const toastRef = ref(null)

onMounted(() => {
	loadAddressList()
})

const loadAddressList = () => {
	const userinfo = uni.getStorageSync('userinfo') || {}
	const userId = userinfo.id || 1
	
	uni.request({
		url: `http://127.0.0.1:3006/address/list/${userId}`,
		method: 'GET',
		success: (res) => {
			if (res.data.status === 0) {
				addressList.value = res.data.data || []
			}
		}
	})
}

const selectAddress = (item) => {
	uni.setStorageSync('selectedAddress', item)
	uni.setStorageSync('addressSelected', true)
	uni.navigateBack()
}

const setDefault = (item) => {
	if (item.is_default === 1) return
	
	const userinfo = uni.getStorageSync('userinfo') || {}
	uni.request({
		url: `http://127.0.0.1:3006/address/setDefault/${item.id}`,
		method: 'PUT',
		data: { user_id: userinfo.id || 1 },
		success: (res) => {
			if (res.data.status === 0) {
				loadAddressList()
			}
		}
	})
}

const editAddress = (item) => {
	uni.navigateTo({
		url: `/pages/mine/user/editAddress?id=${item.id}`
	})
}

const deleteAddress = (id) => {
	uni.showModal({
		title: '确认删除',
		content: '确定要删除这个地址吗？',
		success: (res) => {
			if (res.confirm) {
				uni.request({
					url: `http://127.0.0.1:3006/address/delete/${id}`,
					method: 'DELETE',
					success: (res) => {
						if (res.data.status === 0) {
							loadAddressList()
						}
					}
				})
			}
		}
	})
}

const goToAdd = () => {
	uni.navigateTo({
		url: '/pages/mine/user/editAddress'
	})
}
</script>

<style lang="scss" scoped>
.app {
	min-height: 100vh;
	background-color: #f5f5f5;
}

.content {
	padding: 20rpx;
	padding-bottom: 140rpx;
}

.address-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.address-item {
	background: white;
	border-radius: 16rpx;
	padding: 24rpx;
}

.address-info {
	padding-bottom: 20rpx;
	border-bottom: 1rpx solid #eee;
}

.contact {
	display: flex;
	align-items: center;
	margin-bottom: 12rpx;
	
	.name {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
		margin-right: 16rpx;
	}
	
	.phone {
		font-size: 28rpx;
		color: #666;
	}
	
	.default-tag {
		background: #3d6b3c;
		color: white;
		font-size: 22rpx;
		padding: 4rpx 12rpx;
		border-radius: 4rpx;
		margin-left: 16rpx;
	}
}

.address-detail {
	font-size: 26rpx;
	color: #666;
	line-height: 1.5;
}

.address-actions {
	display: flex;
	padding-top: 20rpx;
	gap: 32rpx;
}

.action-btn {
	display: flex;
	align-items: center;
	gap: 8rpx;
	font-size: 26rpx;
	color: #666;
}

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 200rpx;
	
	.empty-text {
		font-size: 32rpx;
		color: #333;
		font-weight: bold;
		margin-top: 24rpx;
	}
	
	.empty-desc {
		font-size: 26rpx;
		color: #999;
		margin-top: 12rpx;
	}
}

.bottom-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 20rpx 32rpx;
	padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
	padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
	background: white;
	box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
}

.btn-add {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 88rpx;
	background: linear-gradient(135deg, #3d6b3c, #5a9b58);
	border-radius: 44rpx;
	color: white;
	font-size: 30rpx;
	font-weight: bold;
	
	icon {
		margin-right: 12rpx;
	}
}
</style>