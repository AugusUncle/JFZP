<template>
	<view class="page">
		<!-- <view class="uni-margin-wrap"> -->
		<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="true" interval="5000" duration="550">
			<swiper-item>
				<image @tap="toYkzf()" class="image-swiper" src="https://jfzp.ykfly.com/jfht/app/caac1.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image @tap="toCourse()" class="image-swiper" src="https://jfzp.ykfly.com/jfht/app/child1.jpg"></image>
			</swiper-item>
		</swiper>
		<!-- </view> -->

		<!-- <view class="tabs" style="width: 400rpx;">
			<u-tabs ref="tabs" :list="list" :current="current" @change="tabChange()"></u-tabs>
		</view> -->
		<view style="margin: 10px 0;">
			<u-subsection :list="list" :current="current" height="100rpx" @change="tabChange()"></u-subsection>
		</view>

		<view v-if="current===0">
			<!-- <uni-list>
				<uni-list-item v-for="(news,index) in newList" :key="index" :title="news.title"
					@tap="toDetailPage(news.id)" :note="news.gmtCreate">
					<template v-slot:footer>
						<view class="uni-thumb" style="margin: 0;">
							<image :src="news.frontCoverUrl" style="width: 120px;height: 80px;border-radius: 5px;"
								mode="aspectFill">
							</image>
						</view>
					</template>
				</uni-list-item>
			</uni-list> -->
			<view style="display: flex; flex-direction: row; justify-content: space-between;border-bottom: 1rpx solid grey; padding-bottom: 10rpx; margin-bottom: 20rpx;"
				v-for="(news,index) in newList" :key="index" @tap="toDetailPage(news.id)">
				<view style="display: flex; flex-direction: column; justify-content: space-between;">
					<view class="detail">{{news.title}}</view>
					<view style="color: grey; font-size: 24rpx; ">{{news.gmtCreate}}</view>
				</view>
				<view>
					<image style="width: 240rpx; height: 160rpx; border-radius: 3px;" :src="news.frontCoverUrl"></image>
				</view>
			</view>
		</view>
		<scroll-view v-else-if="current===1">
			<uni-grid :column="2" :highlight="true" @change="change" :show-border="false">
				<uni-grid-item v-for="(item, index) in shopList" @tap="toShopDetail(item.url)" :index="index"
					:key="index">
					<image style="width: 98%;height: 100%; margin: 0 2% 2% 1.3%;" :src="item.imgUrl"></image>
					<text  class="text">{{item.name}}</text>
				</uni-grid-item>
			</uni-grid>
		</scroll-view>
		<page-back></page-back>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				list: [{
					name: '资讯'
				}, {
					name: '产品'
				}],
				current: 0,
				page: 1,
				size: 10,
				shopList: [{
					name: "大疆无人机1",
					imgUrl: "https://jfzp.ykfly.com/jfht/app/Matrice-350-RTK.jpg"
				}],
				newList: {},
				query: {
					page: 1,
					size: 10,
					isExamine: 1,
					type: 7,
					title: ""
				},
			}
		},
		onShow() {
			this.getShopList()
			this.getNewList()
		},
		methods: {
			tabChange(index) {
				this.current = index
				console.log(index)
				if (index === 1) {
					this.getShopList()
				}
			},
			toYkzf() {
				uni.navigateTo({
					url: "/pages/ykzf/ykzf"
				})
			},
			toCourse() {
				uni.navigateTo({
					url: "/pages/ykzf/course"
				})
			},
			toDetailPage(id) {
				uni.navigateTo({
					url: "/pages/news/newsDetail?id=" + id
				})
			},
			getShopList() {
				const token = uni.getStorageSync("token")
				uni.request({
					url: this.reqUrl + "/djShop/list?page=" + this.page + "&size=" + this.size,
					method: 'GET',
					header: {
						"Authorization": token
					},
					success: (res) => {
						console.log("商品", res)
						this.shopList = res.data.data.list
					}
				})

			},
			getNewList() {
				let token = uni.getStorageSync("token")
				uni.request({
					url: this.reqUrl + "/articles/list",
					method: 'GET',
					data: this.data,
					header: {
						'Authorization': token
					},
					success: (res) => {
						console.log(res.data.data.list)
						// this.newList = this.newsList.concat(res.data.data.list);
						this.newList = res.data.data.list;

					},
					fail: (err) => {
						console.error('API请求失败', err);
					}
				})
			},
			toShopDetail() {
				uni.navigateTo({
					url: '/pages/ykzf/Uav?url=' + "https://enterprise.dji.com/cn/mobile/mavic-3-enterprise"
					
				})
			},
		}
	}
</script>

<style>
	.page {
		padding: 1%;
		background-image: url('https://jfzp.ykfly.com/jfht/app/flyhome-bg.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}
	.detail {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		font-size: 28rpx;
	}
	

	.image-swiper {
		width: 100%;
		height: 160px;
		/* border-radius: 10px; */
	}

	.swiper {
		height: 160px;
		margin-top: 90px;
	}

	.text {
		text-align: center;
		/* background-color: white; */
		position: absolute;
		width: 100%;
		bottom: 15px;
	}

	uni-grid {
		/* margin: 2%; */
	}
	
	uni-grid-item{
		display: flex;
		justify-items: center;
	}

	u-subsection {
		height: 90px;
	}
	
	.scroll-view{
		margin: 0;
		padding: 0;
	}
</style>