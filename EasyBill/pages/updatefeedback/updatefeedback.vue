<template>
	<uni-card title="版本与软件更新" is-full class="shadow br-8 mb-16" :border="false">
		<uni-row>
			当前版本：<uni-tag text="2.1.0" type="primary" inverted />
		</uni-row>
		<uni-row class="mt-8" style="word-break: break-all;">
			查询新版本：<uni-link href="https://gitee.com/raoyingjun/EasyBill/blob/master/EasyBill/readme.md"
				text="https://gitee.com/raoyingjun/EasyBill/blob/master/EasyBill/readme.md" color="#007BFF" />
		</uni-row>
	</uni-card>
	<uni-card title="反馈与建议" is-full class="shadow br-8" :border="false">
		<uni-row>
			如您有想法、建议、发现漏洞、反馈等，请通过邮箱联系我。
		</uni-row>
		<uni-row class="mt-8">
			邮箱：<uni-link href="mailto:royinrao@qq.com" text="royinrao@qq.com" color="#007BFF" />
		</uni-row>
	</uni-card>
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