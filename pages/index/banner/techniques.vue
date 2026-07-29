<template>
	<NavBar :showBack="true" :title="病害详情"></NavBar>
	<view class="container">
		<!-- 分类标签 -->
		<view class="filter-section">
			<view class="filter-item" :class="{ active: selectedCategory === 'all' }" @click="selectCategory('all')">
				<text>全部</text>
			</view>
			<view class="filter-item" :class="{ active: selectedCategory === 'soil' }" @click="selectCategory('soil')">
				<text>土壤管理</text>
			</view>
			<view class="filter-item" :class="{ active: selectedCategory === 'water' }" @click="selectCategory('water')">
				<text>水分管理</text>
			</view>
			<view class="filter-item" :class="{ active: selectedCategory === 'fertilizer' }" @click="selectCategory('fertilizer')">
				<text>施肥技巧</text>
			</view>
			<view class="filter-item" :class="{ active: selectedCategory === 'pruning' }" @click="selectCategory('pruning')">
				<text>修剪技术</text>
			</view>
		</view>
		
		<!-- 技巧列表 -->
		<view class="technique-section">
			<view class="technique-item" v-for="(technique, index) in filteredTechniques" :key="index" @click="toTechniqueDetail(technique)">
				<view class="technique-image">
					<image :src="technique.image" mode="aspectFill"></image>
				</view>
				<view class="technique-info">
					<text class="technique-title">{{ technique.title }}</text>
					<text class="technique-description">{{ technique.description }}</text>
					<view class="technique-meta">
						<view class="technique-rating">
							<text class="rating-text">{{ technique.rating }}分</text>
							<view class="stars">
								<text v-for="i in 5" :key="i" class="star">★</text>
							</view>
						</view>
						<text class="technique-views">{{ technique.views }}人已学习</text>
					</view>
					<view class="technique-distance">
						<text>{{ technique.difficulty }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import NavBar from '@/component/navBar.vue';

// 选中的分类
const selectedCategory = ref('all');

// 分类选择
const selectCategory = (category) => {
	selectedCategory.value = category;
};

const techniques = ref([])
 
 const getTechnique = () => { 
 	 console.log('开始获取技巧数据...');
 	 uni.request({ 
 	 	 url: 'http://127.0.0.1:3006/banner/getTechnique', 
 	 	 method: 'GET', 
 	 	header: {
 	 		Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind6eWxxeSIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOm51bGwsImVtYWlsIjpudWxsLCJ1c2VyX3BpYyI6IiIsImlkIjoxMSwiaWF0IjoxNzUyNjQ0MjM0LCJleHAiOjE3NTI2NjIyMzR9.ELsCtQFcGl8PICdrwkTD-1qGGl2g52_tgOJTwA9Y9z0'
 	 	},
 	 	 success: function (res) { 
 	 	 	 console.log('请求成功:', res);
 	 	 	 console.log('技巧数据:', res.data.data);
 	 	 	 techniques.value = res.data.data;
 	 	 },
 	 	 fail: function (err) { 
 	 	 	 console.log('请求失败:', err);
 	 	 },
 	 	 complete: function () {
 	 	 	 console.log('请求完成');
 	 	 }
 	 }); 
 };
// 筛选后的技巧
const filteredTechniques = computed(() => {
	if (selectedCategory.value === 'all') {
		return techniques.value;
	} else {
		return techniques.value.filter(tech => tech.category === selectedCategory.value);
	}
});

// 跳转到技巧详情
const toTechniqueDetail = (technique) => {
	uni.navigateTo({
		url: `/pages/index/banner/techniquesDetail?id=${technique.id}`
	});
};

onMounted(()=>{
	getTechnique()
})
</script>

<style scoped lang="scss">
	.container {
		width: 100vw;
		min-height: 100vh;
		background-color: #f5f5f5;
		padding-bottom: 20px;
	}
	
	.filter-section {
		display: flex;
		padding: 15px;
		gap: 10px;
		background-color: white;
		margin-bottom: 10px;
		overflow-x: auto;
		
		.filter-item {
			padding: 8px 16px;
			background-color: #f0f0f0;
			border-radius: 20px;
			font-size: 14px;
			color: #666;
			white-space: nowrap;
			
			&.active {
				background-color: #4caf50;
				color: white;
			}
		}
	}
	
	.technique-section {
		padding: 0 15px;
	}
	
	.technique-item {
		display: flex;
		background-color: white;
		border-radius: 10px;
		margin-bottom: 15px;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}
	
	.technique-image {
		width: 150px;
		height: 150px;
		overflow: hidden;
		
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.technique-info {
		flex: 1;
		padding: 12px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.technique-title {
		font-size: 16px;
		font-weight: 600;
		color: #333;
		margin-bottom: 8px;
	}
	
	.technique-description {
		font-size: 14px;
		color: #666;
		line-height: 1.4;
		margin-bottom: 10px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.technique-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 8px;
	}
	
	.technique-rating {
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
	
	.technique-views {
		font-size: 12px;
		color: #999;
	}
	
	.technique-distance {
		font-size: 12px;
		color: #4caf50;
		font-weight: 500;
	}
</style>
