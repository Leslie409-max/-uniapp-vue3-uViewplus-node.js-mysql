<template>
	<NavBar :name="true"></NavBar>
	
	<view class="app">
	<view class="banner">
		<up-swiper
		    :list="list1"
		    @change="change"
			height="200"
			radius="15"
		></up-swiper>
		<!-- <image class="banner__image" src="/static/banner.png" mode="widthFix"  @click="todeepseek"></image> -->
	</view>
	
	<view class="functions">
		<view class="functions__item" @click="toVariety">
			<view><image class="functions__item-image"src="/static/植物.png" mode="widthFix"></image></view>
			<view>品种</view>
		</view>
		<view class="functions__item" @click="toDiseases">
			<view><image class="functions__item-image"src="/static/病虫害on.png" mode="widthFix"></image></view>
			<view>病虫害</view>
		</view>
		<view class="functions__item" @click="toTechniques">
			<view><image class="functions__item-image"src="/static/栽培技巧.png" mode="widthFix"></image></view>
			<view>栽培技巧</view>
		</view>
		<view class="functions__item" @click="todeepseek">
			<view><image class="functions__item-image"src="/static/Ai.png" mode="widthFix"></image></view>
			<view>AI问答</view>
		</view>
	</view>
	
	<view class="area3">
	      <view class="weather-card" @click="refreshWeather">
	        <view class="weather-left">
	        	<view class="weather-main">
		            <view class="weather-icon">
		            	<text class="weather-emoji">{{ weatherEmoji }}</text>
		            </view>
		            <view class="weather-info">
			            <view class="weather-temp">{{ weatherData.temperature }}°C</view>
			            <view class="weather-desc">{{ weatherData.description }}</view>
			        </view>
		        </view>
		        <view class="weather-detail">
		            <text class="detail-item">💧 湿度 {{ weatherData.humidity }}%</text>
		            <text class="detail-item">💨 风力 {{ weatherData.windSpeed }}</text>
		        </view>
	        </view>
	        <view class="weather-right">
	        	<view class="weather-city">{{ weatherData.city }}</view>
	        	<view class="weather-tips">点击查看详情</view>
	        	<view class="blueberry-tag">🫐 蓝莓农事</view>
	        </view>
	    </view>
	</view>
	
	<Title title="询问专家" @more="goToMore"></Title>

	<view class="expert">
		<view class="expert__item" v-for="item in expertlist" @click="toexpertDetail(item)">
			<view class="expert__content">
				<view class="expert__avatar">
					<image :src="item.avatar" mode="aspectFill"></image>
				</view>
				<view class="expert__info">
					<view>
					    <view class="expert__header">
					    	<text class="expert__name">{{item.expertName}}</text>
					    	<text class="expert__title">{{item.degree}}</text>
					    </view>
					    <view class="expert__tags">
					    	<view class="expert__tag">资深专家</view>
					    	<view class="expert__tag">{{item.major}}</view>
					    </view>
					</view>
					
					<view>
					    <view class="expert__description">
					    	<text class="expert__quote">"</text>
					    	<text>{{item.speciality}}</text>
					    </view>
					    <view class="expert__footer">
					    	<view class="expert__rating">
					    		<text>学者推荐分</text>
					    		<text class="expert__score">4.8</text>
					    	</view>
					    	<view class="expert__consult" @click.stop="toexpertDetail(item)">
					    		<up-icon name="chat"></up-icon>
					    		<text>免费咨询</text>
					    	</view>
					    </view>
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
	
	
</template>

<script setup>
	import NavBar from '../../component/navBar.vue';
	import Title from '@/component/title.vue'
	import { ref,onMounted,reactive } from 'vue';
	import { getExpertAPI } from '../../api/api';
	
// 使用 reactive 创建响应式数组  
const list1 = reactive([  
    '/static/banner1 (1).jpg',  
    '/static/banner1 (2).jpg',
	'/static/deepseek.jpg'
]);  

//跳转到品种页
const toVariety = () =>{
	uni.navigateTo({
		url:'/pages/index/banner/Variety'
	})
}

