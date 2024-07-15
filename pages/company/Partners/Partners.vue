<template>
	<view class="page">
		<page-back></page-back>
		<view class="name">
			<image class="logo" :src="data.headPic"></image>
			<text>{{data.name}}</text>
			<view class="gw" @tap="toOffWeb(data.website)">
				<image style="width: 20px; height: 20px;" src="https://jfzp.ykfly.com/jfht/app/web.png"></image>
				<text>官网 ></text>
			</view>
		</view>
		<view class="pic1" v-if="data.corporateStyles">
			<view>
				<image class="img1" :src="data.corporateStyles[0].url"></image>
			</view>

			<view class="pic2">
				<image class="img2" :src="data.corporateStyles[1].url"></image>
				<image class="img3" :src="data.corporateStyles[2].url"></image>
			</view>
		</view>
		<view class="news" v-if="newsList.length>0">
			<view style="width: 20%;">
				<image src="../../../static/zixun.png"></image>
			</view>
			<view style="width: 80%;">
				<swiper :autoplay="true" :interval="3000" :vertical="true" :circular="true">
					<swiper-item v-for="(news, index) in newsList" :key="index">
						<view @tap="toDetailPage(news.id)">{{ news.title }}</view>
					</swiper-item>
				</swiper>
			</view>

		</view>
		<view style="display: flex; flex-direction: row; flex-wrap: wrap;">
			<view class="title" v-for="(item,index1) in data.speciality" :key="index1">{{item.speciality}}</view>
		</view>

		<view class="baike">
			<u-read-more show-height="300" ref="uReadMore">
				<!-- <rich-text :nodes="data.introduction"></rich-text> -->
				<u-parse :content="data.introduction" @load="load"></u-parse>
			</u-read-more>

			<!-- <view>
				{{data.introduction}}
			</view> -->
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic: "https://t13.baidu.com/it/u=2551130444,804791453&fm=225&app=113&size=w931&q=75&n=0&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=B9274B901E8A0CC40410F890030070AA",
				newsList: [],
				data: '',
				queryId: '',
				token: '',
				page: 1,
				size: 10
			}
		},
		onLoad(query) {
			this.token = uni.getStorageSync("token")
			// this.getBaiKe()
			this.queryId = query.id
			this.getInfo()
			this.getNewList()
		},
		methods: {
			// getBaiKe() {
			// 	uni.request({
			// 		url: "https://baike.baidu.com/api/openapi/BaikeLemmaCardApi?appid=379020&bk_key=陕西机电职业技术学院",
			// 		// url:"https://api.liangmlk.cn/a20safe/aapi.php?api=21&text=陕西机电职业技术学院",
			// 		method: 'GET',
			// 		success: (res) => {
			// 			console.log(res.data.data)
			// 			this.schoolInfo = res.data.data
			// 		}
			// 	})
			// },
			load() {
				this.$refs.uReadMore.init();
			},

			getInfo() {
				uni.request({
					url: this.reqUrl + "/member/userInfo/" + this.queryId,
					method: "GET",
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("用户信息", res)
						this.data = res.data.data
					}
				})
			},

			getNewList() {
				uni.request({
					url: this.reqUrl + "/articles/list?page=" + this.page + "&size=" + this.size +
						"&memberId=" + this.queryId,
					method: "GET",
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("新闻", res)
						this.newsList = res.data.data.list
					}
				})
			},
			toDetailPage(id) {
				uni.navigateTo({
					url: "/pages/news/newsDetail?id=" + id
				})
			},

			toOffWeb(url) {
				uni.navigateTo({
					url: "/pages/company/OfficialWeb/OfficialWeb?url=" + url
					// url: "/pages/company/OfficialWeb/OfficialWeb?url=" + "http://www.sxjdzy.cn/"
				})
			}
		}
	}
</script>

<style>
	.page {
		padding: 4%;
		height: 100vh;
		background-image: url('https://jfzp.ykfly.com/jfht/app/bg-school.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		/* background-attachment: fixed; */
	}

	.logo {
		width: 55px;
		height: 55px;
		border-radius: 50%;

	}

	.name {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 3%;
		margin-top: 70px;
	}

	.name text {
		font-size: 18px;
		font-weight: 400;
		margin-left: 2%;
	}

	.gw {
		background-color: white;
		border-radius: 20px 0 0 20px;
		padding: 5px 0 5px 10px;
		position: absolute;
		right: 0;
		color: #1296db;
		display: flex;
		flex-direction: row;
		width: 60px;
		align-items: center;

	}

	.gw text {
		font-size: 12px;
		font-weight: 500;
	}

	.pic1 {
		display: flex;
		flex-direction: row;
		width: 64%;
	}

	.img1 {
		border-radius: 10px 0 0 10px;
		width: 61.5vw;
		height: 40.5vw;
	}

	.img2 {
		border-radius: 0 10px 0 0;
		width: 30vw;
		height: 20vw;
		margin-left: 0.5vw;
	}

	.img3 {
		border-radius: 0 0 10px 0;
		width: 30vw;
		height: 20vw;
		margin: 0.5vw 0 0 0.5vw;
	}

	.pic2 {
		display: flex;
		flex-direction: column;
		width: 32%;
	}

	swiper {
		height: 25px;
	}

	.news {
		border-bottom: 0.6px solid #e9e9eb;
		display: flex;
		flex-direction: row;
		margin-top: 5%;
	}

	.news image {
		width: 15vw;
		height: 6vw;
	}

	.baike {
		margin: 5% 0;
		/* -webkit-line-clamp: 4;
		-webkit-box-orient: vertical; */
	}

	.title {
		border: #39BDF7 1px solid;
		border-radius: 3px;
		margin: 1vh 1vw;
		font-size: 10px;
		color: #39BDF7;
		padding: 1px;
		word-wrap: break-word;
	}
</style>