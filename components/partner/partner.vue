<template>
	<view class="box">
		<view class="text">
			<text class="znews">合作伙伴</text>
			<!-- <text class="more" @tap="toPartnerListPage()">更多 ></text> -->
		</view>
		<view class="box1">
			<view class="minibox">
				<image class="img" @tap="" src="https://jfzp.ykfly.com/jfht/app/dajiang.jpg"></image>
				<web-view v-if="showWebView" :src="dajiang" @message="onMessage"></web-view>
			</view>
			<view class="minibox">
				<image class="img1" @tap="" src="https://jfzp.ykfly.com/jfht/app/logo_jfht.jpg"></image>
				<web-view v-if="showWebView1" :src="jidian" @message="onMessage"></web-view>
			</view>
			<!-- <view class="minibox"><image class="img" src="http://admin.ykfly.com/jfht/dajiang.jpg"></image></view> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: "partner",
		data() {
			return {
				showWebView: false,
				showWebView1: false,
				jidian: 'https://www.example.com',
				dajiang: 'https://www.example.com'
			};
		},
		methods: {
			navigateToWebsite() {
				this.showWebView = true
			},
			navigateToWebsite1() {
				this.showWebView1 = true
			},
			toPartnerListPage(){
				uni.navigateTo({
					url:"/pages/company/PartnerList/PartnerList"
				})
			}
		}

	}
</script>

<style>
	.box {
		display: flex;
		/* 纵向布局 */
		flex-direction: column;
		background-color: white;
		width: 96%;
		margin: 15px 2px 0 8px;
		height: auto;
		border-radius: 10px 10px 10px 10px;
	}

	.box1 {
		display: flex;
		flex-direction: row;
	}

	.minibox {
		background-color: white;
		width: 50%;
		height: 60px;
		text-align: center;
		margin: 10px;
		border-radius: 5px 5px 5px 5px;
		box-shadow: #FAFAF9 2px 2px 2px 2px;
	}

	.text {
		display: flex;
		width: 100%;
		margin: 10px 0px 10px 0px;
	}

	.znews {
		margin: 10px 5px 5px 20px;
		font-weight: 500;
	}

	.img {
		width: 100px;
		height: 40px;
		margin-top: 10px;
	}
	.more {
		margin-left: 60%;
		color: #9E9E9E;
		font-size: small;
	}

	.img1 {
		width: 40px;
		height: 40px;
		margin-top: 10px;
	}
</style>