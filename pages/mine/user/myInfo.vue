<template>
	<view class="app">
		<NavBar :showBack="true" title="我的卖家信息"></NavBar>
		
		<!-- 无数据状态 -->
		<view v-if="!sellerData" class="empty-state">
			<view class="empty-icon">
				<up-icon name="store" size="120" color="#ccc" />
			</view>
			<view class="empty-text">暂无卖家信息</view>
			<view class="empty-desc">成为卖家，展示您的蓝莓产品</view>
			<view class="btn-add" @click="goToEdit()">
				<up-icon name="plus" size="24" color="white" />
				<text>成为卖家</text>
			</view>
		</view>
		
		<!-- 有数据状态 -->
		<scroll-view v-else class="seller-scroll" scroll-y>
			<view class="action-bar">
				<view class="btn-edit" @click="goToEdit()">
					<up-icon name="edit-pen" size="20" color="#3d6b3c" />
					<text>编辑信息</text>
				</view>
			</view>
			
			<view class="seller-header">
				<view class="seller-info">
					<view class="seller-avatar">
						<image :src="sellerData.avatar || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=farmer%20portrait%2C%20professional&image_size=square'" mode="aspectFill"></image>
					</view>
					<view class="seller-details">
						<view class="seller-name">{{sellerData.nickname || '蓝莓种植户'}}</view>
						<view class="seller-location">
							<up-icon name="map" size="14" color="white" />
							<text>{{sellerData.location || '山东省临沂市'}}</text>
						</view>
					</view>
				</view>
			</view>

			<view class="section">
				<view class="section-title">
					<up-icon name="star" size="16" color="#3d6b3c" />
					<text>蓝莓品种</text>
				</view>
				<view class="variety-list" v-if="varieties.length > 0">
					<view class="variety-item" v-for="(item, index) in varieties" :key="index">
						<view class="variety-name">{{item.name}}</view>
						<view class="variety-price">¥{{item.price}}/斤</view>
						<view class="variety-desc">{{item.description}}</view>
					</view>
				</view>
				<view v-else class="empty-text">暂无品种信息</view>
			</view>

			<view class="section">
				<view class="section-title">
					<up-icon name="camera" size="16" color="#3d6b3c" />
					<text>蓝莓实拍</text>
				</view>
				<view class="image-grid" v-if="blueberryImages.length > 0">
					<view class="image-item" v-for="(img, index) in blueberryImages" :key="index" @click="previewImage(index)">
						<image :src="img" mode="aspectFill"></image>
					</view>
				</view>
				<view v-else class="empty-text">暂无蓝莓实拍图片</view>
			</view>

			<view class="section">
				<view class="section-title">
					<up-icon name="home" size="16" color="#3d6b3c" />
					<text>大棚环境</text>
				</view>
				<view class="greenhouse-info">
					<view class="greenhouse-images" v-if="greenhouseImages.length > 0">
						<view class="image-item greenhouse" v-for="(img, index) in greenhouseImages" :key="index" @click="previewImage(index + blueberryImages.length)">
							<image :src="img" mode="aspectFill"></image>
						</view>
					</view>
					<view v-else class="empty-text">暂无大棚图片</view>
					<view class="greenhouse-location">
						<up-icon name="map-fill" size="16" color="#3d6b3c" />
						<text>大棚位置：{{sellerData.greenhouse_location}}</text>
					</view>
					<view class="greenhouse-desc">
						<up-icon name="pushpin-fill" size="16" color="#666" />
						<text>{{sellerData.greenhouse_desc}}</text>
					</view>
				</view>
			</view>

			<view class="section">
				<view class="section-title">
					<up-icon name="phone" size="16" color="#3d6b3c" />
					<text>联系方式</text>
				</view>
				<view class="contact-info">
					<view class="contact-item">
						<up-icon name="phone" size="20" color="#3d6b3c" />
						<text>{{sellerData.phone || '未填写'}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import NavBar from '@/component/navBar.vue'

const sellerData = ref(null)

const varieties = computed(() => {
	if (!sellerData.value?.varieties) return []
	try {
		return JSON.parse(sellerData.value.varieties)
	} catch {
		return []
	}
})

const blueberryImages = computed(() => {
	if (!sellerData.value?.blueberry_images) return []
	try {
		return JSON.parse(sellerData.value.blueberry_images)
	} catch {
		return []
	}
})

const greenhouseImages = computed(() => {
	if (!sellerData.value?.greenhouse_images) return []
	try {
		return JSON.parse(sellerData.value.greenhouse_images)
	} catch {
		return []
	}
})

onMounted(() => {
	loadSellerInfo()
})

const loadSellerInfo = () => {
	const userinfo = uni.getStorageSync('userinfo') || {}
	const userId = userinfo.id || 1
	
	uni.showLoading({ title: '加载中...' })
	uni.request({
		url: `http://127.0.0.1:3006/seller/getByUserId/${userId}`,
		method: 'GET',
		success: (res) => {
			uni.hideLoading()
			console.log('后端返回:', res.data)
			if (res.data.status === 0 && res.data.data && res.data.data.length > 0) {
				sellerData.value = res.data.data[0]
				console.log('卖家数据:', sellerData.value)
			}
		},
		fail: () => {
			uni.hideLoading()
			console.log('请求失败')
		}
	})
}

const goToEdit = () => {
	if (sellerData.value) {
		uni.navigateTo({
			url: `/pages/mine/user/editSeller?id=${sellerData.value.id}`
		})
	} else {
		uni.navigateTo({
			url: '/pages/mine/user/editSeller'
		})
	}
}

const previewImage = (index) => {
	const allImages = [...blueberryImages.value, ...greenhouseImages.value]
	uni.previewImage({
		current: index,
		urls: allImages
	})
}
</script>

<style lang="scss" scoped>
.app {
	min-height: 100vh;
	background-color: #f5f5f5;
}

.empty-state {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	padding: 40rpx;
}

.empty-icon {
	width: 200rpx;
	height: 200rpx;
	background: #f0f0f0;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 32rpx;
}

.empty-text {
	font-size: 36rpx;
	color: #333;
	font-weight: bold;
	margin-bottom: 16rpx;
}

.empty-desc {
	font-size: 28rpx;
	color: #999;
	margin-bottom: 48rpx;
}

.btn-add {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 88rpx;
	background: linear-gradient(135deg, #3d6b3c, #5a9b58);
	border-radius: 44rpx;
	padding: 0 60rpx;
	color: white;
	font-size: 32rpx;
	font-weight: bold;
	
	icon {
		margin-right: 12rpx;
	}
}

.seller-scroll {
	height: calc(100vh - 88rpx);
}

.action-bar {
	background: white;
	padding: 20rpx 32rpx;
	display: flex;
	justify-content: flex-end;
}

.btn-edit {
	display: flex;
	align-items: center;
	height: 64rpx;
	padding: 0 28rpx;
	background: #f0f9f0;
	border-radius: 32rpx;
	color: #3d6b3c;
	font-size: 28rpx;
	
	icon {
		margin-right: 8rpx;
	}
}

.seller-header {
	background: linear-gradient(135deg, #3d6b3c, #5a9b58);
	padding: 40rpx 32rpx;
}

.seller-info {
	display: flex;
	align-items: center;
}

.seller-avatar {
	width: 140rpx;
	height: 140rpx;
	border-radius: 50%;
	overflow: hidden;
	border: 4rpx solid rgba(255,255,255,0.5);
	
	image {
		width: 100%;
		height: 100%;
	}
}

.seller-details {
	margin-left: 24rpx;
}

.seller-name {
	font-size: 36rpx;
	font-weight: bold;
	color: white;
	margin-bottom: 8rpx;
}

.seller-location {
	display: flex;
	align-items: center;
	color: rgba(255,255,255,0.8);
	font-size: 26rpx;
	
	icon {
		margin-right: 8rpx;
	}
}

.section {
	background: white;
	margin: 20rpx;
	border-radius: 16rpx;
	padding: 24rpx;
}

.section-title {
	display: flex;
	align-items: center;
	font-size: 30rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
	
	icon {
		margin-right: 12rpx;
	}
}

.variety-list {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.variety-item {
	background: #f8f9fa;
	border-radius: 12rpx;
	padding: 20rpx;
}

.variety-name {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 8rpx;
}

.variety-price {
	font-size: 32rpx;
	color: #e74c3c;
	font-weight: bold;
	margin-bottom: 8rpx;
}

.variety-desc {
	font-size: 26rpx;
	color: #666;
}

.empty-text {
	font-size: 28rpx;
	color: #999;
	text-align: center;
	padding: 40rpx 0;
}

.image-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 16rpx;
}

.image-item {
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
	
	&.greenhouse {
		margin-top: 12rpx;
	}
}

.greenhouse-info {
	
}

.greenhouse-images {
	display: flex;
	flex-wrap: wrap;
	gap: 16rpx;
}

.greenhouse-location, .greenhouse-desc {
	display: flex;
	align-items: center;
	font-size: 26rpx;
	color: #666;
	margin-top: 16rpx;
	padding-left: 8rpx;
	
	icon {
		margin-right: 8rpx;
	}
}

.contact-info {
	
}

.contact-item {
	display: flex;
	align-items: center;
	font-size: 28rpx;
	color: #333;
	padding: 12rpx 0;
	
	icon {
		margin-right: 12rpx;
	}
}
</style>
