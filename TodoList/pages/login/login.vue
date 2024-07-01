<template>
	<view style="margin-top: 60px;">
		<uni-card>
			<uni-title title="登录" type="h1" class="center" />
			<uni-forms ref="form" :rules="rules" :model="form">
				<uni-forms-item label="用户名" name="username" required>
					<uni-easyinput v-model="form.username" placeholder="请输入用户名" />
				</uni-forms-item>
				<uni-forms-item label="密码" name="password" required>
					<uni-easyinput v-model="form.password" placeholder="请输入密码" />
				</uni-forms-item>
				<uni-forms-item label=" ">
					<button type="primary" size="mini" @click="login">登录</button>
					<button size="mini" @click="to('/pages/register/register')" style="margin-left: 8px;">没有账户？去注册</button>
				</uni-forms-item>
			</uni-forms>
		</uni-card>
		<uni-link href="#" text="用户使用协议" class="center" />
	</view>

</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				form: {
					username: '',
					password: '',
				},
				rules: {
					username: {
						rules: [{
							required: true,
							errorMessage: '用户名不能为空'
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '密码不能为空'
						}]
					}
				},
			}
		},
		onLoad() {

		},
		methods: {
			to(url) {
				uni.navigateTo({
					url
				})
			},
			login() {
				this.$refs.form.validate().then(() => {
					uni.showToast({
						title: "登录成功",
					})
					setTimeout(() => {
						this.to("/pages/index/index")
					}, 1500)
				})
			}
		}
	}
</script>

<style>

</style>