<template>
	<view class="page">
		<view class="box">
			<view class="box1">
				<image class="touxiang" :src="data.headPic"></image>
				<view class="box1_1">
					<view class="name">{{data.memberName}}</view>
					<view class="datatime">{{data.gmtCreate}}</view>
				</view>
				<button v-if="data.likeStatus===0 && data.memberId !== uId" @tap="guanzhu(data.memberId)"
					class="guanzhu" type="primary" size="mini">+关注</button>
				<button v-if="data.likeStatus===1 && data.memberId !== uId" @tap="guanzhu1(data.memberId)"
					class="guanzhu" size="mini">已关注</button>
				<button v-if="data.likeStatus===2 && data.memberId !== uId" @tap="guanzhu1(data.memberId)"
					class="guanzhu" size="mini">互相关注</button>
			</view>

			<view class="content">{{data.content}}</view>


			<uni-grid :column-num="3">
				<uni-grid-item v-if="data.images" v-for="(ite, index) in parseImages(data.images)" :key="index">
					<image class="img" :src="ite" mode="aspectFill" @click="big(data.images)"></image>
				</uni-grid-item>
			</uni-grid>

		</view>


		<uni-section class="section" title="评论" type="line">
			<view class="box2" v-for="(item, index) in comments" :key="index">
				<view>
					<image class="touxiang1" :src="item.headPic"></image>
				</view>

				<view class="box box1_1">
					<view class="name">{{item.name}}</view>
					<view class="name1">{{item.remarkContent}}</view>
					<view class="datatime">{{item.gmtCreate}}</view>
					<view class="line"></view>
				</view>
			</view>
		</uni-section>


		<view class="container" v-if="showInput">
			<input class="inp_comm" type="text" @blur='blur' focus v-model="comment.remarkContent"
				placeholder="请文明用语:" />
			<button class="btn_comm" v-if="comment.remarkContent" size="mini" @click="submit()">发送</button>
		</view>


		<view class="tabbar" v-if="tabShow">
			<button class="btn" hover-class="btn1" open-type="share">
				<uni-icons type="undo"></uni-icons>
				<text>分享</text>
			</button>
			<view class="separator"></view>
			<button class="btn" @tap="openInput()" hover-class="btn1">
				<uni-icons type="chat"></uni-icons>
				<text>评论</text>
			</button>
			<view class="separator"></view>
			<button class="btn" hover-class="btn1" @tap="toChat(data.memberId,data.headPic,data.memberName,type)">
				<uni-icons type="chatboxes"></uni-icons>
				<text>私信</text>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				size: 10,
				cardId: '',
				parentId: 0,
				data: [],
				value1: '',
				comments: [],
				token: '',
				uId: '',
				showInput: false,
				tabShow: true,
				type:1,
				comment: {
					"cardId": 0,
					"memberId": 0,
					"parentId": 0,
					"remarkContent": "",
					"targetId": 0
				}
			}
		},
		onLoad(query) {
			this.token = uni.getStorageSync("token")
			let id = query.id
			this.cardId = query.id
			this.comment.cardId = query.id
			this.uId = uni.getStorageSync("userId")
			this.getCampusInfo(id)
			this.getcomment()

		},
		methods: {

			getcomment() {
				uni.request({
					url: this.reqUrl + "/remark/list?page=" + this.page + "&size=" + this.size + "&cardId=" + this
						.cardId + "&parentId=" + this.parentId,
					method: 'GET',
					header: {
						'Authorization': this.token
					},
					success: (req) => {
						console.log('评论', req)
						this.comments = req.data.data
					}
				})
			},

			getCampusInfo(id) {
				uni.request({
					url: this.reqUrl + "/schoolLife/" + id,
					method: 'GET',
					header: {
						'Authorization': this.token
					},
					success: (req) => {
						console.log('详情', req.data.data)
						this.data = req.data.data

					}
				})
			},
			parseImages(images) {
				console.log(images)
				if (images) {
					return JSON.parse(images)
				}

			},
			big(url) {
				console.log(url)

				uni.previewImage({
					urls: JSON.parse(url)
				})
			},
			click1(e) {
				console.log('click1', e);
			},
			blur() {
				this.showInput = false;
				this.tabShow = true;
			},
			shareLife() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			openInput() {
				this.showInput = true;
				this.tabShow = false;
			},
			submit() {
				console.log(this.comment.remarkContent)
				uni.request({
					url: this.reqUrl + "/common/text_detection",
					method: 'POST',
					data: {
						content: this.comment.remarkContent
					},
					success: (req) => {
						console.log('文本检测', req)
						if (req.data.code === 200) {
							this.addComment()
						} else {
							uni.showToast({
								title: req.data.message,
								icon: 'error'
							})
						}
					}
				})
			},
			addComment() {
				this.showInput = false;
				this.tabShow = true;
				this.comment.memberId = uni.getStorageSync("userId")
				uni.request({
					url: this.reqUrl + "/remark/add",
					method: 'POST',
					data: this.comment,
					header: {
						'Authorization': this.token
					},
					success: (req) => {
						console.log('添加评论', req)
						if (req.data.code === 200) {
							this.comment.remarkContent = ''
							this.getcomment()
						} else {
							uni.showToast({
								title: req.data.message,
								icon: 'none'
							})
						}
					}
				})
			},
			guanzhu(id) {
				uni.request({
					url: this.reqUrl + "/like",
					method: 'POST',
					data: {
						memberId: uni.getStorageSync("userId"),
						likeId: id
					},
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						if (res.data.code === 200) {
							this.data.likeStatus = 1
							uni.showToast({
								title: '关注成功',
								icon: 'success'
							})
						} else {
							uni.showToast({
								title: '关注失败',
								icon: 'success'
							})
						}
					}
				})
			},
			guanzhu1(id) {
				uni.request({
					url: this.reqUrl + "/like",
					method: 'DELETE',
					data: {
						memberId: uni.getStorageSync("userId"),
						likeId: id
					},
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						if (res.data.code === 200) {
							this.data.likeStatus = 0
							uni.showToast({
								title: '取关成功',
								icon: 'success'
							})
						} else {
							uni.showToast({
								title: '取关失败',
								icon: 'success'
							})
						}
					}
				})
			},
			createChat(memberId, headPic, name){
				let id = uni.getStorageSync("userId")
				let msgs = uni.getStorageSync('msg' + id) || [];
				let msg = msgs.find(u => u.sendId === memberId);
				
				if (!msg) {
					msg = {
						sendId: memberId,
						headPic: headPic,
						nickName: name,
						unread: 0,
						chats: []
					};
					msgs.push(msg);
				} 
			},
			toChat(memberId, headPic, name,type) {
				uni.navigateTo({
					url: '/pages/message/chat?id=' + memberId + "&img=" + headPic + "&name=" + name+ "&type=" + type
				})
				
			}
		}
	}
