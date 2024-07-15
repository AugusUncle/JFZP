<template>
	<view>
		<view class="back">
			<uni-icons class="icon" type="back" @tap="back()" size="30"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name:"page-back",
		data() {
			return {
				
			};
		},
		methods: {
			back() {
				uni.navigateBack();
			},
		}
	}
</script>

<style>
	
	.icon {
		position: fixed;
		top: 6%;
		left: 4%;
		color: #777;
		z-index: 10;
	}
	

</style>