<template>
	<view class="page">
		<view>
			<u-sticky class="sticky">
				<u-tabs class="tabs" :list="tabs" @change="change"></u-tabs>
			</u-sticky>
		</view>
		<view class="box" v-for="(item, index1) in schoolLifeList" :key="index1">
			<view class="box1">
				<image class="touxiang" :src="item.headPic"></image>

				<view class="name_time">
					<view class="name">{{item.memberName}}</view>
					<view class="dataTime">{{item.gmtCreate}}</view>
				</view>

				<button @tap="guanzhu(item.memberId,index1)" v-if="item.likeStatus===0 && item.memberId !== memberId"
					class="guanzhu" hover-class="guanzhu1" type="primary" size="mini">+关注</button>
				<button @tap="guanzhu1(item.memberId,index1)" v-if="item.likeStatus===1" class="guanzhu"
					hover-class="guanzhu1" size="mini">已关注</button>
				<button @tap="guanzhu1(item.memberId,index1)" v-if="item.likeStatus===2" class="guanzhu"
					hover-class="guanzhu1" size="mini">互相关注</button>
			</view>

			<view class="content" @tap='toDetailPage(item.id)'>
				{{item.content}}
			</view>
			<view class="grid-container">
				<uni-grid :column-num="3">
					<uni-grid-item v-if="item.images" v-for="(ite, index) in parseImages(item.images)" :key="index">
						<image class="img" :src="ite" mode="aspectFill" @click="big(item.images)"></image>
					</uni-grid-item>
				</uni-grid>
			</view>

			<!-- 评论点赞 -->
			<view class="box1 top_1">
				<view class="share" @tap="more">··· </view>
				<view class="like box1" @tap='like(item.isGoods,item.id,index1)'>
					<uni-icons v-show="item.isGoods===0" type="hand-up" size="24"></uni-icons>
					<uni-icons v-show="item.isGoods===1" type="hand-up-filled" color="#38BDF8" size="24"></uni-icons>
					<text class="text">{{item.goods}}</text>
				</view>
				<view class="comment box1" @tap='toDetailPage(item.id)'>
					<u-icon name="chat" size="24"></u-icon>
					<text class="text">{{item.remarks}}</text>
				</view>
			</view>
		</view>
		
		
		<u-popup :show="show" :round="10" mode="bottom" @close="close">
			<view style="padding: 50rpx 40rpx 30rpx 30rpx;">
				<view
					style="margin-bottom: 30rpx; color: grey; align-items: center; display: flex; flex-direction: row;">
		
					<view style="display: flex; flex-direction: column; justify-content: center;" @click="toJubao()">
						<image src="../../static/icon_cb/jubao.png"
							style="width: 60rpx; height: 60rpx; margin-bottom: 6rpx;"></image>
						<view>举报</view>
					</view>
					<view style="display: flex; flex-direction: column; justify-content: center; margin-left: 15vw;"
						@tap="pingbi()">
						<image src="../../static/icon_cb/pingbi.png"
							style="width: 60rpx; height: 60rpx; margin-bottom: 6rpx;"></image>
						<view>屏蔽</view>
					</view>
				</view>
		
				<!-- <button style="color: grey; border-radius: 60rpx;" @tap="cancel()">取消</button> -->
			</view>
		</u-popup>

		<!-- <uni-fab  @click="addCampus()"   class="create" :pattern="pattern" horizontal="right">发帖</uni-fab> -->
		<image class="add" @tap="addCampus()" src="../../static/icon_cb/fabu.png"></image>
	</view>
</template>

