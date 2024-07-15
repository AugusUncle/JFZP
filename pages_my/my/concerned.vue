<template>
	<view>
		<view class="box" v-for="(item,index) in dataList" :key="index" @tap="toUserSpace(item.likeId)">
			<view>
				<image class="touxiang" :src="item.headPic"></image>
			</view>
			<view class="text">
				<view class="name">{{item.likeName}}</view>
				<view class="info">暂无简介</view>
			</view>
			<view class="btn">
				<button v-if="item.status===0" class="guanzhu" plain="true">+ 关注</button>
				<button v-if="item.status===1" class="guanzhu" plain="true">√已关注</button>
				<button v-if="item.status===2" class="guanzhu" plain="true">互相关注</button>
			</view>

		</view>
		
		<view class="empty" v-show="dataList.length<=0">
			<image src="../../static/icon_cb/kk.png"></image>
			<view >还没有任何关注,去精彩校园看看吧~</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: {},
				page: 1,
				size: 10,
				token: ''
			}
		},
		onLoad() {

			this.token = uni.getStorageSync("token")
			this.getList()
		},
		methods: {
			getList() {
				let memberId = uni.getStorageSync("userId")
				uni.request({
					url: this.reqUrl + "/like/list?page=" + this.page + "&size=" + this.size + "&memberId=" +
						memberId,
					method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("关注列表", res)
						if (res.data.code === 200) {
							this.dataList = res.data.data
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'fail'
							})
						}
					}
				})
			},
			toUserSpace(userId) {
				uni.navigateTo({
					url: '/pages_my/my/mySpace?userId=' + userId
				})
			},
		}
	}
</script>

<style>
	.box {
		display: flex;
		flex-direction: row;
		align-items: center;
		/* justify-items: center; */
		background: white;
		margin-top: 4px;
		padding: 2%;
	}

	.touxiang {
		border-radius: 50%;
		width: 70px;
		height: 70px;
	}

	.text {
		margin-left: 3%;
		width: 80%;
	}

	.info {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		width: 66%;
		font-size: 12px;
		color: gray;
		margin-top: 3%;
	}

	.btn {
		align-items: center;
		position: absolute;
		right: 4%;
	}

	.guanzhu {
		font-size: 12px;
		border-radius: 10px;
		padding: 0 3px 0 3px;
		width: 70px;
		height: 30px;
		border-color: lightgray;
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