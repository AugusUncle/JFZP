<template>
	<view class="page">

		<page-back></page-back>
		<view class="head-view">
			<image class="head" :src="userData.headPic"></image>
		</view>

		<view class="box">
			<view class="box-1">
				<view class="name-text">昵称</view>
				<view class="name-info">{{userData.name}}</view>
			</view>
			<view class="line"></view>
			<view class="box-1">
				<view class="name-text">性别</view>
				<view class="name-info">{{userData.gender===0 ? '男' :(userData.gender===1 ? '女' : '未知')}}</view>
			</view>
			<view class="line"></view>
			<view class="box-1">
				<view class="name-text">个性签名</view>
				<view class="name-info">{{userData.personSign ===null ? "未设置" : userData.personSign}}</view>
			</view>
			<view class="line"></view>
			<view class="box-1">
				<view class="name-text">注册日期</view>
				<view class="name-info" v-if="userData.gmtCreate" >{{userData.gmtCreate.substring(0,10)}}</view>
			</view>
			
		</view>

		<view class="box1">
			
			<view class="box-1">
				<view class="name-text">类型</view>
				<view class="name-info">{{userData.type===0 ? '游客' :(userData.type===1 ? '普通用户' : (userData.type===2 ? '企业' : '院校'))}}</view>
			</view>
			<view class="line"></view>
			<view class="box-1">
				<view class="name-text">简介</view>
				<view class="name-info">{{userData.introduction ===null ? "未设置" :userData.introduction}}</view>
			</view>
			<view class="line"></view>
			<view class="box-1">
				<view class="name-text">相册</view>
				<view class="name-info"></view>
		
			</view>
			<view style="margin-top: 20rpx;">
				<scroll-view class="scroll-view" scroll-x="true">
					<view class="scroll-view-item" v-for="(pic,index) in userData.corporateStyles" :key="index" v-if="pic.type ===1">
						<image @click="previewImage(pic)" class="fly" :src="pic.url"></image>
					</view>
				</scroll-view>
			</view>
			<view class="line"></view>
			
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: "",
				userData: {}
			}
		},
		onLoad(query) {
			this.token = uni.getStorageSync("token")
			console.log("userId", query.userId)
			let userId = query.userId
			this.getUserInfo(userId)
			
		},
		methods: {
			getUserInfo(userId) {
				uni.request({
					url: this.reqUrl + "/member/userInfo/"+ userId,
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("根据ID查询用户", res)
						if(res.data.code === 200){
							this.userData = res.data.data
						}else{
							uni.showToast({
								title:res.data.message,
								icon:"fail"
							})
						}
						
					},
					fail: (res) => {
						uni.showToast({
							title:res.data.message,
							icon:"fail"
						})
					}
				})
			},
			previewImage(pic) {
				const urls = this.userData.corporateStyles.map(p => p.url);
				uni.previewImage({
					current: pic.url,
					urls: urls
				});
			},
			
			jiequ(str){
				let item = str.substring(0,10)
				return item;
			}
		}
	}
</script>

<style>
	.page {
		padding: 2%;
		background-image: url('https://jfzp.ykfly.com/jfht/app/gsbg.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}

	.head-view {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 25%;
	}

	.head-view image {
		width: 80px;
		height: 80px;
		border-radius: 50%;
	}

	.box {
		display: flex;
		flex-direction: column;
		margin-top: 10%;
		background-color: white;
		border-radius: 10px;
		padding: 4%;
	}

	.box-1 {
		display: flex;
		flex-direction: row;
		align-items: center;

	}
	.box-2 {
		display: flex;
		flex-direction: column;
		align-items: center;
	
	}

	.name-text {
		width: 50%;
	}

	.name-info {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		color: gray;
		font-size: 14px;
	}

	.line {
		width: 100%;
		margin: 18px 0 18px 0;
		/* 设置横线的宽度为100% */
		border-bottom: 1px solid #ECEFF1;
		/* 设置横线的颜色和样式 */
	}

	.box1 {
		display: flex;
		flex-direction: column;
		margin-top: 4%;
		background-color: white;
		border-radius: 10px;
		padding: 4%;
	}
	.fly {
		width: 300rpx;
		height: 200rpx;
		border-radius: 5px;
		
	
	}
	.scroll-view {
		white-space: nowrap;
		width: 100%;
	}
	
	.scroll-view-item {
		display: inline-block;
		width: 45%;
		height: 200rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
		margin-left: 16rpx;
	}
</style>