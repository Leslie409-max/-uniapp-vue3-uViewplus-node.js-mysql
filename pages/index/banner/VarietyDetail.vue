<template>
	<NavBar :showBack="true" :title="variety[0].variety_name || '蓝莓品种详情'"></NavBar>
	
	<view class="container">
		<!-- 品种图片 -->
		<view class="image-section">
			<image :src="variety[0].variety_image || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blueberry%20fruit%20close%20up%2C%20fresh%20berries&image_size=landscape_16_9'" mode="aspectFill"></image>
		</view>
		
		<!-- 基本信息 -->
		<view class="info-section">
			<view class="name-container">
				<text class="variety-name">{{ variety[0].variety_name || '加载中...' }}</text>
				<text class="variety-type">{{ variety[0].type || '' }}</text>
			</view>
			
			<view class="scientific-info">
				<text class="scientific-name">{{ variety[0].scientific_name || '' }}</text>
				<text class="english-name">{{ variety[0].english_name || '' }}</text>
			</view>
		</view>
		
		<!-- 详细描述 -->
		<view class="description-section">
			<view class="section-title">品种简介</view>
			<view class="description-content">
				{{ variety[0].variety_description || '该品种暂无详细介绍' }}
			</view>
		</view>
		
		<!-- 特性与栽培 -->
		<view class="features-section">
			<view class="section-title">特性与栽培</view>
			<view class="feature-item">
				<text class="feature-label">成熟期：</text>
				<text class="feature-value">{{ variety[0].maturity_period || '未知' }}</text>
			</view>
			<view class="feature-item">
				<text class="feature-label">果实大小：</text>
				<text class="feature-value">{{ variety[0].fruit_size || '未知' }}</text>
			</view>
			<view class="feature-item">
				<text class="feature-label">果实风味：</text>
				<text class="feature-value">{{ variety[0].fruit_flavor || '未知' }}</text>
			</view>
			<view class="feature-item">
				<text class="feature-label">抗逆性：</text>
				<text class="feature-value">{{ variety[0].disease_resistance || '未知' }}</text>
			</view>
		</view>
		
		<!-- 适宜区域 -->
		<view class="region-section">
			<view class="section-title">适宜区域</view>
			<view class="region-content">
				{{ variety[0].suitable_conditions || '该品种适宜种植区域暂无详细信息' }}
			</view>
		</view>
		
		<!-- 栽培要点 -->
		<view class="cultivation-section">
			<view class="section-title">栽培要点</view>
			<view class="cultivation-content">
				{{ variety[0].soil_requirements || '该品种栽培要点暂无详细信息' }}
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NavBar from '@/component/navBar.vue';
import {onLoad} from '@dcloudio/uni-app'

	const expertId = ref(null)
	onLoad((option)=>{
		console.log(option)
		// 从option中获取id参数并调用API
		if(option.id) {
			expertId.value = option.id
			getVarietiesDetail(option.id)
		}
	})
	
// 品种信息
const variety = ref({});
	const getVarietiesDetail = (id) =>{
		uni.request({
			url:`http://127.0.0.1:3006/banner/getVarietiesDetail/${id}`,
			success(res) {
				console.log(res.data)
				variety.value = res.data?.data
			},
			fail(err){
				console.log(err)
			}
		})
	}

// 获取品种详情
// const getVarietyDetail = (varietyName) => {
// 	uni.request({
// 		url: 'http://127.0.0.1:3006/banner/getVarieties',
// 		method: 'GET',
// 		header: {
// 			Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3BpYyI6IiIsImlkIjoxMSwiaWF0IjoxNzUyNjQ0MjM0LCJleHAiOjE3NTI2NjIyMzR9.ELsCtQFcGl8PICdrwkTD-1qGGl2g52_tgOJTwA9Y9z0'
// 		},
// 		success: function (res) {
// 			console.log('获取品种数据成功:', res.data.data);
// 			// 从返回的数据中找到对应的品种
// 			const foundVariety = res.data.data.find(v => v.variety_name === varietyName);
// 			if (foundVariety) {
// 				variety.value = foundVariety;
// 			} else {
// 				// 如果没有找到，使用默认值
// 				variety.value = {
// 					variety_name: varietyName,
// 					variety_image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blueberry%20fruit%20close%20up%2C%20fresh%20berries&image_size=landscape_16_9'
// 				};
// 			}
// 		},
// 		fail: function (err) {
// 			console.log('获取品种数据失败:', err);
// 			// 失败时使用默认值
// 			const pages = getCurrentPages();
// 			const currentPage = pages[pages.length - 1];
// 			const varietyName = currentPage.options.id || '未知品种';
// 			variety.value = {
// 				variety_name: varietyName,
// 				variety_image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blueberry%20fruit%20close%20up%2C%20fresh%20berries&image_size=landscape_16_9'
// 			};
// 		}
// 	});
// };

// 页面加载时获取数据
// onMounted(() => {
// 	// 从URL获取品种名称
// 	const pages = getCurrentPages();
// 	const currentPage = pages[pages.length - 1];
// 	const varietyName = currentPage.options.id || '北陆';
	
// 	// 调用API获取品种详情
// 	getVarietyDetail(varietyName);
// });
</script>

<style scoped lang="scss">
	.container {
		width: 100vw;
		min-height: 100vh;
		background-color: #f5f5f5;
		padding-bottom: 20px;
	}
	
	.image-section {
		width: 100%;
		height: 200px;
		overflow: hidden;
		
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.info-section {
		background-color: white;
		padding: 15px;
		margin-bottom: 10px;
	}
	
	.name-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
	}
	
	.variety-name {
		font-size: 20px;
		font-weight: 600;
		color: #333;
	}
	
	.variety-type {
		font-size: 12px;
		padding: 4px 12px;
		background-color: #e9f5e9;
		color: #3d6b3c;
		border-radius: 12px;
	}
	
	.scientific-info {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	
	.scientific-name {
		font-size: 14px;
		color: #666;
		font-style: italic;
	}
	
	.english-name {
		font-size: 13px;
		color: #999;
	}
	
	.description-section,
	.features-section,
	.region-section,
	.cultivation-section {
		background-color: white;
		padding: 15px;
		margin-bottom: 10px;
	}
	
	.section-title {
		font-size: 16px;
		font-weight: 600;
		color: #333;
		margin-bottom: 12px;
		padding-bottom: 8px;
		border-bottom: 1px solid #f0f0f0;
	}
	
	.description-content,
	.region-content,
	.cultivation-content {
		font-size: 14px;
		color: #666;
		line-height: 1.5;
	}
	
	.features-section {
		
		.feature-item {
			display: flex;
			margin-bottom: 10px;
			
			.feature-label {
				font-size: 14px;
				font-weight: 500;
				color: #333;
				width: 80px;
				flex-shrink: 0;
			}
			
			.feature-value {
				font-size: 14px;
				color: #666;
				flex: 1;
			}
		}
	}
</style>