<script>
	import {
		methods
	} from '../../uni_modules/uview-ui/libs/mixin/mixin';
	export default {
		data() {
			return {
				imageList: [
					'http://111.229.98.163:9090/jfht/IMG_1804.jpeg',
					'../../static/fly.jpg',
					'../../static/fly.jpg',
					'../../static/fly.jpg',
					'../../static/fly.jpg',
					'../../static/fly.jpg',
				],
				tabs: [{
					name: '推荐',
				}, {
					name: '闲置物品'
				}, {
					name: '美食'
				}, {
					name: '活动'
				}, {
					name: '校内兼职'
				}, {
					name: '文化'
				}],
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#bfbfbf',
					buttonColor: '#38BDF8',
					iconColor: '#fff'
				},

				query: {
					page: 1,
					size: 10,

				},
				type: "",
				page: 1,
				size: 10,
				show: false,
				userToken: '',
				memberId: '',
				buttonIsOpen: '',
				schoolLifeList: [],
				data: {
					articlesId: '',
					memberId: ''
				},
				likeIcon: "hand-up"
			}
		},
		onShow() {
			this.schoolLifeList = []
			this.page = 1
			this.data.memberId = uni.getStorageSync("userId")
			this.memberId = uni.getStorageSync("userId")
			this.getList()
			this.userToken = uni.getStorageSync("token")
		},

		methods: {
			toDetailPage(id) {
				uni.navigateTo({
					url: "/pages/index/campusDetail?id=" + id
				})
			},

			change(e) {
				console.log("111111111111", e.index)
				this.schoolLifeList = []
				this.type = e.index
				this.page = 1
				this.getList()
			},

			addCampus() {
				uni.navigateTo({
					url: '/pages/index/addCampus'
				})
			},

			kaifa() {
				uni.showToast({
					title: '正在开发.....',
					icon: 'loading'
				})
			},
			big(url) {
				uni.previewImage({
					urls: JSON.parse(url)
				})
			},

			more() {
				this.show = this.show === true ? false : true
			},
			guanzhu(id, index) {
				uni.request({
					url: this.reqUrl + "/like",
					method: 'POST',
					data: {
						memberId: uni.getStorageSync("userId"),
						likeId: id
					},
					header: {
						"Authorization": this.userToken
					},
					success: (res) => {
						console.log("关注：", res)
						if (res.data.code === 200) {
							this.schoolLifeList[index].likeStatus = 1
							uni.showToast({
								title: '关注成功',
								icon: 'success'
							})
						} else {
							uni.showToast({
								title: '关注失败',
								icon: 'error'
							})
						}
					}
				})
			},

			guanzhu1(id, index) {
				uni.request({
					url: this.reqUrl + "/like",
					method: 'DELETE',
					data: {
						memberId: uni.getStorageSync("userId"),
						likeId: id
					},
					header: {
						"Authorization": this.userToken
					},
					success: (res) => {
						if (res.data.code === 200) {
							this.schoolLifeList[index].likeStatus = 0
							uni.showToast({
								title: '取关成功',
								icon: 'success'
							})
						} else {
							uni.showToast({
								title: '关注失败',
								icon: 'error'
							})
						}
					}
				})
			},
			
			pingbi() {
				uni.showModal({
					cancelText: "取消",
					confirmText: "确定",
					title: "确定屏蔽此用户？"
				})
			},

			getList() {
				console.log(this.page)
				console.log(this.type)
				console.log("userId", this.memberId)
				uni.request({
					url: this.reqUrl + "/schoolLife/list?page=" + this.page + "&size=" + this.size + "&type=" +
						this.type + "&memberId=" + this.memberId,
					method: 'GET',
					header: {
						'Authorization': this.userToken
					},
					success: (res) => {
						console.log("viebiao".res)
						this.schoolLifeList = this.schoolLifeList.concat(res.data.data.list);
						this.buttonIsOpen = res.data.data.buttonIsOpen;

					},
					fail: (err) => {
						console.error('API请求失败', err);
					}
				})
			},
			like(isLike, id, index) {

				this.data.articlesId = id
				this.data.memberId = uni.getStorageSync("userId")
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
					data: {
						memberId: uni.getStorageSync("userId"),
						articlesId: id
					},
					header: {
						'Authorization': this.userToken
					},
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.error('API请求失败', err);
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
			cancel() {
				this.show = false
			},
			close() {
				this.show = false
			},
			toJubao() {
				this.show = false
				uni.navigateTo({
					url: '/pages/other/complaint'
				})
			}
		},

	}
</script>

<style>
	.page {
		/* padding: 0 2% 0 0; */

		/* background-image: url('https://admin.ykfly.com/jfht/bg01.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		background-attachment: fixed; */
	}

	.box {
		display: flex;
		/* align-items: center; */
		justify-items: center;
		flex-direction: column;
		background-color: white;
		padding: 5% 2% 0 4%;
		margin-bottom: 1%;
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
		margin-top: 4%;
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

	/* .uni-grid {
		border-radius: 20px;
		overflow: hidden;
	} */

	.img {

		width: 100%;
		height: 100%;
	}

	.tabs {
		width: 100%;
		padding: 0;
		margin: 0;
	}

	.sticky {
		padding: 0;
		margin: 0;
	}

	.guanzhu {
		border-radius: 5px;
		border: none;
		position: absolute;
		right: 4%;
	}

	button::after {
		border: none;
	}

	.comment {
		position: absolute;
		right: 22%;
	}

	.like {
		margin: 3% 0 3% 14%;
		position: absolute;
		right: 6%;
	}

	.share {
		margin: 2% 0 3% 2%;
		color: #57534E;
	}

	.text {
		font-size: 12px;
		color: #57534E;
	}

	.top_1 {
		margin-top: 2%;
	}

	.dataTime {
		font-size: 10px;
		color: gray;
		margin-left: 6px;
	}

	.name_time {
		display: flex;
		flex-direction: column;
	}

	.add {
		position: fixed;
		bottom: 6%;
		right: 2%;
		z-index: 999;
		width: 60px;
		height: 60px;
	}
	
	.u-safe-area-inset-bottom {
	    padding-bottom: 0 !important;
	    /* padding-bottom: env(safe-area-inset-bottom); */
	}
</style>