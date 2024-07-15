<template>

	<view>
		<view class="container1">
			<scroll-view class="chat-container" v-for="(message, index) in messages" :key="index">
				<!-- 对话框A -->
				<view class="message-a" v-if="message.sendId === userInfo.id ">
					<view>
						<image class="a-img" :src="userInfo.img"></image>
					</view>
					<view v-if="message.msgType===1" class="a-text">{{ message.content }}</view>
					<image class="chatImg-L" v-if="message.msgType===2" :src="message.content"
						@click="big(message.content)"></image>
					<view class="voice-view1" v-if="message.msgType===3" @tap="voicePlay(message.content,index)">
						<image class="voice1" v-if="messages[index].voice" src="../../static/icon_cb/voice.png"></image>
						<image class="voice1" v-if="messages[index].voice_play" src="../../static/icon_cb/voice1.gif">
						</image>
						<text class="voice-time">{{message.times}}''</text>
					</view>
				</view>

				<!-- 对话框B -->
				<view class="message-b" v-if="message.sendId === id">
					<view v-if="message.msgType===1" class="b-text">{{ message.content }}</view>
					<image class="chatImg-R" v-if="message.msgType===2" :src="message.content"
						@click="big(message.content)"></image>
					<view class="voice-view" v-if="message.msgType===3" @tap="voicePlay(message.content,index)">
						<text class="voice-time">{{message.times}}''</text>
						<image class="voice" v-if="messages[index].voice" src="../../static/icon_cb/voice.png"></image>
						<image class="voice" v-if="messages[index].voice_play" src="../../static/icon_cb/voice1.gif">
						</image>
					</view>
					<view>
						<image class="b-img" :src="currentUser.headPic"></image>
					</view>
				</view>
			</scroll-view>
		</view>


		<view class="box">
			<view class="container">
				<image class="keyA-icon" @tap="inputChange()" src="/static/icon_cb/luyin.png"></image>
				<view class="records" v-if="recordShow" @touchstart="startRecord" @touchend="stopRecord"
					@touchcancel="cancelRecord" @touchmove="touchMove">{{ recording ? '松开 结束' : '按住 说话' }}</view>
				<input class="inp_comm" v-if="textShow" type="text" :focus="focus" v-model="newMessage"
					@blur="sendTextMsg()" placeholder="请文明用语:" />
				<image class="keyB-icon " v-if="plusShow" @tap="iconChange()" src="/static/icon_cb/plus.png"></image>
				<image class="keyB-icon" v-if="keyShow" @tap="iconChange()" src="/static/icon_cb/keyB.png"></image>
			</view>
			<view class="plus-info" v-if="keyShow">
				<view class="button-item" @tap="chooseImg()">
					<image src="../../static/icon_cb/xiangce.png" class="icon"></image>
					<br>
					<text class="text">图片</text>
				</view>
				<view class="button-item" @tap="job()">
					<image src="../../static/icon_cb/xiangji.png" class="icon"></image>
					<br>
					<text class="text">拍摄</text>
				</view>
				<view class="button-item" @tap="job()">
					<image src="../../static/icon_cb/xiangji.png" class="icon"></image>
					<br>
					<text class="text">发送简历</text>
				</view>
			</view>
		</view>


		<view class="pop" v-if="pop">
			<image v-if="exit_show" class="quxiao" src="../../static/icon_cb/quxiao.png"></image>
			<image v-if="send_show" class="quxiao" src="../../static/icon_cb/luyin.gif"></image>
			<view v-if="exit_show">松开 取消发送</view>
			<view class="start-text" v-if="send_show">松开发送，上划取消</view>
		</view>
	</view>



</template>

