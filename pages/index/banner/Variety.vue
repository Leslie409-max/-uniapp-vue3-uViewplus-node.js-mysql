<template>
	<NavBar :showBack="true" title="蓝莓品种"></NavBar>
	
	<view class="container">
		<!-- 筛选区域 -->
		<view class="filter-section">
			<view class="search-box">
				<up-icon name="search"></up-icon>
				<input 
					v-model="searchKeyword" 
					class="search-input"
					placeholder="品种名称" 
				/>
				<view v-if="searchKeyword" class="search-clear" @click="clearSearch">
					<up-icon name="close" size="14" />
				</view>
				<view class="search-btn" @click="handleSearch">
					<text>搜索</text>
				</view>
			</view>
		</view>
		
		<!-- 分类标签 -->
		<view class="category-section">
			<view class="category-item" :class="{ active: selectedCategory === 'all' }" @click="selectCategory('all')">
				<up-icon name="star"></up-icon>
				<text>全部</text>
			</view>
			<view class="category-item" :class="{ active: selectedCategory === 'low' }" @click="selectCategory('low')">
				<up-icon name="flower"></up-icon>
				<text>矮丛</text>
			</view>
			<view class="category-item" :class="{ active: selectedCategory === 'high' }" @click="selectCategory('high')">
				<up-icon name="tree"></up-icon>
				<text>高丛</text>
			</view>
			<view class="category-item" :class="{ active: selectedCategory === 'half' }" @click="selectCategory('half')">
				<up-icon name="leaf"></up-icon>
				<text>半高丛</text>
			</view>
			<view class="category-item" :class="{ active: selectedCategory === 'rabbit' }" @click="selectCategory('rabbit')">
				<up-icon name="eye"></up-icon>
				<text>兔眼</text>
			</view>
		</view>
		
		<!-- 总数显示 -->
		<view class="total-section">
			<text>共计{{ filteredVarieties.length }}种蓝莓</text>
		</view>
		
		<!-- 品种列表 -->
		<view class="variety-section">
			<view class="variety-item" v-for="(variety, index) in filteredVarieties" :key="index" @click="toVarietyDetail(variety)">
				<view class="variety-image">
					<image :src="variety.variety_image" mode="aspectFill"></image>
				</view>
				<view class="variety-info">
					<text class="variety-name">{{ variety.variety_name }}</text>
					<text class="variety-scientific">{{ variety.scientific_name }}</text>
					<text class="variety-english">{{ variety.english_name }}</text>
					<text class="variety-type">{{ variety.type }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import NavBar from '@/component/navBar.vue';

// 筛选条件
const selectedArea = ref('庄河');
const selectedMaturity = ref('全部');
const selectedCategory = ref('all');
const searchKeyword = ref('');


// 选择分类
const selectCategory = (category) => {
	selectedCategory.value = category;
};

// 搜索输入处理
const handleSearch = () => {
	// 搜索逻辑已通过 computed 属性实现
};

// 清除搜索
const clearSearch = () => {
	searchKeyword.value = '';
};

const varieties = ref([])

// 跳转到品种详情
const toVarietyDetail = (variety) => {
	uni.navigateTo({
		url: `/pages/index/banner/VarietyDetail?id=${variety.id}`
	});
};

// 获取品种数据
const getVariety = () => {
	uni.request({
		url: 'http://127.0.0.1:3006/banner/getVarieties',
		method: 'GET',
		header: {
			Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind6eWxxeSIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOm51bGwsImVtYWlsIjpudWxsLCJ1c2VyX3BpYyI6IiIsImlkIjoxMSwiaWF0IjoxNzUyNjQ0MjM0LCJleHAiOjE3NTI2NjIyMzR9.ELsCtQFcGl8PICdrwkTD-1qGGl2g52_tgOJTwA9Y9z0'
		},
		success: function (res) {
			console.log(res.data.data);
			varieties.value = res.data.data
		}
	});
};

// 筛选后的品种
const filteredVarieties = computed(() => {
	let result = varieties.value;
	
	// 分类筛选
	if (selectedCategory.value !== 'all') {
		const typeMap = {
			'low': '矮丛',
			'high': '高丛',
			'half': '半高丛',
			'rabbit': '兔眼'
		};
		result = result.filter(v => v.type === typeMap[selectedCategory.value]);
	}
	
	// 关键词搜索
	if (searchKeyword.value.trim()) {
		const keyword = searchKeyword.value.toLowerCase();
		result = result.filter(v => 
			(v.variety_name && v.variety_name.toLowerCase().includes(keyword)) ||
			(v.english_name && v.english_name.toLowerCase().includes(keyword)) ||
			(v.scientific_name && v.scientific_name.toLowerCase().includes(keyword))
		);
	}
	
	return result;
});

onMounted(() => {
	getVariety();
});
</script>

<style scoped lang="scss">
	.container {
		width: 100vw;
		min-height: 100vh;
		background-color: #f5f5f5;
		padding-bottom: 60px;
	}
	
	.filter-section {
		display: flex;
		padding: 15px;
		gap: 10px;
		background-color: white;
		
		.filter-item {
			display: flex;
			align-items: center;
			gap: 5px;
			padding: 8px 12px;
			background-color: #f0f0f0;
			border-radius: 20px;
			
			.select-box {
				display: flex;
				align-items: center;
				gap: 5px;
			}
		}
		
		.search-box {
			flex: 1;
			display: flex;
			align-items: center;
			gap: 5px;
			padding: 8px 12px;
			background-color: #f0f0f0;
			border-radius: 20px;
			
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
				padding: 6px 12px;
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
	
	.category-section {
		display: flex;
		gap: 15px;
		padding: 15px;
		background-color: white;
		margin-top: 10px;
		
		.category-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 5px;
			padding: 10px;
			
			&.active {
				color: #3d6b3c;
			}
		}
	}
	
	.total-section {
		padding: 10px 15px;
		font-size: 14px;
		color: #666;
	}
	
	.variety-section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 15px;
		padding: 15px;
	}
	
	.variety-item {
		background-color: white;
		border-radius: 15px;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		
		.variety-image {
			width: 100%;
			height: 120px;
			
			image {
				width: 100%;
				height: 100%;
			}
		}
		
		.variety-info {
			padding: 10px;
			
			.variety-name {
				display: block;
				font-size: 16px;
				font-weight: 600;
				margin-bottom: 5px;
			}
			
			.variety-scientific {
				display: block;
				font-size: 12px;
				color: #999;
				margin-bottom: 3px;
			}
			
			.variety-english {
				display: block;
				font-size: 12px;
				color: #999;
				margin-bottom: 5px;
			}
			
			.variety-type {
				display: inline-block;
				font-size: 10px;
				padding: 2px 8px;
				background-color: #e9f5e9;
				color: #3d6b3c;
				border-radius: 10px;
			}
		}
	
	}
</style>