//跳转到病虫害页
const toDiseases = () =>{
	uni.navigateTo({
		url:'/pages/index/banner/diseases'
	})
}

const toexpertDetail = (item) =>{
	uni.navigateTo({
		url:`/pages/index/expertList/expertDetail?id=${item.id}`
	})
}

const toTechniques = () =>{
	uni.navigateTo({
		url:'/pages/index/banner/techniques'
	})
}

const todeepseek = () =>{
	uni.navigateTo({
		url:'/pages/index/deepseek'
	})
}

const expertlist = ref()
const getExpertTest = () =>{
	uni.request({
		url:'http://127.0.0.1:3006/expert/getExpert',
		success(res) {
			console.log(res)
			expertlist.value = res.data.data
		},
		fail(err){
			console.log(err)
		}
	})
}

const longitude = ref()
const latitude = ref()
const markers = ref([
			    {
			        id: 1,  // 标记点id
			        latitude: latitude,  // 纬度
			        longitude: longitude,  // 经度
			        title: '我的位置',  // 标记点标题
			        iconPath:'/static/位置.png',  // 标记点图标
			        width: 30,  // 图标宽度
			        height: 30,  // 图标高度
			        callout: {  // 气泡
			            content: '我的位置',  // 气泡内容
			            color: '#000000',  // 文字颜色
			            fontSize: 14,  // 文字大小
			            borderRadius: 8,  // 气泡圆角
			            bgColor: '#ffffff',  // 气泡背景色
			            padding: 10,  // 气泡内边距
			            display: 'ALWAYS'  // 气泡显示方式
			        }
			    }
			])
 const getLocation = () =>{
	 uni.getLocation({
	 	type: 'wgs84',
	 	success: function (res) {
	 		console.log('当前位置的经度：' + res.longitude);
	 		console.log('当前位置的纬度：' + res.latitude);
			longitude.value = res.longitude
			latitude.value = res.latitude
	 	},
		fail:function(err){
			console.log(err)
		}
	 });
 }

 // 天气数据
const weatherData = ref({
	    temperature: '--',
	    description: '加载中...',
	    humidity: '--',
	    windSpeed: '--',
	    city: '定位中...'
	})

const weatherEmoji = ref('')

// 根据天气描述获取对应emoji
const getWeatherEmoji = (desc) => {
	    if (!desc) return '☀️'
	    const descLower = desc.toLowerCase()
	    if (descLower.includes('晴')) return '☀️'
	    if (descLower.includes('多云')) return '⛅'
	    if (descLower.includes('阴')) return '☁️'
	    if (descLower.includes('雨')) return '🌧️'
	    if (descLower.includes('雪')) return '❄️'
	    if (descLower.includes('雷')) return '⛈️'
	    return '🌤️'
	}

// 获取天气数据
const getWeather = () => {
	    // 使用高德地图API获取天气（需要注册获取key）
	    // 这里使用模拟数据，实际使用时需要申请API key
	    const mockWeather = {
	        temperature: '26',
	        description: '晴转多云',
	        humidity: '65',
	        windSpeed: '微风',
	        city: '大连市'
	    }
	    weatherData.value = mockWeather
	    weatherEmoji.value = getWeatherEmoji(mockWeather.description)

	    // 实际使用时，取消注释下面的代码并配置你的API key
	
	    uni.request({
	        url: `https://restapi.amap.com/v3/weather/weatherInfo?city=110000&key=YOUR_API_KEY`,
	        success: (res) => {
	            if (res.data && res.data.lives && res.data.lives.length > 0) {
	                const weather = res.data.lives[0]
	                weatherData.value = {
	                    temperature: weather.temperature,
	                    description: weather.weather,
	                    humidity: weather.humidity,
	                    windSpeed: weather.windpower,
	                    city: weather.city
	                }
	                weatherEmoji.value = getWeatherEmoji(weather.weather)
	            }
	        },
	        fail: () => {
	            // 使用模拟数据
	            const mockWeather = {
	                temperature: '26',
	                description: '晴转多云',
	                humidity: '65',
	                windSpeed: '微风',
	                city: '大连市'
	            }
	            weatherData.value = mockWeather
	            weatherEmoji.value = getWeatherEmoji(mockWeather.description)
	        }
	    })
	}

