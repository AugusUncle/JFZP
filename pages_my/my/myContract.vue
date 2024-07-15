<template>
	<view class="page">

		<uni-section title="我的合同" type="line">
			<view v-for="(contract,index) in data" :key="index">
				<view class="box">
					<view class="scroll-view">
						<view>合同名称: </view>
						<view class="text2">【{{contract.contractNo}}】</view>
					</view>
					<view class="scroll-view">
						<view>合同编码: </view>
						<view class="text1">{{contract.contractNo}}</view>
					</view>
					<view class="scroll-view">
						<view>发起方(校): </view>
						<view class="text1">{{contract.enterpriseName}}</view>
					</view>
					<view class="scroll-view">
						<view>发起方: </view>
						<view class="text1">{{contract.enterpriseName}}</view>
					</view>
					<view class="scroll-view">
						<view>有效时间:</view>
						<view class="text1">{{contract.signDate}}-{{contract.endDate}}</view>
						<view class="text3" @tap="download(contract.contractFileUrl)">下载</view>
					</view>
					<view class="line"></view>
				</view>
			</view>

		</uni-section>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				user:'',
				token:''
			}
		},
		onShow() {
			this.getUser()
			this.token = uni.getStorageSync("token")
		},
		methods: {
			getContract() {
				let id = this.userId
				let type = this.user.type
				uni.request({
					url: this.reqUrl + "/contract/list?id=" + id + "&type=" + type,
					method: 'GET',
					query: this.query,
					header: {
						'Authorization': this.token
					},
					success: (res) => {
						console.log("合同列表", res)
						this.data = res.data.data
					}
				})
			},
			getUser(){
				uni.request({
					url: this.reqUrl + "/userInfo",
					method: 'GET',
					header: {
						'Authorization': this.token
					},
					success: (req) => {
						this.user = req.data.data
						this.getContract()
					}
				})
			},
				
			download(url) {
				// uni.showModal({
				// 	title: '提示',
				// 	content: '确定下载此合同？',
				// 	// showCancel: false,
				// 	cancelText: "取消",
				// 	confirmText: '确定',
				// 	success: (res) => {
				// 		if (res.confirm) {
				// 			uni.downloadFile({
				// 				url: url, //仅为示例，并非真实的资源
				// 				success: (res) => {
				// 					if (res.statusCode === 200) {
				// 						console.log('下载成功');
				// 					}
				// 				}
				// 			});
				// 		}
				// 	}
				// })
				// 获取文件系统管理器
				const fs = uni.getFileSystemManager();
				
				// 下载文件到临时路径
				uni.downloadFile({
				  url: url, // 文件的 URL 地址
				  success: function (res) {
				    if (res.statusCode === 200) {
				      // 下载成功，保存文件到本地
				      fs.saveFile({
				        tempFilePath: res.tempFilePath, // 临时文件路径，下载后的文件保存在该路径下
				        success: function (saveRes) {
				          // 文件保存成功后的操作
				          console.log('文件保存成功，保存路径为：', saveRes.savedFilePath);
				        },
				        fail: function (saveErr) {
				          // 文件保存失败时的操作
				          console.log('文件保存失败：', saveErr);
				        }
				      });
				    } else {
				      // 下载失败
				      console.log('下载失败，状态码：', res.statusCode);
				    }
				  },
				  fail: function (err) {
				    // 下载请求失败
				    console.log('下载请求失败：', err);
				  }
				});

			},
		}
	}
</script>

<style>
	.page {
		padding: 2%;
	}

	.section {
		margin-top: 3px;
		font-size: 16px;
	}

	.box {
		padding: 2%;
		background-color: white;

	}

	.scroll-view {
		display: flex;
		flex-direction: row;
		/* margin-top: 1%; */
	}

	.text1 {
		position: absolute;
		left: 25%;

	}

	.text2 {
		position: absolute;
		left: 23%;
	}

	.text3 {
		position: absolute;
		right: 10%;
		color: deepskyblue;
	}

	.line {

		margin: 15px 0 18px 0;
		/* 设置横线的宽度为100% */
		border-bottom: 1px solid #ECEFF1;
		/* 设置横线的颜色和样式 */

	}
</style>