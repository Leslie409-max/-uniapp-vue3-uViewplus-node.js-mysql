<template>
	<NavBar :showBack="true" title="蓝莓病虫害"></NavBar>
	
	<view class="container">
		<!-- 筛选区域 -->
		<view class="filter-section">
			<view class="filter-item" :class="{ active: selectedFilter === 'all' }" @click="selectFilter('all')">
				<text>全部</text>
			</view>
			<view class="filter-item" :class="{ active: selectedFilter === 'disease' }" @click="selectFilter('disease')">
				<text>常见病害</text>
			</view>
			<view class="filter-item" :class="{ active: selectedFilter === 'weed' }" @click="selectFilter('weed')">
				<text>杂草危害</text>
			</view>
			<view class="filter-item" :class="{ active: selectedFilter === 'pest' }" @click="selectFilter('pest')">
				<text>爬虫害虫</text>
			</view>
		</view>
		
		<!-- 搜索区域 -->
		<view class="search-section">
			<view class="search-box">
				<up-icon name="search"></up-icon>
				<input 
					v-model="searchKeyword" 
					class="search-input"
					placeholder="病虫害名称" 
				/>
				<view v-if="searchKeyword" class="search-clear" @click="clearSearch">
					<up-icon name="close" size="14" />
				</view>
				<view class="search-btn" @click="handleSearch">
					<text>搜索</text>
				</view>
			</view>
		</view>
		
		<!-- 总数显示 -->
		<view class="total-section">
			<text>共计{{ filteredDiseases.length }}种病虫害</text>
		</view>
		
		<!-- 病虫害列表 -->
		<view class="disease-section">
			<view class="disease-item" v-for="(disease, index) in filteredDiseases" :key="index" @click="toDiseaseDetail(disease)">
				<view class="disease-image">
					<image :src="disease.image" mode="aspectFill"></image>
				</view>
				<view class="disease-info">
					<text class="disease-name">{{ disease.name }}</text>
					<text class="disease-type">{{ disease.type }}</text>
					<text class="disease-description">{{ disease.description }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import NavBar from '@/component/navBar.vue';

// 筛选条件
const selectedFilter = ref('all');
const searchKeyword = ref('');

const diseases = ref([])

// 搜索处理
const handleSearch = () => {
    uni.showToast({
        title: '搜索中...',
        icon: 'loading',
        duration: 500
    });
};

// 清除搜索
const clearSearch = () => {
    searchKeyword.value = '';
};

// 获取病虫害数据
const getDiseases = () => {
	uni.request({
		url: 'http://127.0.0.1:3006/banner/getDiseases',
		method: 'GET',
		success: function (res) {
			console.log(res.data.data);
			diseases.value = res.data.data
		}
	});
};

// 筛选后的病虫害
const filteredDiseases = computed(() => {
	let result = diseases.value;
	
	// 分类筛选
	if (selectedFilter.value !== 'all') {
		const typeMap = {
			'disease': '常见病害',
			'weed': '杂草危害',
			'pest': '爬虫害虫'
		};
		result = result.filter(d => d.type === typeMap[selectedFilter.value]);
	}
	
	// 关键词搜索
	if (searchKeyword.value.trim()) {
		const keyword = searchKeyword.value.toLowerCase();
		result = result.filter(d => 
			(d.name && d.name.toLowerCase().includes(keyword)) ||
			(d.description && d.description.toLowerCase().includes(keyword))
		);
	}
	
	return result;
});

// 选择筛选条件
const selectFilter = (filter) => {
	selectedFilter.value = filter;
};

// 跳转到病虫害详情
const toDiseaseDetail = (disease) => {
	uni.navigateTo({
		url: `/pages/index/banner/diseaseDetail?id=${disease.id}`
	});
};

onMounted(() => {
	getDiseases();
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
			padding: 8px 16px;
			border-radius: 20px;
			font-size: 14px;
			color: #666;
			background-color: #f0f0f0;
			
			&.active {
				background-color: #3d6b3c;
				color: white;
			}
		}
	}
	
	.search-section {
		padding: 0 15px 15px;
		
		.search-box {
			display: flex;
			align-items: center;
			gap: 5px;
			padding: 10px 15px;
			background-color: #f0f0f0;
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
	
	.total-section {
		padding: 10px 15px;
		font-size: 14px;
		color: #666;
	}
	
	.disease-section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 15px;
		padding: 15px;
	}
	
	.disease-item {
		background-color: white;
		border-radius: 15px;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		
		.disease-image {
			width: 100%;
			height: 120px;
			
			image {
				width: 100%;
				height: 100%;
			}
		}
		
		.disease-info {
			padding: 10px;
			
			.disease-name {
				display: block;
				font-size: 16px;
				font-weight: 600;
				margin-bottom: 5px;
			}
			
			.disease-type {
				display: inline-block;
				font-size: 10px;
				padding: 2px 8px;
				background-color: #e9f5e9;
				color: #3d6b3c;
				border-radius: 10px;
				margin-bottom: 5px;
			}
			
			.disease-description {
				display: block;
				font-size: 12px;
				color: #666;
				line-height: 1.4;
			}
		}
	}
</style>
