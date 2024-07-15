<template>
	<view class="page">
		<!-- 头像信息 -->
		<view class="userInfo-row">
			<view>
				<image v-if="user.headPic" class="head" :src="user.headPic"></image>
				<image v-if="!user.headPic" class="head" :src="headPic"></image>
			</view>
			<view class="userInfo-column">
				<view class="username" v-if="user.name" @tap="toSetting()">{{user.name}}</view>
				<view v-if="type===1" class="info" @tap="toOnlineResumePage()">在线简历>>></view>
				<!-- <view v-if="type===2" class="info" @tap="toMoreInfoPage()">我的资料>>></view> -->
			</view>

		</view>

		<!-- 卡片 -->
		<view class="card1">
			<view class="shenfen">
				<view>
					<image class="img" src="../../static/icon_cb/auth_icon1.png"></image>
				</view>
				<view class="shuxing" v-if="type===1">个人用户</view>
				<view class="shuxing" v-if="type===2">企业用户</view>
				<view class="shuxing" v-if="type===3">学校用户</view>
				<button class="btn" v-if="type===1" hover-class="btn1" @tap="toMySpace()">个人主页 ></button>
				<button class="btn" v-if="type===2" hover-class="btn1" @tap="toMySpace()">公司主页 ></button>
				<button class="btn" v-if="type===3" hover-class="btn1" @tap="toMySpace()">学校主页 ></button>
			</view>
		</view>

		<!-- 按钮 -->
		<view class="uni-row-text">
			<uni-row>
				<uni-col :span="8">
					<view class="button-item" @tap="toChattedPage()">
						<text>{{schools}}</text>
						<text class="text">沟通过</text>
					</view>
				</uni-col>
				<uni-col v-if="type === 1" :span="8" >
					<view class="button-item" @tap="toSendjobPage()">
						<text>{{likes}}</text>
						<text class="text">已投简历</text>
					</view>
				</uni-col>
				<uni-col v-if="type === 2 || type === 3" :span="8" >
					<view class="button-item" @tap="toSendjobPage()">
						<text>{{likes}}</text>
						<text class="text">收到投递</text>
					</view>
				</uni-col>
				<uni-col :span="8">
					<view class="button-item" @tap="toCollectPage()">
						<text>{{favorites}}</text>
						<text class="text">收藏</text>
					</view>
				</uni-col>
			</uni-row>
		</view>


		<!-- 卡片 -->
		<view class="button-container1">
			<uni-row>
				<uni-col :span="24">
					<view class="card-title">
						常用功能
					</view>
				</uni-col>
			</uni-row>
			<view class="menu-row1">
				<!-- ------------------用户---------------------- -->
				<uni-row v-if="type===1">
					<uni-col :span="6">
						<view class="button-item" @tap="toAuth()">
							<image src="../../static/icon_cb/auth.png" class="icon"></image>
							<button class="button">身份认证</button>
						</view>
					</uni-col>

					<uni-col :span="6">
						<view class="button-item" @tap="toOnlineResumePage()">
							<image src="../../static/icon_cb/ht.png" class="icon"></image>
							<button class="button">在线简历</button>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="button-item" @tap="toResumePage()">
							<image src="https://jfzp.ykfly.com/jfht/icon/离线简历.png" class="icon"></image>
							<button class="button">离线简历</button>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="button-item" @tap="toJobNeedPage()">
							<image src="https://jfzp.ykfly.com/jfht/icon/求职.png" class="icon"></image>
							<button class="button">求职意向</button>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="button-item" @tap="toMySpace()">
							<image src="https://jfzp.ykfly.com/jfht/icon/个人空间.png" class="icon"></image>
							<button class="button">个人空间</button>
						</view>
					</uni-col>

				</uni-row>
				<!-- 企业 -->
				<uni-row v-if="type===2">
					<uni-col :span="6">
						<view class="button-item" @tap="toAuth()">
							<image src="../../static/icon_cb/auth.png" class="icon"></image>
							<button class="button">身份认证</button>
						</view>
					</uni-col>

					<uni-col :span="6">
						<view class="button-item" @tap="toInvitesPage()">
							<image src="../../static/icon_cb/ht.png" class="icon"></image>
							<button class="button">招聘数据</button>
						</view>
					</uni-col>

					<!-- <uni-col :span="6">
						<view class="button-item" @tap="toSendjobPage()">
							<image src="../../static/icon_cb/send.png" class="icon"></image>
							<button class="button">岗位发布</button>
						</view>
					</uni-col> -->
				
					
					<uni-col :span="6">
						<view class="button-item" @tap="toMySpace()">
							<image src="https://jfzp.ykfly.com/jfht/icon/个人空间.png" class="icon"></image>
							<button class="button">个人空间</button>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="button-item" @tap="toMoreInfoPage()">
							<image src="../../static/icon_cb/send.png" class="icon"></image>
							<button class="button">我的资料</button>
						</view>
					</uni-col>
				</uni-row>
				<!-- 学校 -->
				<uni-row v-if="type===3">
					<uni-col :span="6">
						<view class="button-item" @tap="toAuth()">
							<image src="../../static/icon_cb/auth.png" class="icon"></image>
							<button class="button">身份认证</button>
						</view>
					</uni-col>

					<uni-col :span="6">
						<view class="button-item" @tap="toInvitesPage()">
							<image src="https://jfzp.ykfly.com/jfht/icon/求职.png" class="icon"></image>
							<button class="button">岗位发布</button>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="button-item" @tap="toMySpace()">
							<image src="https://jfzp.ykfly.com/jfht/icon/个人空间.png" class="icon"></image>
							<button class="button">个人空间</button>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="button-item" @tap="toMoreInfoPage()">
							<image src="../../static/icon_cb/send.png" class="icon"></image>
							<button class="button">我的资料</button>
						</view>
					</uni-col>
				</uni-row>
			</view>

		</view>


		<view class="button-container1">
			<uni-row>
				<uni-col :span="24">
					<view class="card-title">
						常用工具
					</view>
				</uni-col>
			</uni-row>
			<view class="menu-row2">
				<uni-row>
					<uni-col :span="6">
						<view class="button-item">
							<image src="../../static/icon_cb/fankui.png" class="icon"></image>
							<button class="button" open-type="feedback">问题反馈</button>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="button-item">
							<image src="../../static/icon_cb/kefu.png" class="icon"></image>
							<button class="button" open-type="contact">在线客服</button>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="button-item" @tap='toDefend()'>
							<image src="../../static/icon_cb/wq.png" class="icon"></image>
							<button class="button" >维权</button>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="button-item" @tap="toSetting()">
							<image src="../../static/icon_cb/setting.png" class="icon"></image>
							<button class="button">设置</button>
						</view>
					</uni-col>
					<uni-col :span="6">
						<view class="button-item" @tap="toAbout()">
							<image src="https://jfzp.ykfly.com/jfht/icon/关于.png" class="icon"></image>
							<button class="button">关于</button>
						</view>
					</uni-col>
				</uni-row>
			</view>
		</view>

		<view class="companyInfo">
			<view style="display: flex; flex-direction: row;">
				<p @tap="callPhone('0917-3652000')">客服电话：0917-3652000</p>
				<p style="margin-left: 2vw;">工作时间：8:30-17:30</p>
			</view>
			<view style="display: flex; flex-direction: row; margin: 0.5vh 0;">
				<p @click="toImagePage(1)">营业执照</p>
				<p style="margin: 0 2vw;">|</p>
				<p @click="toImagePage(2)">人力资源许可证</p>
			</view>
			<view style="display: flex; flex-direction: row; margin-bottom: 10vh;">
				<p @tap="callPhone('029-81166927')">雁塔区人社局电话：029-81166927</p>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: '',
				user: {
					mobile: '',
					name: null,
					type: '',
					headPic: "../../static/user.png"
				},
				headPic: "../../static/user.png",
				userType: '',
				isAuth: '',
				fans: 0,
				likes: 0,
				schools: 0,
				favorites: 0,
				onpageshow: true,
				type: 0
			}
		},

		// onLoad() {
		// 	this.token = uni.getStorageSync("token")
		// 	this.type = uni.getStorageSync('type')
		// 	this.getUserInfo()
		// 	this.getUserOtherInfo()
		// },

		onShow() {
			this.token = uni.getStorageSync("token")
			this.type = uni.getStorageSync('type')
			this.getUserInfo()
			
		},
	
		methods: {
			preventTouchMove(event) {
				// 阻止 touchmove 事件的传递
				event.preventDefault();
			},
			callPhone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			toImagePage(type) {
				uni.navigateTo({
					url: '/pages/app/license?type=' + type
				})
			},
			toJobNeedPage() {
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/jobNeedList'
				})
			},
			toChattedPage(){
				uni.navigateTo({
					url: '/pages_my/my/chatted'
				})
			},
			
			getLocation(){
				console.log("获取地址")
				uni.getLocation({
					type: 'wgs84',
					success: function (res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				});
			},
			getUserInfo() {
				const token = uni.getStorageSync("token")
				const userId = uni.getStorageSync("userId")
				uni.request({
					url: this.reqUrl + "/userInfo",
					// url: this.reqUrl + "/member/"+ userId,
					method: 'GET',
					header: {
						'Authorization': token
					},
					success: (req) => {
						console.log("userInfo1", req)
						if (req.data.code === 200) {
							this.getUserOtherInfo()
							this.user = req.data.data
							this.userType = req.data.data.type
							this.isAuth = req.data.data.isExamine
							uni.setStorageSync("userId", req.data.data.id)
							if(req.data.data.type === 0){
								uni.navigateTo({
									url:'/pages/index/identitySelect/identitySelect?id='+userId + "&token=" + token
								})
							}
						} else if (req.data.code === 401) {
							uni.showToast({
								title: "Token已过期,请重新登陆",
								icon: "none"
							})
							uni.removeStorageSync("token")
						}

					}
				})

			},
			getUserOtherInfo() {
				const token = uni.getStorageSync("token")
				const userId = uni.getStorageSync("userId")
				uni.request({
					url: this.reqUrl + "/member/" + userId,
					method: 'GET',
					header: {
						'Authorization': token
					},
					success: (req) => {
						console.log("userInfo2", req)
						if (req.data.code === 200) {
							console.log("111", req.data.data)
							this.likes = req.data.data.likes
							this.schools = req.data.data.schools
							this.favorites = req.data.data.favorites
						}
					}
				})

			},


			toConcerned() {
				uni.navigateTo({
					url: '/pages_my/my/concerned'
				})
			},
			toAbout() {
				uni.navigateTo({
					url: "/pages/index/about/about"
				})
			},
			toDefend(){
				uni.navigateTo({
					url: "/pages_my/my/defend"
				})
			},
			toMoreInfoPage() {
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/moreInfo/moreInfo'
				})
			},
			toMsgPage() {
				uni.navigateTo({
					url: "/pages/message/message"
				})
			},
			toLogin() {
				uni.redirectTo({
					url: '/pages_login/login/wxLogin'
				})
			},
			toInvitesPage() {
				if(this.isAuth !== 2){
					uni.showToast({
						title:"请先进行身份认证！",
						icon:'none'
					})
					return false
				}
				uni.navigateTo({
					url: '/pages/company/invites/invites'
				})
			},
			toOnlineResumePage() {
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/onlineResume'
				})
			},
			toAuth() {
				if(this.isAuth === 2){
					uni.showToast({
						title:"您已完成认证！",
						icon:'none'
					})
					return false
				}
				if (this.isAuth != 2) {
					if (this.type === 1) {
						uni.navigateTo({
							url: '/pages/auth/authPerson'
						})
					} else if (this.type === 2) {
						uni.navigateTo({
							url: '/pages/auth/authCompany'
						})
					} else if (this.type === 3) {
						uni.navigateTo({
							url: '/pages/auth/authSchool'
						})
					}
				} else {
					uni.showToast({
						title: '已通过认证，无需再次认证。',
						icon: 'none'
					})
				}

			},
			toMySpace() {
				uni.navigateTo({
					url: '/pages_my/my/mySpace?userId=' + this.user.id
				})
			},
			toUserInfo() {
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/userInfo'
				})
			},
			toCollectPage() {
				uni.navigateTo({
					url: '/pages/collect/collection'
				})
			},
			toSendjobPage() {
				uni.navigateTo({
					url: '/pages_my/my/mySendJob'
				})
			},
			toContractPage() {
				uni.navigateTo({
					url: '/pages_my/my/myContract'
				})
			},
			toAddNewsPage() {
				uni.navigateTo({
					url: '/pages/news/newsAdd'
				})
			},
			toResumes() {
				uni.navigateTo({
					url: '/pages_my/my/getResumes'
				})
			},
			toJobAddPage() {
				uni.navigateTo({
					url: '/pages_my/my/JobList'
				})
			},
			toSetting() {
				uni.navigateTo({
					url: '/pages/setting/setting'
				})
			},
			toResumePage() {
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/resume'
				})
			},
			toUserInfo() {
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/userInfo'
				})
			},
			loginOut() {
				uni.showModal({
					title: '提示',
					content: '确定退出登录？',
					showCancel: true,
					confirmText: '退出',
					success: (res) => {
						if (res.confirm) {
							// 用户点击确定，跳转到登录页面
							uni.request({
								url: this.reqUrl + "/logout",
								header: {
									"Authorization": this.token
								},
								success: (res) => {

									uni.redirectTo({
										url: '/pages/index/index'
									})
									this.cleanCaches()
								}
							})
						}
					}
				})

			},
			cleanCaches() {
				uni.removeStorage({
					key: "user",
					success: (res) => {
						console.log("user清除成功", res)
					},
					fail: (res) => {
						console.log("user清除失败", res)
					}
				})
				uni.removeStorage({
					key: "token",
					success: (res) => {
						console.log("token清除成功", res)
					},
					fail: (res) => {
						console.log("token清除失败", res)
					}
				})

			},

		}
	}
