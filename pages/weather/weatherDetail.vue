<template>
	<view class="app">
		<NavBar :showBack="true" title="天气详情"></NavBar>
		
		<view class="content">
			<!-- 今日天气卡片 -->
			<view class="weather-card">
				<view class="weather-main">
					<view class="weather-icon-large">
						<text>{{ weatherEmoji }}</text>
					</view>
					<view class="weather-temp-large">{{ weatherData.temperature }}°C</view>
					<view class="weather-desc-large">{{ weatherData.description }}</view>
				</view>
				<view class="weather-city">{{ weatherData.city }}</view>
				<view class="weather-date">{{ currentDate }}</view>
			</view>
			
			<!-- 详细信息 -->
			<view class="detail-card">
				<view class="detail-title">天气详情</view>
				<view class="detail-grid">
					<view class="detail-item">
						<view class="detail-icon">💧</view>
						<view class="detail-label">湿度</view>
						<view class="detail-value">{{ weatherData.humidity }}%</view>
					</view>
					<view class="detail-item">
						<view class="detail-icon">💨</view>
						<view class="detail-label">风力</view>
						<view class="detail-value">{{ weatherData.windSpeed }}</view>
					</view>
					<view class="detail-item">
						<view class="detail-icon">🌡️</view>
						<view class="detail-label">体感温度</view>
						<view class="detail-value">{{ weatherData.feelsLike }}°C</view>
					</view>
					<view class="detail-item">
						<view class="detail-icon">☀️</view>
						<view class="detail-label">紫外线</view>
						<view class="detail-value">{{ weatherData.uvIndex }}</view>
					</view>
					<view class="detail-item">
						<view class="detail-icon">🌧️</view>
						<view class="detail-label">降水概率</view>
						<view class="detail-value">{{ weatherData.precip }}%</view>
					</view>
					<view class="detail-item">
						<view class="detail-icon">🌙</view>
						<view class="detail-label">能见度</view>
						<view class="detail-value">{{ weatherData.visibility }}km</view>
					</view>
				</view>
			</view>
			
			<!-- 蓝莓农事建议 -->
			<view class="advice-card">
				<view class="advice-title">
					<text class="advice-icon">🫐</text>
					<text>蓝莓农事建议</text>
				</view>
				<view class="advice-content">
					<view class="advice-item" v-for="(item, index) in blueberryAdvice" :key="index">
						<view class="advice-tag">{{ item.tag }}</view>
						<view class="advice-text">{{ item.text }}</view>
					</view>
				</view>
			</view>
			
			<!-- 未来几天预报 -->
			<view class="forecast-card">
				<view class="forecast-title">未来几天预报</view>
				<view class="forecast-list">
					<view class="forecast-item" v-for="(item, index) in forecastData" :key="index">
						<view class="forecast-day">{{ item.day }}</view>
						<view class="forecast-icon">{{ item.icon }}</view>
						<view class="forecast-temp">{{ item.temp }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import NavBar from '@/component/navBar.vue'

const weatherData = ref({
	temperature: 26,
	description: '晴转多云',
	city: '大连市',
	humidity: 65,
	windSpeed: '微风',
	feelsLike: 28,
	uvIndex: '中等',
	precip: 10,
	visibility: 10
})

const weatherEmoji = computed(() => {
	const desc = weatherData.value.description
	if (desc.includes('晴')) return '☀️'
	if (desc.includes('云')) return '☁️'
	if (desc.includes('雨')) return '🌧️'
	if (desc.includes('雪')) return '❄️'
	if (desc.includes('雷')) return '⛈️'
	return '🌤️'
})

const currentDate = computed(() => {
	const now = new Date()
	const month = now.getMonth() + 1
	const day = now.getDate()
	const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
	const weekDay = weekDays[now.getDay()]
	return `${month}月${day}日 ${weekDay}`
})

const blueberryAdvice = ref([
	{
		tag: '浇水管理',
		text: '当前温度适宜，建议保持土壤湿润但不过湿。蓝莓根系浅，需定期浇水，每次浇水要浇透，但避免积水。'
	},
	{
		tag: '施肥建议',
		text: '春季是蓝莓生长旺季，可适量施用氮磷钾复合肥，注意控制氮肥用量，避免徒长。'
	},
	{
		tag: '病虫害防治',
		text: '晴朗天气注意防治蚜虫、白粉虱等害虫，可采用生物防治或低毒农药。定期检查叶片和果实。'
	},
	{
		tag: '修剪管理',
		text: '及时修剪病枝、弱枝和过密枝条，保持通风透光。花后及时摘除残花，促进果实发育。'
	},
	{
		tag: '果实保护',
		text: '果实成熟期间注意鸟类危害，可搭建防鸟网。及时采摘成熟果实，避免过熟落果。'
	}
])

const forecastData = ref([
	{ day: '明天', icon: '☁️', temp: '28°/22°' },
	{ day: '周三', icon: '🌧️', temp: '25°/20°' },
	{ day: '周四', icon: '☀️', temp: '30°/23°' },
	{ day: '周五', icon: '☀️', temp: '32°/24°' },
	{ day: '周六', icon: '☁️', temp: '29°/22°' }
])

onLoad(() => {
	// 可以在这里调用天气API获取真实天气数据
})
</script>

<style lang="scss" scoped>
.app {
	min-height: 100vh;
	background: linear-gradient(180deg, #4a90d9 0%, #87ceeb 40%, #f5f5f5 100%);
}

.content {
	padding: 20rpx;
	padding-top: 40rpx;
}

.weather-card {
	background: rgba(255, 255, 255, 0.95);
	border-radius: 24rpx;
	padding: 40rpx;
	text-align: center;
	margin-bottom: 20rpx;
}

.weather-main {
	margin-bottom: 20rpx;
}

.weather-icon-large {
	font-size: 120rpx;
	margin-bottom: 20rpx;
}

.weather-temp-large {
	font-size: 80rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 10rpx;
}

.weather-desc-large {
	font-size: 32rpx;
	color: #666;
	margin-bottom: 20rpx;
}

.weather-city {
	font-size: 28rpx;
	color: #999;
	margin-bottom: 8rpx;
}

.weather-date {
	font-size: 24rpx;
	color: #bbb;
}

.detail-card {
	background: white;
	border-radius: 20rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
}

.detail-title {
	font-size: 30rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
}

.detail-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20rpx;
}

.detail-item {
	text-align: center;
	padding: 20rpx;
	background: #f8f9fa;
	border-radius: 12rpx;
}

.detail-icon {
	font-size: 40rpx;
	margin-bottom: 10rpx;
}

.detail-label {
	font-size: 24rpx;
	color: #999;
	margin-bottom: 8rpx;
}

.detail-value {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
}

.advice-card {
	background: linear-gradient(135deg, #6b8c6a 0%, #3d6b3c 100%);
	border-radius: 20rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
}

.advice-title {
	display: flex;
	align-items: center;
	gap: 10rpx;
	font-size: 30rpx;
	font-weight: bold;
	color: white;
	margin-bottom: 20rpx;
}

.advice-icon {
	font-size: 36rpx;
}

.advice-content {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.advice-item {
	background: rgba(255, 255, 255, 0.15);
	border-radius: 12rpx;
	padding: 16rpx;
}

.advice-tag {
	font-size: 24rpx;
	font-weight: bold;
	color: #ffd700;
	margin-bottom: 8rpx;
}

.advice-text {
	font-size: 24rpx;
	color: rgba(255, 255, 255, 0.9);
	line-height: 1.5;
}

.forecast-card {
	background: white;
	border-radius: 20rpx;
	padding: 30rpx;
}

.forecast-title {
	font-size: 30rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
}

.forecast-list {
	display: flex;
	justify-content: space-between;
}

.forecast-item {
	text-align: center;
	flex: 1;
}

.forecast-day {
	font-size: 24rpx;
	color: #999;
	margin-bottom: 12rpx;
}

.forecast-icon {
	font-size: 40rpx;
	margin-bottom: 12rpx;
}

.forecast-temp {
	font-size: 24rpx;
	color: #333;
}
</style>