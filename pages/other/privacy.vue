<template>
	<view class="page">
		<uni-icons class="icon" type="back" @tap="back()" size="30"></uni-icons>
		<!-- <view class="content">
			本指引是几方惠同小程序开发者 "陕西壹控智飞智能科技有限公司"（以下简称“开发者”）为处理你的个人信息而制定。<br>
			
			开发者处理的信息<br>
			根据法律规定，开发者仅处理实现小程序功能所必要的信息。<br>
			
			为了短信提醒服务，开发者将在获取你的明示同意后，收集你的手机号。<br>
			你的权益<br>
			关于你的个人信息，你可以通过以下方式与开发者联系，行使查阅、复制、更正、删除等法定权利。<br>
			
			若你在小程序中注册了账号，你可以通过以下方式与开发者联系，申请注销你在小程序中使用的账号。在受理你的申请后，开发者承诺在十五个工作日内完成核查和处理，并按照法律法规要求处理你的相关信息。<br>
			
			电话:13892451318<br>
			
			开发者对信息的存储<br>
			 开发者承诺，除法律法规另有规定外，开发者对你的信息的保存期限应当为实现处理目的所必要的最短时间。<br>
			
			信息的使用规则<br>
			开发者将会在本指引所明示的用途内使用收集的信息<br>
			
			如开发者使用你的信息超出本指引目的或合理范围，开发者必须在变更使用目的或范围前，再次以短信通知方式告知并征得你的明示同意。<br>
			
			信息对外提供<br>
			开发者承诺，不会主动共享或转让你的信息至任何第三方，如存在确需共享或转让时，开发者应当直接征得或确认第三方征得你的单独同意。<br>
			
			开发者承诺，不会对外公开披露你的信息，如必须公开披露时，开发者应当向你告知公开披露的目的、披露信息的类型及可能涉及的信息，并征得你的单独同意。<br>
			
			你认为开发者未遵守上述约定，或有其他的投诉建议、或未成年人个人信息保护相关问题，可通过以下方式与开发者联系；或者向微信进行投诉。<br>
			电话 : 13892451318<br>
			
			更新日期：2023-11-27<br>
			
			生效日期：2023-11-27<br>
			
			
		</view> -->
		<web-view src="https://ykfly.com/dj/privacy.html"></web-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		
		methods: {
			back() {
				uni.redirectTo({
					url: '/pages_login/login/wxLogin'
				})
			}
		}
	}
</script>

<style>
	.page {
		padding: 2%;
		font-size: 14px;
		color: gray;
	}

	.icon {
		position: fixed;
		top: 6%;
		left: 4%;
		color: #777;
		z-index: 10;
	}

	.content {
		margin-top: 25%;
	}
</style>