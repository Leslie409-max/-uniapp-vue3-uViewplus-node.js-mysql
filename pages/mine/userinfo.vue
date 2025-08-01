<template>
	<view>
		<up-cell-group>
			<up-cell  title="头像" :isLink="true" arrow-direction="right">
				<template #right-icon>
					<image :src="userinfo.avatar" style="width:50px;height: 50px;border-radius: 50%;"></image>
				</template>
			</up-cell>
			<up-cell  title="用户名" :isLink="true" arrow-direction="right" :value="userinfo.username">
			</up-cell>
			<up-cell  title="昵称" :isLink="true" arrow-direction="right" :value="userinfo.nickname">
			</up-cell>
		</up-cell-group>
	</view>
	<view>
	</view>
</template>

<script setup>
	import NavBar from '@/component/navBar.vue'
	import { userUserStore } from '../../store/userStore'
	const userStore = userUserStore()
		
	const userinfo = userStore.userInfo || {}
	
</script>

<style>
	       
</style>