</script>

<style>
	.page {
		padding: 24% 2% 0 2%;
	}

	.userInfo-row {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.userInfo-column {
		display: flex;
		flex-direction: column;
		margin-left: 5%;
	}

	.head {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}

	.info {
		font-size: 12px;
		color: gray;
		margin-top: 5%;
	}

	.img {
		width: 15px;
		height: 15px;
	}

	.icon {
		width: 25px;
		height: 25px;
	}

	.text {
		font-size: 12px;
		color: gray;
		margin-top: 5px;
	}

	.card-title {
		margin: 0.1% 0 4% 4%;
		font-size: 30rpx;
	}

	.menu-row1 {
		margin-top: 3%;
	}

	.menu-row2 {
		margin-top: 4%;
	}

	.uni-row-text {
		margin-top: 5%;
	}

	.button-container1 {
		background-color: white;
		border-radius: 10px;
		padding: 3% 0;
		margin-top: 5%;
	}

	.button-item {
		display: flex;
		align-items: center;
		justify-items: center;
		flex-direction: column;
		margin-bottom: 1vh;
	}

	.card1 {
		background-color: #F5F5F5;
		border-radius: 10px 10px 0 0;
		border-bottom-left-radius: 50% 15%;
		border-bottom-right-radius: 50% 15%;
		background-image: url('https://jfzp.ykfly.com/jfht/app/card1.jpg');
		/* 替换为实际背景图片的 URL */
		background-size: 100% 100%;
		/* 设置背景图片的填充方式，可根据需求调整为 contain、fill、auto 等 */
		background-position: center;
		/* 设置背景图片的位置，可根据需求调整 */
		padding: 2%;
		margin-top: 5%;
	}

	.shuxing {
		width: 100px;
	}

	.shenfen {
		display: flex;
		flex-direction: row;
		margin-bottom: 25px;
		align-items: center;
		color: white;
		font-size: 14px;
	}

	.btn {
		appearance: none;
		background: none;
		border: none;
		margin: 0;
		padding: 0;
		font: inherit;
		color: white;
		cursor: pointer;
		outline: none;
		/* display: flex; */
		/* justify-content: flex-end; */
		position: absolute;
		right: 5%;
		width: 20%;
	}

	.btn1 {
		appearance: none;
		border: none;
		margin: 0;
		padding: 0;
		color: lightgray;
		outline: none;
	}

	.button {
		border: none;
		width: 100%;
		height: 100%;
		text-align: left;
		margin: 0;
		font-size: 12px;
		color: gray;
		/* text-indent: 8%; */
		background: white;
		line-height: 3;
		text-align: center;
	}


	button::after {
		appearance: none;
		background: none;
		border: none;
		margin: 0;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: none;
		font-size: 12px;
		color: gray;
	}

	.list {
		display: flex;
		/* align-items: center; */
		justify-content: center;
		flex-direction: column;
		margin-top: 2%;
	}

	.item {
		height: 90rpx;
		background: white;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #F4F4F5;
		font-size: 30rpx;
	}

	.right-icon {
		position: absolute;
		right: 15px;
	}

	.left-icon {
		position: absolute;
		left: 15px;
	}

	.companyInfo {
		font-size: 12px;
		color: grey;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 2vh;
	}
</style>