<script>
	import config from '../../uni_modules/uview-ui/libs/config/config';
	export default {
		data() {
			return {
				plusShow: true,
				keyShow: false,
				recordShow: false,
				textShow: true,
				focus: false,
				send_show: true,
				exit_show: false,
				voice: true,
				voice_play: false,
				messages: [], // 保存聊天消息的数组
				newMessage: '', // 用户输入的新消息
				userInfo: '',
				id: '',
				msgType: 1,
				name: '',
				img: '',
				currentUser: {},
				token: '',
				recording: false,
				// showDurationPopup: false,
				// showCancelPopup: false,
				recordingDuration: 0,
				recorderManager: null,
				startY: 0,
				movingY: 0,
				pop: false,
				tmpRecords: "",
				startTime: 0,
				voiceTime: '',
				isLong: false, // 是否长大于宽，
				sessionId: '',
				sessionType: 1,
				jobId:''
			};
		},
		mounted() {
			// 消息页面加载时从本地存储获取消息记录
			const storedMessages = uni.getStorageSync('chatMessages_' + this.userInfo.id);
			if (storedMessages) {
				this.messages = storedMessages;
			}
			this.scrollToBottom();


			// 音频获取 RecorderManager 对象
			this.recorderManager = uni.getRecorderManager();

			// 监听录音结束事件
			this.recorderManager.onStop((res) => {
				const {
					duration,
					tempFilePath
				} = res;
				this.recordingDuration = Math.floor(duration);
				// this.showDurationPopup = true;
				this.tmpRecords = tempFilePath
				console.log("录音", tempFilePath)
				// 在这里可以将 tempFilePath 上传到服务器
				// console.log("移动",this.movingY)
				// if (this.movingY < -50) {
				// 	this.cancelRecord()
				// 	console.log("取消了~")
				// } else {
				// 	console.log("取消了111~")
				// 	let arr = new Array()
				// 	arr.push(this.tmpRecords)
				// 	this.sendImage(arr)
				// }
				this.sendVoice()
			});

		},
		onLoad(options) {
			console.log("options", options)
			this.userInfo = options
			this.sessionType = options.type
			this.jobId = options.jobId
			console.log("jobId", options.jobId)
			this.setTitle(this.userInfo.name)
			// this.connectSocket()
			this.sendOneMessage()
			this.id = uni.getStorageSync("userId")
			this.receiveMessage()
			this.getUserInfo()
			this.token = uni.getStorageSync("token")
		},

		onUnload() {
			this.sendCloseMsg()
		},
		methods: {
			iconChange() {
				this.plusShow = (this.plusShow) ? false : true
				this.keyShow = (this.keyShow) ? false : true
			},

			inputChange() {
				this.recordShow = (this.recordShow) ? false : true
				this.textShow = (this.textShow) ? false : true
				this.keyShow = false
				this.plusShow = true
			},

			sendTextMsg() {
				this.msgType = 1
				this.sendMessage()
			},
			sendCloseMsg() {
				const newMsg = {
					sendId: this.id,
					type: 2,
					content: "关闭消息"
				};
				let self = this
				// 发送消息
				uni.sendSocketMessage({
					data: JSON.stringify(newMsg), // 要发送的消息内容
					success(res) {
						console.log('关闭消息发送成功', res);
						self.stopHeartBeat()
					},
					fail(err) {
						console.error('关闭消息发送失败', err);
					},
				});
			},
			sendMessage() {
				// this.focus = true
				if (this.newMessage.trim() !== '') {
					const newMsg = {
						sendId: this.id,
						receiveId: this.userInfo.id,
						content: this.newMessage.trim(),
						type: 3,
						msgType: this.msgType,
						sessionId: this.userInfo.sessionId,
						times: this.voiceTime,
						sessionType: this.sessionType,
						jobId: this.jobId
					};

					console.log("消息", newMsg)
					console.log("消息session", this.userInfo.sessionId)

					// 发送消息
					uni.sendSocketMessage({
						data: JSON.stringify(newMsg), // 要发送的消息内容
						success(res) {
							console.log('消息发送成功', res);
						},
						fail(err) {
							console.error('消息发送失败', err);
						},
					});

					// 将新消息添加到数组中
					this.messages.push(newMsg);
					console.log("存储前", newMsg)
					// 将更新后的消息记录存储到本地
					uni.setStorageSync('chatMessages_' + this.userInfo.id, this.messages);
					console.log("已缓存", this.messages)

					this.scrollToBottom();

					this.newMessage = ''; // 清空输入框

					const storedMessages = uni.getStorageSync('chatMessages_' + this.userInfo.id);
					if (storedMessages) {
						this.messages = storedMessages;
						this.messages.forEach(message => {
							message.voice = true
						})
					}

				}
			},

			receiveMessage() {
				// 监听 WebSocket 接收消息事件
				const self = this;
				uni.onSocketMessage(function(res) {

					let arr = JSON.parse(res.data)
					console.log('收到服务器消息：', arr);
					if (arr.isSystem === 1 && arr.type === 1) {
						if (arr.sessionId) {
							self.setSession(arr.sessionId)
						}
						console.log("sessionID", arr.sessionId)

					} else if (arr.isSystem === 0 && arr.type !== 5) {
						self.cacheMsg(arr)
						self.readMessage(arr.id)
						console.log('缓存了');
					} else if (arr.isSystem === 1 && arr.type === 2) {
						self.closeSocket()
					}

				});
			},

			big(url) {
				console.log(url)
				let arr = new Array()
				arr.push(url)
				uni.previewImage({
					urls: arr
				})
			},
			//已读回执消息
			readMessage(id) {
				const newMsg = {
					id: id,
					content: "已读消息",
					sessionId: this.userInfo.sessionId,
					type: 5,
				};

				console.log("消息", newMsg)

				// 发送消息
				uni.sendSocketMessage({
					data: JSON.stringify(newMsg), // 要发送的消息内容
					success(res) {
						console.log('已读消息发送成功', res);
					},
					fail(err) {
						console.error('已读消息发送失败', err);
					},
				});
			},
			setSession(id) {
				console.log("sessionID111", id)

				this.userInfo.sessionId = id
			},
			setTitle(name) {
				if (name) {
					uni.setNavigationBarTitle({
						title: name,
					});
				}
			},

			chooseImg() {
				let self = this
				this.msgType = 2
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
						self.sendImage(res.tempFilePaths)
					}
				});
			},
			sendImage(arr) {
				console.log(arr)
				let self = this
				arr.forEach(img => {
					uni.uploadFile({
						url: this.reqUrl + "/file/upload",
						filePath: img,
						name: 'file', // 服务端接收的字段名
						formData: this.formData,
						header: {
							'Authorization': this.token
						},
						success: (uploadRes) => {
							console.log("uploadRes", uploadRes.statusCode)
							if (uploadRes.statusCode === 200) {
								this.newMessage = JSON.parse(uploadRes.data).data;
								console.log(JSON.parse(uploadRes.data).data)
								self.sendMessage()
							} else {
								uni.showToast({
									title: '上传失败！',
									icon: 'error'
								})
							}

						},
						fail: (error) => {
							console.error('上传失败', error);
							// 处理上传失败的逻辑
						},
					})
				})
			},
			cacheMsg(arr) {
				arr.voice = true
				// 	if (arr.msgType === 3) {
				// 		const indexOfEqualSign = arr.content.indexOf('=');
				// 		const numberAfterEqualSign = arr.content.substr(indexOfEqualSign + 1);
				// 		const durationTime = parseInt(numberAfterEqualSign, 10) / 1000;

				// 		arr.time = durationTime.toFixed(0)
				// 	}


				this.messages.push(arr);
				uni.setStorageSync('chatMessages_' + this.userInfo.id, this.messages);
				this.scrollToBottom()
			},

			connectSocket() {
				return new Promise((resolve, reject) => {
					const self = this;
					// 在页面中打开 WebSocket 连接
					uni.connectSocket({
						url: this.webSocket, // WebSocket服务器地址
						header: {
							"Authorization": this.token
						},
						success(res) {
							console.log('WebSocket连接成功', res);
							self.heartMsg();
							// setTimeout(() => {
							// self.registerMessage();
							// }, 400); // 这里延迟执行2秒，可以根据需要调整延迟时间
							setTimeout(() => {
								console.log('Method A execution completed.');
								resolve(); // 当方法A执行完成时调用resolve
							}, 1000); // 这里模拟一个异步操作，例如耗时2秒
						},
						fail(err) {
							console.error('WebSocket连接失败', err);
						},
					});
				});
			},

			sendOneMessage() {
				this.connectSocket().then(() => {
					this.registerMessage()
				})
			},

			stopHeartBeat() {
				clearInterval(this.heartBeatInterval); // 清除心跳定时器
			},

			heartMsg() {
				let self = this
				this.heartBeatInterval = setInterval(() => {
					const newMsg = {
						sendId: this.id,
						content: "心跳消息",
						sessionId: this.userInfo.sessionId,
						type: 0,
					};

					// 发送消息
					uni.sendSocketMessage({
						data: JSON.stringify(newMsg), // 要发送的消息内容
						success(res) {
							console.log('心跳消息发送成功', res);
						},
						fail(err) {
							console.error('心跳消息发送失败', err);
							self.stopHeartBeat()
						},
					});
				}, 10000); // 每隔5秒发送一次心跳消息
			},
			registerMessage() {
				
				const newMsg = {
					sendId: this.id,
					receiveId: this.userInfo.id,
					type: 1,
					sessionType: this.sessionType,
					jobId: this.jobId
				};
				
				console.log("注册消息发送内容",newMsg)

				// 发送消息
				uni.sendSocketMessage({
					data: JSON.stringify(newMsg), // 要发送的消息内容
					success(res) {
						console.log('注册消息发送成功', res);
						// this.userInfo.sessionId = res.data.data
					},
					fail(err) {

						console.error('注册消息发送失败', err);
						console.error('注册消息data', newMsg);
						this.registerMessage()
					},
				});

			},

			closeSocket() {
				uni.closeSocket({
					success(res) {
						console.log('WebSocket连接已关闭', res);
						// self.stopHeartBeat()
					},
					fail(err) {
						console.error('WebSocket关闭失败', err);
					},
				});
			},
			getUserInfo() {

				const token = uni.getStorageSync("token")
				uni.request({
					url: this.reqUrl + "/userInfo",
					method: 'GET',
					header: {
						'Authorization': token
					},
					success: (res) => {
						if (res.data.code === 200) {
							this.currentUser = res.data.data
						}

					}
				})
			},
			scrollToBottom() {
				setTimeout(() => {
					uni.pageScrollTo({
						scrollTop: 9999,
						duration: 0
					});
				}, 100); // 设置一个适当的延迟时间，例如100毫秒
			},
			startRecord(event) {
				// 记录开始触摸的位置
				this.startY = event.touches[0].clientY;
				this.pop = true

				// 开始录音
				this.recording = true;
				this.startTime = Date.now()
				this.startTime = new Date().getTime();
				console.log("开始录音~")
				//消息类型
				this.msgType = 3

				// 开始录音
				this.recorderManager.start({
					format: 'mp3', // 录音的格式
				});
			},
			sendVoice() {
				if (this.movingY < -50) {
					console.log("移动", this.movingY)
					this.cancelRecord()
					console.log("取消了1111~")
				} else {
					let arr = new Array()
					console.log("取消了111222~")
					arr.push(this.tmpRecords)
					this.sendImage(arr)
				}

				this.movingY = 0
			},
			stopRecord() {
				// 结束录音

				this.recording = false;
				this.recorderManager.stop();
				this.pop = false
				this.send_show = true
				this.exit_show = false
				let endTime = Date.now() - this.startTime
				this.voiceTime = (endTime / 1000).toFixed(0)
				console.log("录音结束")

			},
			cancelRecord() {
				// 取消录音
				this.recording = false;
				console.log("录音取消")
				// this.showCancelPopup = true;
				this.recorderManager.stop(); // 停止录音
			},
			touchMove(event) {
				if (!this.recording) return;

				// 计算手指移动的距离
				this.movingY = event.touches[0].clientY - this.startY;

				console.log("移动距离", this.movingY)

				// 如果手指上滑超过一定距离，显示取消录音的弹框
				if (this.movingY < -50) {
					// this.showCancelPopup = true;

					this.exit_show = true
					this.send_show = false
				} else {
					// this.showCancelPopup = false;

					this.exit_show = false
					this.send_show = true
				}
			},
			//播放语音
			voicePlay(voiceUrl, index) {
				console.log("语音播放", voiceUrl)
				const innerAudioContext = uni.createInnerAudioContext();
				this.voice = false
				this.messages[index].voice_play = true
				this.messages[index].voice = false
				innerAudioContext.autoplay = true;
				innerAudioContext.src = voiceUrl;
				//开始播放
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
				});
				innerAudioContext.onCanplay(() => {
					const duration = innerAudioContext.duration;
					console.log('音频时长：', duration);
					console.log('音频时长：', innerAudioContext);

				});

				//播放结束
				innerAudioContext.onEnded((res) => {
					this.voice = true
					this.messages[index].voice_play = false
					this.messages[index].voice = true
				});
				//播放错误
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
			},
		}
	};
