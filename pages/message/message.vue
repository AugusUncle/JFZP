<template>
	<view>
		<view class="tabs">
			<u-tabs :list="list" @click="change()"></u-tabs>
		</view>

		<view v-if="index===1">
			<view class="box" v-for="(item,index) in dataList" :key="index">
				<view>
					<image class="touxiang" :src="item.headPic"></image>
				</view>
				<view class="text">
					<view class="name">您关注的用户{{item.likeName}}发表了新动态~</view>
					<view class="info">暂无简介</view>
				</view>
			</view>
		</view>
		<!-- <view v-if="index===0">
			<uni-list :border="true" v-for="(message, index) in msgList" :key="index">
				<uni-list-chat :title="message.peerName" :avatar="message.headPic" :note="message.lastMsg.content"
					:time="message.lastMsg.gmtCreate" :badge-text="message.unReadCount" clickable='true'
					@click="toChat(message.peerId,message.headPic,message.peerName,message.id)"></uni-list-chat>
			</uni-list>
		</view> -->


		<uni-swipe-action v-if="index===0">
			<uni-swipe-action-item v-for="(message, index) in msgList" :key="index" :right-options="options2"
				:show="isOpened" :auto-close="false" @change="change" @click="bindClick($event,message.sessionId,message.peerId)">
				<uni-list>
					<uni-list-chat :title="message.peerName" :avatar="message.headPic" :note="message.lastMsg.content"
						:time="message.lastMsg.gmtCreate" :badge-text="message.unReadCount" clickable='true'
						@click="toChat(message.peerId,message.headPic,message.peerName,message.sessionId)"></uni-list-chat>
				</uni-list>

			</uni-swipe-action-item>
		</uni-swipe-action>

	<view class="empty" v-show="msgList.length ===0">
		<image src="../../static/icon_cb/kk.png"></image>
		<view >很少交流哦，还没有消息呢~</view>
	</view>

	</view>
</template>

<script>
	export default {
		data() {

			return {
				list: [{
					name: '消息',
					badge: {
						value: ''
					}
				}],

				index: 0,
				page: 1,
				size: 10,
				dataList: {},
				msgList: [],
				avatarList: [{
					url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'
				}, {
					url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'
				}, {
					url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'
				}],


				options2: [{
						text: '取消',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#F56C6C'
						}
					}
				],

			};
		},
		onShow() {
			// this.getList()
			this.getMsgList()
		},
		mounted() {
			this.startPolling(); // 页面加载后开始轮询
		},
		methods: {
			change(item) {
				this.index = item.index
			},
			startPolling() {
				// 使用定时器每隔一段时间执行一次请求
				setInterval(() => {
					// this.getList()
					// this.getMsgList() // 发起请求获取最新消息
				}, 5000); // 每5秒钟轮询一次
			},
			getList() {
				let memberId = uni.getStorageSync("userId")
				let token = uni.getStorageSync("token")
				uni.request({
					url: this.reqUrl + "/like/list?page=" + this.page + "&size=" + this.size + "&memberId=" +
						memberId,
					method: 'GET',
					header: {
						"Authorization": token
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
			getMsgList() {
				let memberId = uni.getStorageSync("userId")
				let token = uni.getStorageSync("token")
				// console.log(memberId)
				uni.request({
					url: this.reqUrl + "/msg/session/list?page=" + this.page + "&size=" + this.size +
						"&memberId=" + memberId,
					method: 'GET',
					header: {
						"Authorization": token
					},
					success: (res) => {
						console.log("消息列表", res)
						if (res.data.code === 200) {
							const list = res.data.data.sessionResponses;
							list.forEach(item =>{
								if(item.lastMsg.msgType === 3){
									item.lastMsg.content = "[语音]"
								}else if(item.lastMsg.msgType === 2){
									item.lastMsg.content = "[图片]"
								}else if(item.lastMsg.msgType === 4){
									item.lastMsg.content = "[视频]"
								}
								this.msgList = list
							})
							this.list[0].badge.value = res.data.data.unReadCount
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'error'
							})
						}
					}
				})
			},
			toChat(memberId, headPic, name, sessionId) {
				uni.navigateTo({
					url: '/pages/message/chat?id=' + memberId + "&img=" + headPic + "&name=" + name +
						"&sessionId=" + sessionId
				})
			},
			bindClick(e,id,usd) {
				let token = uni.getStorageSync("token")
				let userId = uni.getStorageSync("userId")
				if (e.index === 1) {
					uni.showToast({
						title: '删除中',
						icon: 'loading'
					})
					uni.request({
						url: this.reqUrl + "/msg/session",
						method: 'DELETE',
						data: {
							sessionId: id,
							memberId: userId
						},
						header: {
							"Authorization": token
						},
						success: (res) => {
							uni.removeStorageSync('chatMessages_' + usd )
						},
						fail: (res) => {

						}
					})
				}
			},
			clear(){
				
			}
		}
	};
</script>

<style>
	.tabs {
		display: flex;
		justify-content: center;
		margin-top: 11%;
	}

	.box {
		display: flex;
		flex-direction: row;
		align-items: center;
		/* justify-items: center; */
		background: white;
		margin-top: 4px;
		padding: 2%;
	}

	.name {
		font-size: 14px;

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

	.chat-custom-right {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.chat-custom-text {
		font-size: 12px;
		color: #999;
	}

	.content-box {
		flex: 1;
		/* #ifdef APP-NVUE */
		justify-content: center;
		/* #endif */
		height: 44px;
		line-height: 44px;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		border-bottom-color: #f5f5f5;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}

	.content-text {
		font-size: 15px;
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