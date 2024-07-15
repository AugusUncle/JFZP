<template>
	<view class="page">
		<view>
			<image v-if="show1" style="width: 100%; margin-top: 5vh;" mode="aspectFit" src="https://jfzp.ykfly.com/jfht/app/营业执照.jpg"></image>
			<image v-if="show2" style="width: 100%; margin-top: 5vh;" mode="aspectFit" src="https://jfzp.ykfly.com/jfht/app/人力资源.jpg"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show1: false,
				show2: false
			}
		},
		onLoad(query) {
			if(query.type === '1'){
				this.show1 = true
				this.show2 = false
				uni.setNavigationBarTitle({
					title:'营业执照'
				})
			}else if(query.type === '2'){
				this.show1 = false
				this.show2 = true
				uni.setNavigationBarTitle({
					title:'人力资源许可证'
				})
			}
		},
		methods: {

		}
	}
</script>

<style>
	.page {
		background-color: #FFFFFF;
		height: 100vh;
	}
</style>