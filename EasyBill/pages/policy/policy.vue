<template>
	<view>
		<uni-card title="使用协议" is-full :border="false" :is-shadow="false">
			<text>
				本软件程序开发与著作人为 Royin,
				系个人开发者,
				以下皆称“本人”。
				本软件基于 Dcloud 旗下 uni-app 技术开发。
				发行到包括但不限于“苹果 App”, “安卓 App”,
				“微信小程序”, “支付宝小程序”等渠道。
				本软件仅供学习使用目的。
				本软件系公益性质。
				用户可自行选择是否使用该软件。
				本人不承担任何方面法律风险。
			</text>
		</uni-card>
		<uni-card title="用户隐私" is-full :border="false" :is-shadow="false">
			<text>
				本软件不存储用户任何信息。
				本软件仅包括为了实现功能所需要的必要业务数据，
				其中不掺杂用户任何信息。
				本软件不泄露和使用您的任何隐私数据。
			</text>
		</uni-card>
		<uni-card title="个人数据" is-full :border="false" :is-shadow="false">
			<text>
				您的个人数据均存储在本地，不存储到云端。
				您更换设备、更换渠道、手机刷机等情况时，
				请先导出您的数据，否则您的数据将会丢失。
				您的情况处理完毕后，
				您可以再次导入个人数据以继续使用。
			</text>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>