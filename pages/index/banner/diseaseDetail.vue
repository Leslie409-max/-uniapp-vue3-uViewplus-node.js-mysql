<template>
	<NavBar :showBack="true" :title="disease[0]?.name || '病害详情'"></NavBar>
	
	<view class="container">
		<!-- 病虫害图片 -->
		<view class="image-section">
			<image :src="disease[0]?.image || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=plant%20disease%2C%20blueberry%20plant%2C%20agriculture&image_size=landscape_16_9'" mode="aspectFill"></image>
		</view>
		
		<!-- 基本信息 -->
		<view class="info-section">
			<view class="name-container">
				<text class="disease-name">{{ disease[0]?.name || '暂无名称' }}</text>
				<text class="disease-type">{{ disease[0]?.type || '' }}</text>
			</view>
		</view>
		
		<!-- 详细描述 -->
		<view class="description-section">
			<view class="section-title">病害描述</view>
			<view class="description-content">
				{{ disease[0]?.description || '该病虫害暂无详细介绍' }}
			</view>
		</view>
		
		<!-- 症状表现 -->
		<view class="symptoms-section">
			<view class="section-title">症状表现</view>
			<view class="symptoms-content">
				{{ disease[0]?.symptoms || '该病虫害症状表现暂无详细信息' }}
			</view>
		</view>
		
		<!-- 发病规律 -->
		<view class="rules-section">
			<view class="section-title">发病规律</view>
			<view class="rules-content">
				{{ disease[0]?.rules || '该病虫害发病规律暂无详细信息' }}
			</view>
		</view>
		
		<!-- 防治方法 -->
		<view class="prevention-section">
			<view class="section-title">防治方法</view>
			<view class="prevention-content">
				{{ disease[0]?.prevention || '该病虫害防治方法暂无详细信息' }}
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import NavBar from '@/component/navBar.vue';

const disease = ref([]);

onLoad((option) => {
	console.log('页面加载，选项:', option);
	if (option.id) {
		getDiseaseDetail(option.id);
	}
});

// 获取病害详情
const getDiseaseDetail = (id) => {
	uni.request({
		url: `http://127.0.0.1:3006/banner/getDiseasesDetail/${id}`,
		method: 'GET',
		success: function (res) {
			console.log('获取病害数据成功:', res.data);
			disease.value = res.data?.data || [];
		},
		fail: function (err) {
			console.log('获取病害数据失败:', err);
		}
	});
};
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
	
	.disease-name {
		font-size: 20px;
		font-weight: 600;
		color: #333;
	}
	
	.disease-type {
		font-size: 12px;
		padding: 4px 12px;
		background-color: #f0f7fd;
		color: #2c5e91;
		border-radius: 12px;
	}
	
	.description-section,
	.symptoms-section,
	.rules-section,
	.prevention-section {
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
	.symptoms-content,
	.rules-content,
	.prevention-content {
		font-size: 14px;
		color: #666;
		line-height: 1.5;
	}
</style>