<template>
	<view class="page">

		<view class="text1">
			<view>请选择您的身份</view>
		</view>

		<view class="full-width-button top1" @tap="toEdit(1)">


			<image class="button-image" src='https://jfzp.ykfly.com/jfht/icon/me1.png' mode="aspectFit"></image>
			<text class="button-text">个人</text>

		</view>

		<view class="full-width-button" @tap="toEdit(3)">

			<image class="button-image" src="https://jfzp.ykfly.com/jfht/icon/campus1.png" mode="aspectFit"></image>
			<text class="button-text">学校</text>

		</view>

		<view class="full-width-button" @tap="toEdit(2)">

			<image class="button-image1" src='https://jfzp.ykfly.com/jfht/icon/qiye.png' mode="aspectFit"></image>
			<text class="button-text">企业</text>

		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				token:'',
				id:''
			};
		},
		onLoad(query) {
			this.id = query.id,
			this.token = query.token
		},
		methods: {
			toEdit(type){
				uni.request({
					url: this.reqUrl + '/member/edit',
					method:'PUT',
					header:{
						"Authorization": this.token
					},
					data:{
						id:this.id,
						type: type
					},
					success: (res) => {
						console.log("选择登录身份",res)
						if(res.data.code===200){
							uni.setStorageSync("type",type)
							uni.reLaunch({
								url:'/pages/index/index'
							})
						}
					}
				})
			}
		}
	};
</script>

<style>
	.page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
		/* background-image: url('@/static/auth.png');
		background-size: cover;
		background-repeat: no-repeat;
		background-attachment: fixed; */
		background: linear-gradient(178deg, rgba(56, 189, 248, 0.98) 0%, rgba(199, 236, 254, 0.98) 100%);

	}

	.full-width-button {
		width: 80%;
		height: 10vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		/* 按钮背景颜色 */
		color: gray;
		font-size: 24px;
		/* 文字颜色 */
		padding: 10px;
		/* 调整内边距 */
		/* margin: 0 auto; */
		margin-top: 10%;
		border-radius: 10px;
		box-shadow: 0 4px 4px 2px rgba(0, 0, 0, 0.1);
	}



	.button-image {
		width: 16vw;
		/* 调整图片宽度 */
		height: 16vw;
		/* 调整图片高度 */
		margin-right: 10px;
		/* 图片和文字之间的间距 */
	}
	
	.button-image1{
		width: 20vw;
		/* 调整图片宽度 */
		height: 20vw;
		/* 调整图片高度 */
		margin-right: 10px;
		/* 图片和文字之间的间距 */
	}


	.authIcon {
		width: 20px;
		height: 20px;
	}

	.icon {
		/* 这里可以添加图标样式，例如字体图标或SVG图标 */
		color: #ffffff;
		margin-bottom: 6%;
		/* 图标颜色 */
	}

	.top {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* margin-top: 10%; */
		background-color: transparent;
	}

	.top1 {
		margin-top: 3%;
	}

	.text1 {
		width: 80%;
		color: #ffffff;
		/* 文字颜色 */
		padding: 10%;
		/* 调整内边距 */
		margin: 0 auto;
		border-radius: 3px;
		font-size: 30px;
	}

	.back {
		width: 100%;
		margin-top: 15%;
	}

	.icon {
		color: #777;
		margin-top: 10%;
		margin-left: 2%;
	}
</style>