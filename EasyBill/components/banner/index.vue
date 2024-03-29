<template>
	<uni-card is-full :border="false" class="br-8 shadow card" padding="24px">
		<uni-title title="欢迎使用易账" type="h1" />
		<text class="intro">用易账，轻松记账。让记账变得简单容易。</text>
	</uni-card>
</template>

<script>
</script>

<style lang="scss">
	@keyframes toggle {
		from {
			transform: scale(3) rotate(0turn);


		}

		to {
			transform: scale(3) rotate(1turn);

		}
	}

	.card {
		border: 1px solid #5EA0FF;
		animation: spin 1s;
		&::before {
			content: "";
			display: block;
			width: 100vw;
			height: 100vw;
			left: 0;
			top: 0;
			position: absolute;
			background: radial-gradient(at right top, rgba(94, 161, 255, .3) 10%, transparent 70%);
			animation: toggle 5s infinite linear;
		}
	}
</style>