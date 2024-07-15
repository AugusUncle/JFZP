<template>
	<view class="container background">

		<view class="back">
			<uni-icons class="icon" type="back" @tap="back()" size="30"></uni-icons>
		</view>
		
		<view>
			<image  class="bg_image" src="http://jfzp.ykfly.com/jfht/app/bgbg.jpg" mode="aspectFill">
			</image>
			<view class="">
				<view class="avatar-container">
					<image class="avatar" :src="userInfo.headPic" mode="aspectFill"></image>
				</view>
				<view class="name-container">
					{{userInfo.name}}
				</view>
			</view>
		</view>
		
		
		<view class="padding-info">
			<view class="info-container">
				<view class="info-qm">{{userInfo.personSign ? userInfo.personSign : "还没有个性~签名哦~"  }}</view>
				<view class="info-more" @tap="moreInfo()">更多 ></view>
			</view>
			
			<view v-show="schoolLifeList.length>0" class="box" v-for="(item, index1) in schoolLifeList" :key="index1">
				
				<view  class="content" @tap='toDetailPage(item.id)'>
					{{item.content}}
				</view>
				<view class="grid-container" v-if="item.images">
					<uni-grid :column-num="3">
						<uni-grid-item v-for="(ite, index) in parseImages(item.images)" :key="index">
							<image class="img" :src="ite" mode="aspectFill" @click="big(item.images)"></image>
						</uni-grid-item>
					</uni-grid>
				</view>
			
				<!-- 评论点赞 -->
				<view class="box1 top_1">
					
					<view class=" like box1" @tap='like(item.isGoods,item.id,index1)'>
						<uni-icons v-show="item.isGoods===0" type="hand-up" size="24"></uni-icons>
						<uni-icons v-show="item.isGoods===1" type="hand-up-filled" color="#38BDF8" size="24"></uni-icons>
						<text class="text">{{item.goods}}</text>
					</view>
					<view class=" comment box1" @tap='toDetailPage(item.id)'>
						<u-icon name="chat" size="24"></u-icon>
						<text class="text">{{item.remarks}}</text>
					</view>
					<view v-if="queryUserId === currentUserId" class="share" @tap="deleteInfo(item.id)"><uni-icons type="trash" size="22"
							color="grey"></uni-icons> </view>
				</view>
			</view>
			<view class="empty" v-show="schoolLifeList.length<=0">
				<image src="../../static/icon_cb/kk.png"></image>
				<view >用户很懒，还没有发布内容~</view>
			</view>
		</view>

		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				schoolLifeList: [],
				userInfo: {},
				page: 1,
				size: 10,
				token:'',
				queryUserId:'',
				currentUserId:''
			}
		},
		onLoad(query) {
			this.token = uni.getStorageSync("token")
			this.queryUserId = query.userId
			this.currentUserId = uni.getStorageSync("userId")
			this.getList()
			this.getUserInfo(query.userId)
		},
		methods: {
			back() {
				uni.navigateBack();
			},
			moreInfo(){
				uni.navigateTo({
					url:"/pages_userInfo/userInfo/userDetail?userId="+ this.userInfo.id
				})
			},
			getList() {
				let userId = this.queryUserId
				uni.request({
					url: this.reqUrl + "/schoolLife/list?page=" + this.page + "&size=" + this.size + "&targetId=" +
						userId,
					method: 'GET',
					header: {
						'Authorization': this.token
					},
					success: (res) => {
						this.schoolLifeList = this.schoolLifeList.concat(res.data.data.list);
						console.log(res)
					},
					fail: (err) => {
						console.error('API请求失败', err);
					}
				})
			},
			getUserInfo(userId) {
				const token = uni.getStorageSync("token")
				uni.request({
					url: this.reqUrl + "/member/userInfo/"+ userId,
					method: 'GET',
					header: {
						'Authorization': token
					},
					success: (req) => {
						console.log("userInfo", req)
						if (req.data.code === 200) {
							this.userInfo = req.data.data
						} else {
							uni.showToast({
								title: "出错了~",
								icon: "none"
							})
						}
					}
				})

			},
			parseImages(images) {
				if (images) {
					return JSON.parse(images)
				}

			},
			onReachBottom() {
				// 上拉触底时，加载下一页的新闻数据
				this.page++;
				this.getList();
			},
			deleteInfo(id) {
				
				uni.showModal({
					title: '提示',
					content: '确定删除此动态',
					showCancel: true,
					cancelText:'取消',
					confirmText: '确定',
					success: (res) => {
						if (res.confirm) {
							// 用户点击确定，跳转到登录页面
							uni.request({
								url: this.reqUrl + "/schoolLife/" + id,
								method: 'DELETE',
								header: {
									'Authorization': this.token
								},
								success: (req) => {
									console.log("delete", req)
									if (req.data.code === 200) {
										
										
										uni.showToast({
											title: "删除成功~",
											icon: "none"
										})
										
									} else {
										uni.showToast({
											title: "出错了~",
											icon: "none"
										})
									}
								}
							})
						}
					}
				})
				
			},
			like(isLike, id, index) {

				this.data.articlesId = id
				let url = ''
				let method = ''
				if (isLike === 0) {
					url = '/good/like'
					method = 'post'
					this.schoolLifeList[index].isGoods = 1
					this.schoolLifeList[index].goods = this.schoolLifeList[index].goods + 1
				} else {
					url = '/good/remove'
					method = 'delete'
					this.schoolLifeList[index].isGoods = 0
					this.schoolLifeList[index].goods = this.schoolLifeList[index].goods - 1

				}
				console.log(this.data)
				uni.request({
					url: this.reqUrl + url,
					method: method,
					data: this.data,
					header: {
						'Authorization': this.token
					},
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.error('API请求失败', err);
					}
				})

			},
			toDetailPage(id) {
				uni.navigateTo({
					url: "/pages/index/campusDetail?id=" + id
				})
			},
			big(url) {
				uni.previewImage({
					urls: JSON.parse(url)
				})
			},
		}
	}
