<template>
	<view>

		<view>{{shopList}}</view>
		<view class="empty" v-show="shopList.length<=0">
			<image src="../../static/icon_cb/kk.png"></image>
			<view>还没有收藏，可以去主页和精彩校园看看哦~</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				size: 10,
				shopList: [{
					name:"123"
				}]
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				const token = uni.getStorageSync("token")
				uni.request({
					url: this.reqUrl + "/favorites/list?page=" + this.page + "&size=" + this.size,
					method: 'GET',
					header: {
						"Authorization": token
					},
					success: (res) => {
						console.log("shouc", res)
						if (res.data.data.total === "0" )
							this.shopList = res.data.data.list
					}
				})
			}
		}
	}
</script>

<style>
	.empty {
		display: flex;
		color: grey;
		align-items: center;
		flex-direction: column;
		font-size: 14px;
	}

	.empty image {
		width: 60px;
		height: 60px;
		margin-top: 50%;
		margin-bottom: 10px;
	}
</style>