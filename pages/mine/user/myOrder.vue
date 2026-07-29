<template>
	<view class="app">
		<NavBar :showBack="true" title="我的订单"></NavBar>
		
		<view class="tabs">
			<view 
				v-for="(tab, index) in tabs" 
				:key="index"
				class="tab-item"
				:class="{ active: currentTab === index }"
				@click="currentTab = index"
			>
				{{ tab.name }}
				<view v-if="currentTab === index" class="tab-indicator"></view>
			</view>
		</view>
		
		<view class="order-list">
			<view class="order-card" v-for="order in filteredOrders" :key="order.id">
				<view class="order-header">
					<view class="order-no">订单号：{{ order.order_no }}</view>
					<view class="order-status" :class="getStatusClass(order.status)">
						{{ getStatusText(order.status) }}
					</view>
				</view>
				
				<view class="order-seller">
					<up-icon name="car" size="16" color="#3d6b3c" />
					<text>{{ order.seller_name }}</text>
				</view>
				
				<view class="order-items">
					<view class="order-item" v-for="(item, idx) in order.products" :key="idx">
						<view class="item-info">
							<view class="item-name">{{ item.name }}</view>
							<view class="item-spec">¥{{ item.price }}/斤 x {{ item.quantity }}斤</view>
						</view>
						<view class="item-total">¥{{ (item.price * item.quantity).toFixed(2) }}</view>
					</view>
				</view>
				
				<view class="order-footer">
					<view class="order-total">
						<text class="label">合计：</text>
						<text class="total-price">¥{{ order.total_price }}</text>
					</view>
					<view class="order-actions">
						<view 
							v-if="order.status === 0" 
							class="action-btn primary"
							@click="confirmOrder(order.id)"
						>
							确认收货
						</view>
						<view 
							v-if="order.status === 1" 
							class="action-btn"
							@click="toReview(order.id)"
						>
							去评价
						</view>
						<view 
							v-if="order.status === 2" 
							class="action-btn"
						>
							已完成
						</view>
					</view>
				</view>
			</view>
			
			<view v-if="filteredOrders.length === 0" class="empty-state">
				<up-empty mode="list" text="暂无订单" />
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue'
	import NavBar from '@/component/navBar.vue'
	import { userUserStore } from '../../../store/userStore'
	import request from '../../../utils/request'
	
	const userStore = userUserStore()
	const userinfo = userStore.userInfo || {}
	
	const tabs = [
		{ name: '全部', status: -1 },
		{ name: '待收货', status: 0 },
		{ name: '待评价', status: 1 },
		{ name: '已完成', status: 2 }
	]
	
	const currentTab = ref(0)
	const orderList = ref([])
	const loading = ref(false)
	
	const filteredOrders = computed(() => {
		const status = tabs[currentTab.value].status
		if (status === -1) return orderList.value
		return orderList.value.filter(order => order.status === status)
	})
	
	const getStatusText = (status) => {
		const statusMap = {
			0: '待收货',
			1: '待评价',
			2: '已完成'
		}
		return statusMap[status] || '未知'
	}
	
	const getStatusClass = (status) => {
		const classMap = {
			0: 'pending',
			1: 'review',
			2: 'completed'
		}
		return classMap[status] || ''
	}
	
	const confirmOrder = async (orderId) => {
		uni.showModal({
			title: '确认收货',
			content: '确认已收到商品？',
			success: async (res) => {
				if (res.confirm) {
					try {
						const response = await request({
							url: `/order/confirm/${orderId}`,
							method: 'POST'
						})
						
						if (response.status === 0) {
							uni.showToast({ title: '已确认收货', icon: 'success' })
							const order = orderList.value.find(o => o.id === orderId)
							if (order) order.status = 1
						} else {
							uni.showToast({ title: response.message || '操作失败', icon: 'none' })
						}
					} catch (error) {
						uni.showToast({ title: '网络错误', icon: 'none' })
					}
				}
			}
		})
	}
	
	const toReview = (orderId) => {
		uni.showToast({ title: '评价功能开发中', icon: 'none' })
	}
	
	const getOrders = (id) =>{
		if (!userinfo.id) {
			uni.showToast({ title: '请先登录', icon: 'none' })
			return
		}
		uni.request({
			url:`http://127.0.0.1:3006/order/getOrdersByUser/${userinfo.id}`,
			success(res) {
				console.log(res)
				orderList.value = res.data?.data
				// small.value = knowledge.value.filter(item=>item.type === '种植心得')
				// long.value = knowledge.value.filter(item=>item.type === '求助问答')
			},
			fail(err){
				console.log(err)
			}
		})
	}
	
	onMounted(() => {
		getOrders()
	})
</script>

<style scoped lang="scss">
	.app {
		width: 100vw;
		min-height: 100vh;
		background-color: #f5f5f5;
	}
	
	.tabs {
		display: flex;
		background-color: white;
		padding: 10px 0;
		border-bottom: 1px solid #f0f0f0;
	}
	
	.tab-item {
		flex: 1;
		text-align: center;
		position: relative;
		padding: 10px 0;
		font-size: 14px;
		color: #666;
		
		&.active {
			color: #3d6b3c;
			font-weight: 600;
		}
	}
	
	.tab-indicator {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 30px;
		height: 3px;
		background-color: #3d6b3c;
		border-radius: 2px;
	}
	
	.order-list {
		padding: 15px;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
	
	.order-card {
		background-color: white;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	}
	
	.order-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px;
		border-bottom: 1px solid #f5f5f5;
	}
	
	.order-no {
		font-size: 13px;
		color: #999;
	}
	
	.order-status {
		font-size: 14px;
		font-weight: 600;
		
		&.pending {
			color: #e74c3c;
		}
		
		&.review {
			color: #f39c12;
		}
		
		&.completed {
			color: #3d6b3c;
		}
	}
	
	.order-seller {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 15px;
		background-color: #fafafa;
		font-size: 14px;
		color: #333;
	}
	
	.order-items {
		padding: 10px 15px;
	}
	
	.order-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0;
		border-bottom: 1px dashed #eee;
		
		&:last-child {
			border-bottom: none;
		}
	}
	
	.item-info {
		flex: 1;
	}
	
	.item-name {
		font-size: 14px;
		color: #333;
		margin-bottom: 4px;
	}
	
	.item-spec {
		font-size: 12px;
		color: #999;
	}
	
	.item-total {
		font-size: 14px;
		font-weight: 600;
		color: #333;
	}
	
	.order-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px;
		border-top: 1px solid #f5f5f5;
	}
	
	.order-total {
		display: flex;
		align-items: baseline;
	}
	
	.order-total .label {
		font-size: 14px;
		color: #666;
	}
	
	.total-price {
		font-size: 18px;
		font-weight: 700;
		color: #e74c3c;
		margin-left: 4px;
	}
	
	.order-actions {
		display: flex;
		gap: 10px;
	}
	
	.action-btn {
		padding: 8px 20px;
		border: 1px solid #ddd;
		border-radius: 20px;
		font-size: 13px;
		color: #666;
		
		&.primary {
			border-color: #3d6b3c;
			background-color: #3d6b3c;
			color: white;
		}
	}
	
	.empty-state {
		padding: 60px 0;
	}
</style>