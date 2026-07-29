<template>
	<view class="app">
		<NavBar :showBack="true" title="蓝莓售卖"></NavBar>
		
		<view class="seller-header">
			<view class="seller-info">
				<view class="seller-avatar">
					<image :src="seller[0].avatar || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=farmer%20portrait%2C%20professional&image_size=square'" mode="aspectFill"></image>
				</view>
				<view class="seller-details">
					<view class="seller-name">{{seller[0].nickname || '蓝莓种植户'}}</view>
					<view class="seller-location">
						<up-icon name="map" size="14" color="white" />
						<text>{{seller[0].location || '山东省临沂市'}}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="section">
			<view class="section-title">
				<up-icon name="star" size="16" color="#3d6b3c" />
				<text>蓝莓品种</text>
			</view>
			<view class="variety-list" v-if="seller[0]?.varieties?.length > 0">
				<view class="variety-item" v-for="(item, index) in seller[0].varieties" :key="index">
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
			<view class="image-grid" v-if="seller[0]?.blueberry_images?.length > 0">
				<view class="image-item" v-for="(img, index) in seller[0].blueberry_images" :key="index" @click="previewImage(index)">
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
				<view class="greenhouse-images" v-if="seller[0]?.greenhouse_images?.length > 0">
					<view class="image-item greenhouse" v-for="(img, index) in seller[0].greenhouse_images" :key="index" @click="previewImage(index + seller[0].blueberry_images.length)">
						<image :src="img" mode="aspectFill"></image>
					</view>
				</view>
				<view v-else class="empty-text">暂无大棚图片</view>
				<view class="greenhouse-location">
					<up-icon name="map-fill" size="16" color="#3d6b3c" />
					<text>大棚位置：{{seller[0].greenhouse_location}}</text>
				</view>
				<view class="greenhouse-desc">
					<up-icon name="pushpin-fill" size="16" color="#666" />
					<text>{{seller[0].greenhouse_desc}}</text>
				</view>
			</view>
		</view>

		<view class="section">
			<view class="section-title">
				<up-icon name="phone" size="16" color="#3d6b3c" />
				<text>联系我们</text>
			</view>
			<view class="contact-info">
				<view class="contact-item" @click="makePhoneCall">
					<up-icon name="phone" size="20" color="#3d6b3c" />
					<text>拨打电话</text>
					<up-icon name="arrow-right" size="16" color="#999" />
				</view>
			</view>
		</view>

		<view class="bottom-bar">
			<view class="price-info">
				<text class="label">起售价</text>
				<text class="price">¥{{minPrice}}</text>
				<text class="unit">/斤起</text>
			</view>
			<view class="action-buttons">
				<view class="btn-secondary" @click="sendMessage">咨询</view>
				<view class="btn-primary" @click="showOrderModal = true">订购</view>
			</view>
		</view>

		<!-- 订购弹窗 -->
		<view class="modal-overlay" v-if="showOrderModal" @click="showOrderModal = false">
			<view class="modal-content" @click.stop>
				<view class="modal-header">
					<text class="modal-title">确认订单</text>
					<view class="modal-close" @click="showOrderModal = false">
						<up-icon name="close" size="20" color="#999" />
					</view>
				</view>
				
				<view class="modal-body">
					<!-- 地址选择 -->
					<view class="address-section" @click="goToSelectAddress">
						<view class="address-label">
							<up-icon name="map" size="18" color="#3d6b3c" />
							<text>收货地址</text>
						</view>
						<view class="address-content" v-if="selectedAddress">
							<view class="address-info">
								<text class="address-name">{{selectedAddress.contact_name}} {{selectedAddress.contact_phone}}</text>
								<text class="address-detail">{{selectedAddress.province}}{{selectedAddress.city}}{{selectedAddress.district}}{{selectedAddress.detail_address}}</text>
							</view>
							<up-icon name="arrow-right" size="16" color="#999" />
						</view>
						<view class="address-content empty" v-else>
							<text class="placeholder">请选择收货地址</text>
							<up-icon name="arrow-right" size="16" color="#999" />
						</view>
					</view>
					
					<!-- 品种选择 -->
					<view class="variety-section">
						<view class="variety-label">
							<up-icon name="star" size="18" color="#3d6b3c" />
							<text>选择品种</text>
						</view>
						<view class="order-list">
							<view class="order-item" v-for="(item, index) in seller[0].varieties" :key="index">
								<view class="order-info">
									<view class="order-name">{{item.name}}</view>
									<view class="order-price">¥{{item.price}}/斤</view>
									<view class="order-desc">{{item.description}}</view>
								</view>
								<view class="order-quantity">
									<view class="qty-btn" @click="decreaseQty(index)">
										<up-icon name="minus" size="16" />
									</view>
									<view class="qty-value">{{orderItems[index] || 0}}</view>
									<view class="qty-btn" @click="increaseQty(index)">
										<up-icon name="plus" size="16" />
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="modal-footer">
					<view class="total-info">
						<text class="total-label">合计金额</text>
						<text class="total-price">¥{{totalPrice.toFixed(2)}}</text>
					</view>
					<view class="order-btn" @click="submitOrder" :class="{disabled: totalPrice === 0 || !selectedAddress}">
						提交订单
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import NavBar from '@/component/navBar.vue'
	import { ref, computed, onMounted } from 'vue'
	import { onLoad, onShow } from '@dcloudio/uni-app'
	import { userUserStore } from '../../store/userStore'

	const userStore = userUserStore()
	const userinfo = userStore.userInfo || {}

	const seller = ref([])
	const showOrderModal = ref(false)
	const orderItems = ref({})
	const selectedAddress = ref(null)
	const addressSelected = ref(false)
	
	onLoad((option) => {
		console.log('页面加载，选项:', option.id)
		if (option.id) {
			getShellErListDetail(option.id)
		}
	})
	
	onShow(() => {
		const savedAddress = uni.getStorageSync('selectedAddress')
		if (savedAddress) {
			selectedAddress.value = savedAddress
			addressSelected.value = true
			uni.removeStorageSync('selectedAddress')
		}
	})
	
	const getShellErListDetail = (id) =>{
		uni.request({
			url:`http://127.0.0.1:3006/seller/getShellErListDetail/${id}`,
			success(res) {
				console.log('获取卖家详情:', res.data)
				if (res.data && res.data.data) {
					seller.value = res.data.data
					
					// 解析JSON字符串字段并过滤非法字符
					if (seller.value[0]) {
						if (typeof seller.value[0].varieties === 'string') {
							seller.value[0].varieties = JSON.parse(seller.value[0].varieties)
						}
						if (typeof seller.value[0].blueberry_images === 'string') {
							const imgs = JSON.parse(seller.value[0].blueberry_images)
							// 过滤掉URL中的反引号等非法字符
							seller.value[0].blueberry_images = imgs.map(url => url.replace(/`/g, '').trim())
						}
						if (typeof seller.value[0].greenhouse_images === 'string') {
							const imgs = JSON.parse(seller.value[0].greenhouse_images)
							seller.value[0].greenhouse_images = imgs.map(url => url.replace(/`/g, '').trim())
						}
					}
				}
			},
			fail(err){
				console.log('获取卖家详情失败:', err)
			}
		})
	}

	const minPrice = computed(() => {
		if (seller.value && seller.value[0]?.varieties && seller.value[0].varieties.length > 0) {
			return Math.min(...seller.value[0].varieties.map(v => v.price))
		}
		return 0
	})

	const totalPrice = computed(() => {
		let total = 0
		if (seller.value[0]?.varieties) {
			seller.value[0].varieties.forEach((item, index) => {
				total += (orderItems.value[index] || 0) * item.price
			})
		}
		return total
	})

	const increaseQty = (index) => {
		orderItems.value[index] = (orderItems.value[index] || 0) + 1
	}

	const decreaseQty = (index) => {
		if (orderItems.value[index] && orderItems.value[index] > 0) {
			orderItems.value[index]--
		}
	}

	const goToSelectAddress = () => {
		uni.navigateTo({
			url: '/pages/mine/user/addressList?from=order'
		})
	}

	const submitOrder = () => {
		if (totalPrice.value === 0) {
			uni.showToast({ title: '请选择要购买的商品', icon: 'none' })
			return
		}
		if (!selectedAddress.value) {
			uni.showToast({ title: '请选择收货地址', icon: 'none' })
			return
		}

		uni.showModal({
			title: '确认订单',
			content: `收货地址：${selectedAddress.value.province}${selectedAddress.value.city}${selectedAddress.value.district}${selectedAddress.value.detail_address}\n合计金额：¥${totalPrice.value.toFixed(2)}`,
			confirmText: '确认',
			cancelText: '取消',
			success: (res) => {
				if (res.confirm) {
					createPay()
				}
			}
		})
	}

	const createPay = () => {
		const sellerInfo = seller.value[0]
		if (!sellerInfo) return

		const products = []
		sellerInfo.varieties.forEach((item, idx) => {
			const qty = orderItems.value[idx] || 0
			if (qty > 0) {
				products.push({
					name: item.name,
					price: item.price,
					quantity: qty
				})
			}
		})

		const orderData = {
			user_id: userinfo.id || 1,
			seller_id: sellerInfo.id,
			seller_name: sellerInfo.nickname || sellerInfo.seller_name || '蓝莓商家',
			products: products,
			total_price: totalPrice.value,
			phone: selectedAddress.value?.contact_phone || userinfo.phone || '',
			address: selectedAddress.value ? `${selectedAddress.value.province}${selectedAddress.value.city}${selectedAddress.value.district}${selectedAddress.value.detail_address}` : (userinfo.address || '')
		}

		console.log('提交订单数据:', orderData)

		uni.showLoading({ title: '正在提交订单...' })

		uni.request({
			url: 'http://127.0.0.1:3006/order/create',
			method: 'POST',
			header: {
				'Authorization': `Bearer ${uni.getStorageSync('token') || ''}`,
				'Content-Type': 'application/json'
			},
			data: orderData,
			success(orderRes) {
				console.log('订单创建结果:', orderRes.data)
				if (orderRes.data.status === 0) {
					const orderId = orderRes.data.data.id

					// 模拟支付成功，直接更新订单状态
					simulatePaySuccess(orderId)
				} else {
					uni.hideLoading()
					uni.showToast({ title: orderRes.data.message || '订单创建失败', icon: 'none' })
				}
			},
			fail(err) {
				uni.hideLoading()
				console.log('订单创建失败:', err)
				uni.showToast({ title: '网络错误，请重试', icon: 'none' })
			}
		})
	}

	// 模拟支付成功
	const simulatePaySuccess = (orderId) => {
		uni.showLoading({ title: '支付处理中...' })

		// 模拟支付延迟
		setTimeout(() => {
			uni.request({
				url: 'http://127.0.0.1:3006/order/updateStatus',
				method: 'POST',
				header: {
					'Content-Type': 'application/json'
				},
				data: {
					order_id: orderId,
					status: 'paid'
				},
				success(res) {
					uni.hideLoading()
					console.log('订单状态更新:', res.data)
					
					uni.showToast({
						title: '支付成功！',
						icon: 'success',
						duration: 2000
					})
					
					// 关闭弹窗，重置数量
					showOrderModal.value = false
					orderItems.value = {}
					selectedAddress.value = null
					
					// 跳转到订单列表
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/mine/order/myOrder'
						})
					}, 1500)
				},
				fail(err) {
					uni.hideLoading()
					console.log('订单状态更新失败:', err)
					uni.showToast({ title: '支付状态更新失败', icon: 'none' })
				}
			})
		}, 1000)
	}

	const createOrder = () => {
		const sellerInfo = seller.value[0]
		if (!sellerInfo) return

		const products = []
		sellerInfo.varieties.forEach((item, idx) => {
			const qty = orderItems.value[idx] || 0
			if (qty > 0) {
				products.push({
					name: item.name,
					price: item.price,
					quantity: qty
				})
			}
		})

		const orderData = {
			user_id: userinfo.id || 1,
			seller_id: sellerInfo.id,
			seller_name: sellerInfo.nickname || sellerInfo.seller_name || '蓝莓商家',
			products: products,
			total_price: totalPrice.value,
			phone: userinfo.phone || '',
			address: userinfo.address || ''
		}

		console.log('提交订单数据:', orderData)

		uni.request({
			url: 'http://127.0.0.1:3006/order/create',
			method: 'POST',
			header: {
				'Authorization': `Bearer ${uni.getStorageSync('token') || ''}`,
				'Content-Type': 'application/json'
			},
			data: orderData,
			success(orderRes) {
				console.log('订单创建结果:', orderRes.data)
				if (orderRes.data.status === 0) {
					uni.showToast({ title: '订单提交成功', icon: 'success' })
					showOrderModal.value = false
					orderItems.value = {}
				} else {
					uni.showToast({ title: orderRes.data.message || '订单提交失败', icon: 'none' })
				}
			},
			fail(err) {
				console.log('订单创建失败:', err)
				uni.showToast({ title: '网络错误，请重试', icon: 'none' })
			}
		})
	}

	const previewImage = (index) => {
		if (!seller.value[0]) return
		const blueberryImages = seller.value[0].blueberry_images || []
		const greenhouseImages = seller.value[0].greenhouse_images || []
		const allImages = [...blueberryImages, ...greenhouseImages]
		uni.previewImage({
			current: index,
			urls: allImages
		})
	}

	const makePhoneCall = () => {
		if (!seller.value[0]?.phone) {
			uni.showToast({
				title: '暂无联系电话',
				icon: 'none'
			})
			return
		}
		uni.makePhoneCall({
			phoneNumber: seller.value[0].phone
		})
	}

	onMounted(() => {
		console.log('卖家详情页面加载完成')
	})
