<template>
	<view>
		<image src="/static/banner.webp" mode="widthFix" class="center banner"></image>
		<uni-card :title="item.title" :extra="`热搜指数：${item.focus}`" v-for="item in list">
			{{item.desc}}
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				list: [{
						title: "中德关系始终稳健发展",
						desc: "4月16日，国家主席习近平会见德国总理朔尔茨。习近平指出，今年是中德建立全方位战略伙伴关系10周年。10年来，中德关系始终稳健发展。",
						focus: 4939936
					}, {
						title: "中美国防部长视频通话",
						desc: "4月16日晚， 国防部长董军应约同美国国防部长奥斯汀视频通话。 董军表示， 中美两国元首致力于推动双边关系稳下来、 好起来。",
						focus: 4870827
					}, {
						title: "女子躺飞机座椅 乘客齐喊： 下去",
						desc: "4月16日， 在桂林航空某航班上， 一女子不符合乘机条件， 躺在座椅上拒绝下飞机， 导致航班延误两个多小时。 乘客高呼：“ 下去”。",
						focus: 4788844
					}, {
						title: "国家安全秒秒与你相关",
						desc: "一秒钟， 是点击鼠标的刹那， 是按下快门的瞬间， 是放松警惕的片刻。 用一秒钟谨慎， 保千万分安全。 贯彻落实保密法， 你我都是保密人。",
						focus: 4698161
					}, {
						title: "薛之谦演唱会眼镜哥被质疑系策划",
						desc: "近日， 薛之谦演唱会眼镜哥事件发酵引热议。 众多网友质疑薛之谦演唱会一个人来的事件是策划炒作， 在男生直播中刷礼物的也都是托儿。",
						focus: 4578935
					},
					{
						title: "火车下铺权益之争",
						desc: "近日， 阿姨吐槽年轻人卧铺挂帘不让坐引发讨论。 媒体指出， 旅客在高峰时段想买下铺却不一定能买到， 因此解题主动权在铁路部门。",
						focus: 4578935
					}
				]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style scoped>
	page {
		padding: 16px 0 4px;
	}

	.banner {
		margin: 0 auto;
		border-radius: 4px;
		width: calc(100% - 30px);
	}
</style>