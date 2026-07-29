<template>
	<NavBar :showBack="true" :title="病害详情"></NavBar>
	<view class="container">
		<!-- 技巧图片 -->
		<view class="image-section">
			<image :src="techniqueDetail[0]?.image || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blueberry%20farming%20techniques%2C%20agriculture%2C%20garden&image_size=landscape_16_9'" mode="aspectFill"></image>
		</view>
		
		<!-- 基本信息 -->
		<view class="info-section">
			<view class="name-container">
				<text class="technique-title">{{ techniqueDetail[0]?.title || '暂无标题' }}</text>
				<text class="technique-difficulty">{{ techniqueDetail[0]?.difficulty || '' }}</text>
			</view>
			
			<view class="rating-info">
				<view class="rating">
					<text class="rating-text">{{ techniqueDetail[0]?.rating || 0 }}分</text>
					<view class="stars">
						<text v-for="i in 5" :key="i" class="star">{{ i <= Math.floor(techniqueDetail[0]?.rating || 0) ? '★' : '☆' }}</text>
					</view>
				</view>
				<text class="views">{{ techniqueDetail[0]?.views || 0 }}人已学习</text>
			</view>
		</view>
		
		<!-- 详细描述 -->
		<view class="description-section">
			<view class="section-title">技术详情</view>
			<view class="description-content">
				{{ techniqueDetail[0]?.description || '该技术暂无详细介绍' }}
			</view>
		</view>
		
		<!-- 操作建议 -->
		<view class="tips-section">
			<view class="section-title">操作建议</view>
			<view class="tips-content">
				<text>1. 确保操作前准备好所需工具和材料</text>
				<text>2. 按照技术步骤逐步操作，不要跳过任何环节</text>
				<text>3. 操作过程中注意安全，佩戴必要的防护装备</text>
				<text>4. 操作后及时清理工具和场地</text>
				<text>5. 定期检查操作效果，根据实际情况调整</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import NavBar from '@/component/navBar.vue';

// 技巧信息 - 使用数组格式，与knowledgeDetail保持一致
const techniqueDetail = ref([]);

onLoad((option) => {
	console.log('页面加载，选项:', option);
	if (option.id) {
		getTechniqueDetail(option.id);
	}
});

// 获取技巧详情
const getTechniqueDetail = (id) => {
	uni.request({
		url: `http://127.0.0.1:3006/banner/getTechniqueDetail/${id}`,
		method: 'GET',
		success: function (res) {
			console.log('获取技巧数据成功:', res.data);
			techniqueDetail.value = res.data?.data || [];
		},
		fail: function (err) {
			console.log('获取技巧数据失败:', err);
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
	
	.technique-title {
		font-size: 20px;
		font-weight: 600;
		color: #333;
	}
	
	.technique-difficulty {
		font-size: 12px;
		padding: 4px 12px;
		background-color: #e9f5e9;
		color: #3d6b3c;
		border-radius: 12px;
	}
	
	.rating-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.rating {
		display: flex;
		align-items: center;
		gap: 5px;
		
		.rating-text {
			font-size: 14px;
			font-weight: 600;
			color: #ff9800;
		}
		
		.stars {
			font-size: 12px;
			
			.star {
				color: #ff9800;
			}
		}
	}
	
	.views {
		font-size: 12px;
		color: #999;
	}
	
	.description-section,
	.tips-section {
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
	
	.description-content {
		font-size: 14px;
		color: #666;
		line-height: 1.5;
	}
	
	.tips-content {
		display: flex;
		flex-direction: column;
		gap: 8px;
		
		text {
			font-size: 14px;
			color: #666;
			line-height: 1.4;
		}
	}
</style>