</script>

<style>
	.box {
		position: fixed;
		bottom: 0;
		width: 100%;
		/* height: 80px; */
		background: white;
		border-bottom: 4px;
		/* margin-bottom: 20px; */
	}

	.container {
		padding: 2% 0;
		width: 98%;
		display: flex;
		align-items: center;
		background-color: white;
		margin-bottom: 1vh;
	}

	.inp_comm {
		padding: 1% 1% 1% 4%;
		width: 72%;
		/* flex: 80; */
		border: 1px solid #ccc;
		border-radius: 20px;
		margin: 0px 2px 10px 4px;
	}

	.records {
		width: 77.5%;
		height: 33px;
		line-height: 30px;
		text-align: center;
		background-color: #E7E5E4;
		color: black;
		border-radius: 20px;
		margin: 0px 2px 10px 4px;
	}

	.keyA-icon {
		/* padding: 1px; */
		width: 30px;
		height: 32px;
		flex: 12;
		margin-left: 2vw;
		margin-bottom: 10px;
	}

	.keyB-icon {
		/* padding: 1px; */
		width: 33px;
		height: 37px;
		flex: 13;
		margin-bottom: 10px;
	}

	.plus-info {
		background: #fafafa;
		display: flex;
		flex-direction: row;
		height: 100px;
		padding-bottom: 2vh;
	}

	.button-item {
		padding: 5%;
		text-align: center;
	}

	.icon {
		width: 30px;
		height: 30px;
	}

	.text {
		font-size: small;
		color: gray;
	}

	.chatImg-L {
		max-width: 100px;
		max-height: 100px;
		border-radius: 10px;
		object-fit: fill;
		margin-left: 2%;
	}




	.chatImg-R {
		height: 150px;
		width: 90px;
		border-radius: 10px;
		/* object-fit: fill; */
		margin-right: 2%;
	}




	/* 样式可以根据需求进行修改 */
	.container1 {
		/* display: flex;
		flex-direction: column; */
		/* height: 100vh; */
		padding: 1vw 0 25vw 0;
	}

	/* .chat-container {
		flex: 1;
		overflow-y: scroll;
		padding: 10px;
	} */

	.message-a {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		margin-top: 4%;
	}

	.message-b {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		width: 100%;
		margin-top: 4%;
	}

	.a-img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.b-img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.a-text {
		background-color: #E5E5EA;
		padding: 8px;
		border-radius: 8px;
		margin-bottom: 8px;
		margin-left: 2%;
		width: auto;
	}

	.b-text {
		background-color: #DCF8C6;

		padding: 8px;
		border-radius: 8px;
		margin-right: 2%;
		width: auto;
	}

	.input-container {
		display: flex;
		align-items: center;
	}

	.pop {
		position: fixed;
		top: 50%;
		left: 30%;
		width: 40%;
		height: 21%;
		text-align: center;
		background-color: #292524;
		color: #f4ea2a;
		border-radius: 20px;
		font-size: 14px;
	}

	.start-text {
		color: white;
	}

	.quxiao {
		width: 60px;
		height: 60px;
		margin-top: 25%;
		margin-bottom: 5%;
	}

	.voice {
		width: 20px;
		height: 20px;
	}

	.voice1 {
		width: 20px;
		height: 20px;
		transform: rotate(180deg);
	}

	.voice-time {
		margin: 0 15px 0 15px;
	}

	.voice-view1 {
		background-color: #E5E5EA;
		padding: 6px;
		border-radius: 8px;
		font-size: 12px;
		display: flex;
		align-items: center;
		margin-right: 2%;
		margin-left: 2%;
	}

	.voice-view {
		background-color: #DCF8C6;
		padding: 6px;
		border-radius: 8px;
		font-size: 12px;
		display: flex;
		align-items: center;
		margin-right: 2%;
		margin-left: 2%;
	}
</style>