</script>

<style>
	.page {
		/* height: 100vh; */
	}

	.box {
		display: flex;
		flex-direction: column;
		background-color: white;
		padding: 2%;
		margin-bottom: 10px;
	}

	.box1 {
		display: flex;
		align-items: flex-start;
		flex-direction: row;
	}

	.box1_1 {
		margin-left: 12px;
	}

	.box2 {
		background-color: white;
		display: flex;
		/* align-items: center; */
		flex-direction: row;
		margin: 2%;
		vertical-align: top;
		/* 顶部对齐 */
	}

	.touxiang {
		border-radius: 50%;
		height: 40px;
		width: 40px;

	}

	.touxiang1 {
		border-radius: 50%;
		height: 40px;
		width: 40px;
		position: relative;
		top: 8px;
	}

	.name {
		color: gray;
	}

	.name1 {
		margin-top: 3px;
		margin-bottom: 6px;
	}

	.guanzhu {
		border: none;
		position: absolute;
		right: 4%;
	}

	.datatime {
		font-size: 12px;
		color: gray;
		/* margin-left: 2%; */
	}

	.content {
		font-size: 14px;
		margin: 6% 0 4% 0;
		color: #404040;
		line-height: 1.5em;
		letter-spacing: 1px;
	}

	.img {
		width: 100%;
		height: 100%;
	}

	.section {
		padding-bottom: 25px;
	}

	.line {

		/* margin: 10px 0 5px 0; */
		/* 设置横线的宽度为100% */
		border-bottom: 1px solid #ECEFF1;
		/* 设置横线的颜色和样式 */
		width: 280px;

	}

	.btn {
		width: 34%;
		height: 76%;
		font-size: 14px;
		background-color: white;
		color: #404040;
		/* border: none;
		outline: none; */
		border-radius: 0;
		/* margin-bottom: 10%; */
	}

	.btn1 {
		width: 34%;
		height: 76%;
		font-size: 14px;
		background-color: lightgray;
		color: #404040;
		border: none;
		outline: none;
		border-radius: 0;
		/* margin-bottom: 10%; */
	}


	button::after {
		border: none;
		border-radius: 0;
		padding: 0;
	}

	.btn_comm {
		width: 70px;
		height: 31.58px;
		font-size: 14px;
		margin-left: 5px;
		background-color: #38BDF8;
		border-radius: 20px;
		color: white;
	}

	.inp {
		padding: 5px;
		width: 99%;
		border: 1px solid #ccc;
		border-radius: 5px;

		background-color: #ccc;
		/* display: flex; */
	}

	.commentInfo {
		background-color: white;
		position: absolute;
		bottom: 4%;
	}

	.container {
		position: fixed;
		bottom: 0%;
		padding: 0 2% 0 2%;
		width: 96%;
		display: flex;
		align-items: center;
		/* background-color: white; */
		margin-bottom:6px
	}

	.inp_comm {
		padding: 1% 1% 1% 4%;
		width: 100%;
		border: 1px solid #ccc;
		border-radius: 20px;
	}




	.tabbar {
		position: fixed;
		bottom: 0px;
		width: 100%;
		display: flex;
		align-items: center;
		margin-top: 1%;
		padding-bottom: 10px;
		background-color: white;
		/* margin-bottom: 5%; */
	}

	.separator {
		/* display: flex; */
		width: 1px;
		height: 15px;
		/* 竖线的高度 */
		background-color: #ccc;
		/* 竖线的颜色 */

	}

	.uni-grid {
		margin-bottom: 5%;
	}

	/* button {
	    -webkit-tap-highlight-color: transparent;
	    background-color: #f8f8f8;
	    border-radius: 5px;
	    box-sizing: border-box;
	    color: #000;
	    cursor: pointer;
	    display: block;
	    font-size: 18px;
	    line-height: 0;
	    margin-left: auto;
	    margin-right: auto;
	    overflow: hidden;
	    padding-left: 4px;
	    padding-right: 4px;
	    position: relative;
	    text-align: center;
	    text-decoration: none;
	} */
</style>