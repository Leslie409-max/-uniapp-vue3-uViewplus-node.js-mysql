<template>
	<view class="app">
		<NavBar :showBack="true" title="蓝莓商城"></NavBar>
		
		<view class="search-bar">
			<view class="search-box">
				<up-icon name="search"></up-icon>
				<input 
					v-model="searchKeyword" 
					class="search-input"
					placeholder="搜索蓝莓品种、商家..." 
				/>
				<view v-if="searchKeyword" class="search-clear" @click="clearSearch">
					<up-icon name="close" size="14" />
				</view>
				<view class="search-btn" @click="handleSearch">
					<text>搜索</text>
				</view>
			</view>
		</view>
		
		<view class="tabs">
			<view 
				v-for="(tab, index) in tabs" 
				:key="index"
				class="tab-item"
				:class="{ active: currentTab === index }"
				@click="selectTab(index)"
			>
				{{ tab.name }}
				<view v-if="currentTab === index" class="tab-indicator"></view>
			</view>
		</view>
		
		<view class="goods-list">
			<view 
				v-for="item in filteredSellerList" 
				:key="item.id" 
				class="goods-card"
				@click="goDetail(item.id)"
			>
				<view class="goods-image">
					<image :src="item.image" mode="aspectFill"></image>
					<view class="price-tag">
						<text class="price-symbol">¥</text>
						<text class="price-value">{{ item.blueberry_price }}</text>
						<text class="price-unit">/斤</text>
					</view>
				</view>
				<view class="goods-info">
					<view class="goods-title">{{ item.variety }}</view>
					<view class="goods-location">
						<up-icon name="map" size="12" color="#999"></up-icon>
						<text>{{ item.store_location }}</text>
					</view>
					<view class="goods-desc">{{ item.remark }}</view>
					<view class="goods-footer">
						<view class="sales-info">
							<up-icon name="eye" size="12" color="#999"></up-icon>
							<text>已售 234</text>
						</view>
						<view class="goods-tags">
							<view class="tag">有机认证</view>
							<view class="tag">产地直发</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="sellerList.length === 0" class="empty-state">
			<up-empty mode="list" text="暂无商品" />
		</view>
	</view>
</template>

<script setup>
	import NavBar from '@/component/navBar.vue'
	import { ref, computed, onMounted } from 'vue'
	
	const tabs = [
		{ name: '全部', value: 'all' },
		{ name: '北高丛蓝莓', value: '北高丛蓝莓' },
		{ name: '薄雾蓝莓', value: '薄雾蓝莓' },
		{ name: '美登蓝莓', value: '美登蓝莓' },
		{ name: '北陆蓝莓', value: '北陆蓝莓' },
		{ name: '泽西蓝莓', value: '泽西蓝莓' },
		{ name: '康维尔蓝莓', value: '康维尔蓝莓' }
	]
	
	const currentTab = ref(0)
	const sellerList = ref([])
	const searchKeyword = ref('')
	
	// 获取商家列表
	const fetchSellerList = () => {
		uni.request({
			url: 'http://127.0.0.1:3006/seller/list',
			success(res) {
				console.log('获取商家列表:', res.data)
				if (res.data.status === 0) {
					sellerList.value = res.data.data || []
				}
			},
			fail(err) {
				console.log('获取商家列表失败:', err)
			}
		})
	}
	
	// 搜索处理
	const handleSearch = () => {
		uni.showToast({
			title: '搜索中...',
			icon: 'loading',
			duration: 500
		})
	}
	
	// 清除搜索
	const clearSearch = () => {
		searchKeyword.value = ''
	}
	
	// 选择分类
	const selectTab = (index) => {
		currentTab.value = index
	}
	
	// 筛选后的列表
	const filteredSellerList = computed(() => {
		let result = sellerList.value
		
		// 分类筛选
		const selectedValue = tabs[currentTab.value]?.value
		if (selectedValue && selectedValue !== 'all') {
			result = result.filter(item => item.variety === selectedValue)
		}
		
		// 关键词搜索
		if (searchKeyword.value.trim()) {
			const keyword = searchKeyword.value.toLowerCase()
			result = result.filter(item => 
				(item.variety && item.variety.toLowerCase().includes(keyword)) ||
				(item.store_location && item.store_location.toLowerCase().includes(keyword)) ||
				(item.remark && item.remark.toLowerCase().includes(keyword))
			)
		}
		
		return result
	})
	
	const goDetail = (id) => {
		uni.navigateTo({
			url: `/pages/message/sellerDetail?id=${id}`
		})
	}
	
	onMounted(() => {
		fetchSellerList()
	})
</script>

<style scoped lang="scss">
	.app {
		width: 100vw;
		min-height: 100vh;
		background-color: #f5f5f5;
	}
	
	.search-bar {
		padding: 10px 15px;
		background-color: white;
		
		.search-box {
			display: flex;
			align-items: center;
			gap: 8px;
			padding: 10px 15px;
			background-color: #f5f5f5;
			border-radius: 25px;
			
			.search-input {
				flex: 1;
				font-size: 14px;
				background: transparent;
				border: none;
				outline: none;
			}
			
			.search-clear {
				padding: 4px;
				color: #999;
			}
			
			.search-btn {
				padding: 6px 15px;
				background-color: #3d6b3c;
				color: white;
				border-radius: 12px;
				font-size: 13px;
				
				text {
					color: white;
				}
			}
		}
	}
	
	.tabs {
		display: flex;
		background-color: white;
		padding: 10px 0;
		overflow-x: auto;
		white-space: nowrap;
		
		&::-webkit-scrollbar {
			display: none;
		}
	}
	
	.tab-item {
		position: relative;
		padding: 10px 20px;
		font-size: 15px;
		color: #666;
		transition: color 0.2s;
		flex-shrink: 0;
		
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
		width: 20px;
		height: 3px;
		background-color: #3d6b3c;
		border-radius: 2px;
	}
	
	.goods-list {
		padding: 15px;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
	
	.goods-card {
		display: flex;
		background-color: white;
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
	}
	
	.goods-image {
		position: relative;
		width: 140px;
		height: 140px;
		flex-shrink: 0;
		
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.price-tag {
		position: absolute;
		bottom: 8px;
		left: 8px;
		background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
		padding: 4px 10px;
		border-radius: 6px;
		display: flex;
		align-items: baseline;
	}
	
	.price-symbol {
		font-size: 14px;
		font-weight: 600;
		color: white;
	}
	
	.price-value {
		font-size: 22px;
		font-weight: 700;
		color: white;
	}
	
	.price-unit {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.8);
		margin-left: 2px;
	}
	
	.goods-info {
		flex: 1;
		padding: 12px 15px;
		display: flex;
		flex-direction: column;
	}
	
	.goods-title {
		font-size: 16px;
		font-weight: 600;
		color: #333;
		margin-bottom: 8px;
	}
	
	.goods-location {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 12px;
		color: #999;
		margin-bottom: 8px;
	}
	
	.goods-desc {
		font-size: 13px;
		color: #666;
		line-height: 1.4;
		flex: 1;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
	}
	
	.goods-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10px;
	}
	
	.sales-info {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 12px;
		color: #999;
	}
	
	.goods-tags {
		display: flex;
		gap: 6px;
	}
	
	.tag {
		font-size: 11px;
		padding: 2px 8px;
		background-color: #f0f9f0;
		color: #3d6b3c;
		border-radius: 4px;
	}
	
	.empty-state {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 400px;
	}
</style>
