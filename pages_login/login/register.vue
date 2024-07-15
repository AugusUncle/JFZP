<template>
	<view class="pag">
		<view class="page">
			<text class="text">用户注册</text>
			<input class="input" placeholder="账户名" @blur="checkName" v-model="data.account" required>
			<p class="tishi" v-if="nameErr">{{nameInfo}}</p>
			<input class="input" placeholder="手机号" v-model="data.mobile" @blur="checkPhone" />
			<p class="tishi" v-if="err1">{{errInfo}}</p>
			<input class="input" placeholder="密码"  />
			<input class="input" placeholder="密码" v-model="data.password" @blur="checkPsd" />
			<input class="input" placeholder="验证码" v-model="data.code" />

			<button type="primary" class="regBtn">注册</button>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nameErr: false ,
				phoneErr: false ,
				psdErr: false ,
				nameInfo: "",
				phoneInfo: "",
				psdInfo :"",
				data: {
					account: '',
					mobile: '',
					code: '',
					password: ''
				}

			}
		},
		methods: {
			checkName() {
				const pattern = /^[a-zA-Z0-9_]+$/;
				if (pattern.test(this.data.account)) {
					this.nameErr = false
				}else{
					this.nameErr = true
					this.nameInfo="仅支持字母、数字、下划线（_）"
				}
			},
			checkPhone(){
				const phoneNumberRegex = /^[1-9]\d{10}$/;
				if (phoneNumberRegex.test(this.data.mobile)
				) {
					this.phoneErr = false; // 有效的手机号码
				} else {
					this.phoneErr = true; // 无效的手机号码
					this.phoneInfo = '请输入有效的手机号码'
				}
			},
			checkPsd(){
				
			}
		}
	}
</script>

<style>
	.pag {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.page {

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background-color: white;
		width: 90%;
		height: auto;
		border-radius: 10px 10px 10px 10px;
		margin-top: 50px;
	}

	.input {
		width: 80%;
		height: 30px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 28rpx;
		padding-left: 4rpx;
		margin-top: 30px;

	}

	.text {
		font-size: 30px;
		font-weight: 800;
		margin-top: 10px;
	}

	.regBtn {
		margin-bottom: 20px;
		margin-top: 20px;
	}

	.tishi {
		font-size: 20rpx;
		color: red;
	}
</style>