const refreshWeather = () => {
    uni.navigateTo({
        url: '/pages/weather/weatherDetail'
    })
}
 onMounted(()=>{
	 getLocation()
	 getExpertTest()
	 getWeather()
 })


</script>

<style scoped lang="scss">
	.app{
		width:100vw;
		height: 100%;
		background-color: #f5f5f5;
	}
	.banner{
		margin:0 10px;
		padding: 10px 0 ;
	}
	.functions{
		display: flex;
		justify-content: space-around;
	}
	.functions__item{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.functions__item-image{
		width: 70px;
		height: 70px;
	}
	.expert{
		display: flex;
		flex-direction: column;
		padding: 0 15px;
		gap: 12px;
	}
	.expert__item{
		background-color: white;
		border-radius: 16px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
		overflow: hidden;
	}
	.expert__content{
		display: flex;
		padding: 16px;
		gap: 12px;
	}
	.expert__avatar{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		overflow: hidden;
		flex-shrink: 0;
		
		image {
			width: 100%;
			height: 100%;
		}
	}
	.expert__info{
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.expert__header{
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.expert__name{
		font-size: 16px;
		font-weight: 600;
		color: #333;
	}
	.expert__title{
		font-size: 13px;
		color: #666;
	}
	.expert__tags{
		display: flex;
		gap: 6px;
	}
	.expert__tag{
		font-size: 11px;
		padding: 3px 10px;
		background-color: #f0f9f0;
		color: #3d6b3c;
		border-radius: 10px;
	}
	.expert__description{
		font-size: 13px;
		color: #666;
		line-height: 1.4;
		position: relative;
		padding-left: 16px;
	}
	.expert__quote{
		position: absolute;
		left: 0;
		top: 0;
		font-size: 20px;
		color: #e0e0e0;
		line-height: 1;
	}
	.expert__footer{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 4px;
	}
	.expert__rating{
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.expert__rating text{
		font-size: 13px;
		color: #666;
	}
	.expert__score{
		font-size: 16px;
		font-weight: 600;
		color: #ff6b6b;
	}
	.expert__consult{
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 6px 16px;
		background-color: #e9f5e9;
		color: #3d6b3c;
		border-radius: 16px;
		font-size: 13px;
		font-weight: 500;
	}
	.expert__consult up-icon{
		font-size: 14px;
	}
	.area3__item{
		width:50vw;
		height: 200px;
		background-color: white;
		border-radius: 20px;
		margin:0 auto;
	}
	.area3{
		display: flex;
		gap:10px;
		margin:10px;
		
	}
	.weather-card{
		width:100vw;
		height: 150px;
		background: linear-gradient(135deg, #4a90d9 0%, #67b26f 100%);
		border-radius: 20px;
		padding: 15px;
		box-sizing: border-box;
		display: flex;
		color: white;
	}
	.weather-left{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.weather-main{
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.weather-icon{
		display: flex;
		align-items: center;
	}
	.weather-emoji{
		font-size: 50px;
	}
	.weather-info{
		display: flex;
		flex-direction: column;
	}
	.weather-temp{
		font-size: 36px;
		font-weight: 700;
		line-height: 1;
	}
	.weather-desc{
		font-size: 14px;
		opacity: 0.9;
	}
	.weather-detail{
		display: flex;
		gap: 15px;
		font-size: 12px;
	}
	.detail-item{
		background: rgba(255,255,255,0.2);
		padding: 4px 10px;
		border-radius: 10px;
	}
	.weather-right{
		width: 100px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
		text-align: right;
	}
	.weather-city{
		font-size: 14px;
		font-weight: 500;
	}
	.weather-tips{
		font-size: 10px;
		opacity: 0.7;
	}
	.blueberry-tag{
		font-size: 11px;
		background: rgba(255,255,255,0.25);
		padding: 4px 10px;
		border-radius: 10px;
	}
	
</style>
