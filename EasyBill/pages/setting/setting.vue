<template>
	<view>
		<Banner />
		<uni-section title="设置与选项" sub-title="管理个人数据及偏好设置" type="line" class="mt-16">
			<uni-card is-full :border="false" :is-shadow="false" padding="0" margin="0">
				<uni-list>
					<uni-list-item title="数据导入与导出" note="将本地数据导出或从外导入数据到本地" showArrow clickable
						to="/pages/importexport/importexport" />
					<uni-list-item title="软件更新与反馈建议" note="查询软件版本信息以及发送反馈和建议" showArrow clickable
						to="/pages/updatefeedback/updatefeedback" />
					<uni-list-item title="清除本地所有数据" note="所有数据均被存储在本地, 清除后将无法找回" showArrow clickable @click="clear" />
					<uni-list-item title="使用协议及隐私政策" note="使用本软件的协议, 用户隐私, 个人数据等" showArrow clickable
						to="/pages/policy/policy" />
				</uni-list>
			</uni-card>
		</uni-section>
	</view>
</template>

<script>
	import Banner from '@/components/banner/index.vue'
	export default {
		components: {
			Banner
		},
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {
			clear() {
				uni.showModal({
					title: '操作提醒',
					content: '确认清除本地所有数据吗？该操作无法撤回，您的所有数据将丢失！',
					success(res) {
						if (res.confirm) {
							uni.clearStorageSync()
							uni.showToast({
								title: '本地数据已清除',
								mask: true
							})
						}
					}
				})

			}
		}
	}
</script>

<style>

</style>