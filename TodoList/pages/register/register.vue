<template>
	<view style="margin-top: 60px;">
		<uni-card>
			<uni-title title="注册" type="h1" class="center" />
			<uni-forms ref="form" :rules="rules" :model="form" label-width="80px">
				<uni-forms-item label="用户名" name="username" required>
					<uni-easyinput v-model="form.username" placeholder="请输入用户名" />
				</uni-forms-item>
				<uni-forms-item label="密码" name="password" required>
					<uni-easyinput v-model="form.password" placeholder="请输入密码" />
				</uni-forms-item>
				<uni-forms-item label="确认密码" name="confirmPassword" required>
					<uni-easyinput v-model="form.confirmPassword" placeholder="请输入密码" />
				</uni-forms-item>
				<uni-forms-item label=" ">
					<button type="primary" size="mini" @click="login">注册</button>
					<button size="mini" @click="to('/pages/login/login')" style="margin-left: 8px;">已有账户？去登录</button>
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
					confirmPassword: '',
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
					},
					confirmPassword: {
						rules: [{
							required: true,
							errorMessage: '确认密码不能为空'
						}, {
							validateFunction(rule, confirmPassword, form, callback) {
								if (confirmPassword !== form.password) {
									callback('两次输入密码不一致')
								}
								return true
							}
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
						title: "注册成功",
					})
					setTimeout(() => {
						this.to("/pages/login/login")
					}, 1500)
				})
			}
		}
	}
</script>

<style>

</style>