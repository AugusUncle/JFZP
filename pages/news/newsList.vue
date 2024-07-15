<template>
	<view class="page">
		<view>
			<uni-search-bar @confirm="search" v-model="data.title" @input="input" @cancel="cancel" @clear="clear">
			</uni-search-bar>
		</view>

		<u-tabs :list="tabList" @click="switchTab()"></u-tabs>


		<uni-list v-for="(news,index) in newsList" :key="index">
			<uni-list-item :title="news.title" @tap="toDetailPage(news.id)" :note="news.gmtCreate">
				<template v-slot:footer>
					<view class="uni-thumb" style="margin: 0;">
						<image :src="news.frontCoverUrl" style="width: 120px;height: 80px;border-radius: 5px;"
							mode="aspectFill">
						</image>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {
					page: 1,
					size: 10,
					isExamine: 1,
					type: '',
					title: "",
					tabList: [{
						name: '推荐',
					}, {
						name: '信息交流'
					}, {
						name: '政策支持'
					}, {
						name: '人才培养'
					}, {
						name: '共建项目'
					}, {
						name: '校企互动'
					}, {
						name: '成功案例'
					}]
				},
				newsList: []
			}
		},
		onLoad() {
			this.newsList = [];
			this.getList()
		},


		methods: {
			toDetailPage(id) {
				uni.navigateTo({
					url: "/pages/news/newsDetail?id=" + id
				})
			},
			setTitle(type) {
				console.log(type)
				if (type === "0") {
					uni.setNavigationBarTitle({
						title: '信息交流'
					});
				} else if (type === "1") {
					uni.setNavigationBarTitle({
						title: '人才培养'
					});
				} else if (type === "2") {
					uni.setNavigationBarTitle({
						title: '项目共建'
					});
				} else if (type === "3") {
					uni.setNavigationBarTitle({
						title: '校企互动'
					});
				} else if (type === "4") {
					uni.setNavigationBarTitle({
						title: '政策支持'
					});
				} else if (type === "5") {
					uni.setNavigationBarTitle({
						title: '成功案例'
					});
				} else {
					uni.setNavigationBarTitle({
						title: '最新动态'
					});
				}
			},
			getList() {
				let token = uni.getStorageSync("token")
				uni.request({
					url: this.reqUrl + "/articles/list",
					method: 'GET',
					data: this.data,
					header: {
						'Authorization': token
					},
					success: (res) => {
						// this.newsList = res.data.data
						this.newsList = this.newsList.concat(res.data.data.list);
						console.log(res)
					},
					fail: (err) => {
						console.error('API请求失败', err);
					}
				})
			},
			onReachBottom() {
				// 上拉触底时，加载下一页的新闻数据
				this.data.page++;
				console.log("啦啦啦")
				this.getList();
			},
			search() {
				this.newsList = []
				this.getList()
			},
			cancel() {
				this.newsList = []
				// this.getList()
			},
			input() {
				this.newsList = []
				this.getList()
			},
			clear() {
				this.newsList = []
				// this.getList()
			}

		},

	}
</script>

<style>
	.page {
		padding: 2%;
		background: white;
	}

	/* 列表 */
	.newslist {
		width: 95%;
		height: 80%;
		margin: 0 0 0 8px;
		display: flex;
		flex-direction: row;
	}

	.pic {
		width: 230rpx;
		height: 140rpx;
		margin: 5px 10px 10px 5px;
		position: absolute;
		right: 10px;
		border-radius: 5px;
	}

	.detail {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		width: 60%;
		margin: 5px 5px 5px 10px;
		font-size: small;
	}


	.date {
		margin: 15px 5px 5px 10px;
		color: #9E9E9E;
		font-size: small;
	}

	.line {
		width: 91%;
		margin: 10px 5px 5px 18px;
		/* 设置横线的宽度为100% */
		border-bottom: 1px solid #ECEFF1;
		/* 设置横线的颜色和样式 */
	}
</style>