</script>

<style>
	/* 样式请根据微信朋友圈页面调整 */
	.container {
		/* position: relative; */
		/* display: flex;
		flex-direction: column; */
		/* padding: 2%; */
	}

	.background {
		height: 200px;
		/* position: relative; */
		/* 背景图样式 */
	/* 	background-image: url('http://admin.ykfly.com/jfht/fly.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		background-attachment: fixed; */
	}

	.avatar-container {
		position: relative;
		bottom: 0;
		left: 2%;
		/* transform: translateX(-90%); */
		transform: translateY(-28%);
		z-index: 1;
		/* 确保头像在背景之上 */
	}

	.name-container {
		position: relative;
		left: 26%;
		bottom: 0;
		transform: translateY(-60px);
		z-index: 1;
	}

	.info-container {
		display: flex;
		flex-direction: row;
		/* margin-top: 10%; */
		width: 100%;
		
	}

	.avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		position: relative;
		z-index: 2;
		/* 确保头像显示在背景之上 */
	}

	.back {
		position: absolute;
		top: 6%;
		width: 100%;
		/* top: -100px; */
		/* left: 20px; */
		z-index: 10;
	}

	.info-qm {
		color: gray;
		font-size: 12px;
		width: 85%;
	}

	.info-more {
		display: flex;
		justify-content: flex-end;
		color: gray;
		width: 13%;
		font-size: 14px;
		margin-right: 2%;
	}

	.icon {
		color: #777;
		margin-top: 10%;
		margin-left: 2%;
	}

	.box {
		display: flex;
		justify-items: center;
		flex-direction: column;
		background-color: white;
		padding: 5% 2% 0 4%;
		margin-bottom: 1%;
		border-radius: 10px;
		margin-top: 5%;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.box1 {
		display: flex;
		align-items: center;
		justify-items: center;
		flex-direction: row;
	}

	.touxiang {
		border-radius: 50%;
		height: 40px;
		width: 40px;
	}

	.name {
		margin-left: 6px;
	}

	.content {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		width: 90%;
		margin-top: 1%;
		font-size: small;
	}

	.grid-container {
		margin-top: 5px;
		margin-bottom: 15px;
		border: none;
	}

	uni-grid-item {
		text-align: center;
	}


	.img {

		width: 100%;
		height: 100%;
	}

	.dataTime {
		font-size: 10px;
		color: gray;
		margin-left: 6px;
	}

	.comment {
		margin: 2% 0 3% 4%;
		color: #57534E;
	}

	.like {
		
		margin: 2% 0 3% 2%;
		color: #57534E;
	}

	.share {
		margin: 3% 0 3% 14%;
		position: absolute;
		right: 6%;
	}

	.text {
		font-size: 12px;
		color: #57534E;
	}

	.top_1 {
		margin-top: 2%;
	}
	
	.bg_image{
		position: relative;
		top: 0;
		width: 100%;
		height: 200px;
	}
	
	.padding-info{
		padding: 2%;
		position: relative;
		transform: translateY(-40px);
	}
	
	.empty{
		display: flex;
		color: grey;
		align-items: center;
		flex-direction: column;
		font-size: 14px;
	}
	.empty image{
		width: 60px;
		height: 60px;
		margin-top: 50%;
		margin-bottom: 10px;
	}
</style>