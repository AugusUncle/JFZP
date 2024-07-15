<template>
	<view>
		<web-view :src="url"></web-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		onLoad() {
			this.url = query.url
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
