<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
</style>
<script>
	export default {
		onLaunch: function() {
			console.log("onlunch")
			uni.setTabBarItem({
				index: 0,
				iconPath: "https://jfzp.ykfly.com/jfht/icon/home.png",
				selectedIconPath: "https://jfzp.ykfly.com/jfht/icon/home1.png"
			})
			uni.setTabBarItem({
				index: 1,
				iconPath: "https://jfzp.ykfly.com/jfht/icon/video.png",
				selectedIconPath: "https://jfzp.ykfly.com/jfht/icon/video1.png"
			})
			uni.setTabBarItem({
				index: 2,
				iconPath: "https://jfzp.ykfly.com/jfht/icon/quanzi.png",
				selectedIconPath: "https://jfzp.ykfly.com/jfht/icon/quanzi1.png"
			})
			uni.setTabBarItem({
				index: 3,
				iconPath: "https://jfzp.ykfly.com/jfht/icon/chat.png",
				selectedIconPath: "https://jfzp.ykfly.com/jfht/icon/chat1.png"
			})
			uni.setTabBarItem({
				index: 4,
				iconPath: "https://jfzp.ykfly.com/jfht/icon/my.png",
				selectedIconPath: "https://jfzp.ykfly.com/jfht/icon/my1.png" 
			})
		},
		onShow: function() {
			console.log("onShow")
			
		},
		onHide: function() {
			console.log('App Hide')
		},

	}
</script>

<style>
	/*每个页面公共css */
	body {
		background-color: #FAFAFA;

	}
</style>