</script>

<style scoped lang="scss">
	.app {
		width: 100vw;
		min-height: 100vh;
		background-color: #f5f5f5;
		padding-bottom: 100px;
	}

	.seller-header {
		background: linear-gradient(135deg, #3d6b3c 0%, #5a8a5a 100%);
		padding: 30px 20px 40px;
	}

	.seller-info {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.seller-avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		overflow: hidden;
		border: 3px solid rgba(255, 255, 255, 0.5);
		
		image {
			width: 100%;
			height: 100%;
		}
	}

	.seller-details {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.seller-name {
		font-size: 20px;
		font-weight: 600;
		color: white;
	}

	.seller-location {
		display: flex;
		align-items: center;
		gap: 4px;
		color: rgba(255, 255, 255, 0.8);
		font-size: 14px;
	}

	.section {
		margin: 15px;
		background-color: white;
		border-radius: 16px;
		padding: 20px;
	}

	.section-title {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 16px;
		font-weight: 600;
		color: #333;
		margin-bottom: 15px;
		padding-bottom: 10px;
		border-bottom: 1px solid #f0f0f0;
	}

	.variety-list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 12px;
	}

	.variety-item {
		background-color: #f8f9fa;
		border-radius: 12px;
		padding: 15px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.variety-name {
		font-size: 15px;
		font-weight: 600;
		color: #333;
	}

	.variety-price {
		font-size: 18px;
		font-weight: 700;
		color: #e74c3c;
	}

	.variety-desc {
		font-size: 12px;
		color: #999;
	}

	.image-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
	}

	.image-item {
		width: 100%;
		height: 150px;
		border-radius: 12px;
		overflow: hidden;
		
		image {
			width: 100%;
			height: 100%;
		}
		
		&.greenhouse {
			height: 120px;
		}
	}

	.greenhouse-info {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.greenhouse-location {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
		color: #666;
	}

	.greenhouse-desc {
		display: flex;
		align-items: flex-start;
		gap: 6px;
		font-size: 13px;
		color: #999;
		line-height: 1.5;
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px;
		background-color: #f8f9fa;
		border-radius: 10px;
		cursor: pointer;
		
		text {
			flex: 1;
			font-size: 14px;
			color: #333;
		}
	}

	.bottom-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80px;
		background-color: white;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		z-index: 999;
	}

	.price-info {
		display: flex;
		align-items: baseline;
		gap: 4px;
		
		.label {
			font-size: 12px;
			color: #999;
		}
		
		.price {
			font-size: 24px;
			font-weight: 700;
			color: #e74c3c;
		}
		
		.unit {
			font-size: 12px;
			color: #999;
		}
	}

	.action-buttons {
		display: flex;
		gap: 12px;
	}

	.btn-secondary {
		width: 90px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background-color: #f0f0f0;
		color: #666;
		font-size: 14px;
		border-radius: 20px;
	}

	.btn-primary {
		width: 90px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background: linear-gradient(135deg, #3d6b3c 0%, #5a8a5a 100%);
		color: white;
		font-size: 14px;
		border-radius: 20px;
	}

	/* 订购弹窗样式 */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: flex-end;
		z-index: 1000;
	}

	.modal-content {
		width: 100%;
		max-height: 70vh;
		background-color: white;
		border-radius: 20px 20px 0 0;
		overflow: hidden;
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px;
		border-bottom: 1px solid #f0f0f0;
	}

	.modal-title {
		font-size: 18px;
		font-weight: 600;
		color: #333;
	}

	.modal-close {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-body {
		padding: 20px;
		max-height: 40vh;
		overflow-y: auto;
	}

	.address-section {
		padding: 15px;
		background-color: #f0f9f0;
		border-radius: 12px;
		margin-bottom: 20px;
	}

	.address-label {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 12px;
		
		text {
			font-size: 14px;
			font-weight: 600;
			color: #333;
		}
	}

	.address-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		&.empty {
			justify-content: flex-start;
			
			.placeholder {
				font-size: 14px;
				color: #999;
			}
		}
	}

	.address-info {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.address-name {
		font-size: 14px;
		color: #333;
	}

	.address-detail {
		font-size: 12px;
		color: #666;
	}

	.variety-section {
		margin-top: 10px;
	}

	.variety-label {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 15px;
		
		text {
			font-size: 14px;
			font-weight: 600;
			color: #333;
		}
	}

	.order-list {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.order-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15px;
		background-color: #f8f9fa;
		border-radius: 12px;
	}

	.order-info {
		flex: 1;
	}

	.order-name {
		font-size: 15px;
		font-weight: 600;
		color: #333;
		margin-bottom: 4px;
	}

	.order-price {
		font-size: 16px;
		font-weight: 700;
		color: #e74c3c;
		margin-bottom: 4px;
	}

	.order-desc {
		font-size: 12px;
		color: #999;
	}

	.order-quantity {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.qty-btn {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: white;
		border: 1px solid #ddd;
		border-radius: 50%;
	}

	.qty-value {
		width: 40px;
		text-align: center;
		font-size: 16px;
		font-weight: 600;
		color: #333;
	}

	.modal-footer {
		padding: 20px;
		border-top: 1px solid #f0f0f0;
		background-color: white;
	}

	.total-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 15px;
	}

	.total-label {
		font-size: 14px;
		color: #666;
	}

	.total-price {
		font-size: 24px;
		font-weight: 700;
		color: #e74c3c;
	}

	.order-btn {
		width: 100%;
		height: 48px;
		line-height: 48px;
		text-align: center;
		background: linear-gradient(135deg, #3d6b3c 0%, #5a8a5a 100%);
		color: white;
		font-size: 16px;
		font-weight: 600;
		border-radius: 24px;
		
		&.disabled {
			background: #ccc;
		}
	}
	</style>
