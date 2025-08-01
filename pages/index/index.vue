<template>
	<NavBar></NavBar>
	
	<view class="app">
	<view class="banner">
		<image class="banner__image" src="/static/banner.png" mode="widthFix"  @click="todeepseek"></image>
	</view>
	
	<view class="functions">
		<view class="functions__item" @click="toVariety">
			<view><image class="functions__item-image"src="/static/植物.png" mode="widthFix"></image></view>
			<view>品种</view>
		</view>
		<view class="functions__item">
			<view><image class="functions__item-image"src="/static/病虫害on.png" mode="widthFix"></image></view>
			<view>病虫害</view>
		</view>
		<view class="functions__item">
			<view><image class="functions__item-image"src="/static/播种.png" mode="widthFix"></image></view>
			<view>栽培技巧</view>
		</view>
		<view class="functions__item">
			<view><image class="functions__item-image"src="/static/植物.png" mode="widthFix"></image></view>
			<view>品种</view>
		</view>
	</view>
	
	<view class="area3">
	    <view class="area3__item">天气</view>
	    <view class="area3__item">
	    	<map style="width: 50vw; height: 200px;borderRadius: 25px;" 
	    			:latitude="latitude" 
	    			:longitude="longitude" 
	    			:show-scale="false"
	    			:markers="markers"
	    	>
	    	</map>
	    </view>
	</view>
	
	<Title title="询问专家" @more="goToMore"></Title>

	<view class="expert">
		<view class="expert__item" v-for="item in expertlist" @click="toexpertDetail(item)">
			<view class="expert__item-1">
				<view>
					<image class="expert__item-1-image" :src="item.avatar" style="width:75px;height: 75px;border-radius: 50%;"></image>
				</view>
				<view class="expert__item-1-2">
					<span style="font-size: 20px;font-weight: 600;">{{item.expertName}}</span>
					<span >{{item.major}}</span>
					<span style="color:aquamarine">{{item.degree}}</span>
				</view>
			</view>
			<view class="expert__item-2">
				<p style="font-weight: 500;color:#666"><span style="font-size: 18px;font-weight: 600;color:#2E5A88">擅长：</span>{{item.speciality}}</p>
			</view>
		</view>
	</view>
	</view>
	
	
</template>

<script setup>
	import NavBar from '../../component/navBar.vue';
	import Title from '@/component/title.vue'
	import { ref,onMounted } from 'vue';
	import { getExpertAPI } from '../../api/api';

//跳转到品种页
const toVariety = () =>{
	uni.navigateTo({
		url:'/pages/index/banner/Variety'
	})
}

const toexpertDetail = (item) =>{
	uni.navigateTo({
		url:`/pages/index/expertList/expertDetail?id=${item.id}`
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
			        iconPath:'../../static/位置.png',  // 标记点图标
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
 onMounted(()=>{
	 getLocation()
	 getExpertTest()
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
	.banner__image{
		width: 100%;
		border-radius: 25px;
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
	}
	.expert__item{
		width: 95vw;
		height: 125px;
		margin: 10px;
		padding: 10px;
		background-color: white;
		border-radius: 25px;
	}
	.expert__item-1-image{
		width: 70px;
		height: 70px;
	}
	.expert__item-1{
		display: flex;
		align-items: center;
		gap:10px;
	}
	.expert__item-1-2{
		display: flex;
		align-items: center;
		gap:10px;
	}
	.area3__item{
		width:50vw;
		height: 200px;
		background-color: white;
		border-radius: 25px;
		margin:0 auto;
	}
	.area3{
		display: flex;
		gap:10px;
		margin:10px;
		
	}
	
</style>
