<script>
	export default {
		onLaunch: function() {
			this.watchMidButton()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			watchMidButton() {
				uni.onTabBarMidButtonTap(() => {
					uni.navigateTo({
						url: '/pages/createbill/createbill'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	/* 每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	@import '@/styles/index.scss';
</style>
