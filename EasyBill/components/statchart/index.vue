<template>
	<view>
		<qiun-data-charts type="area" :chartData="chartExpenseArea.data" :opts="chartExpenseArea.opts" />
		<qiun-data-charts type="area" :chartData="chartIncomeArea.data" :opts="chartIncomeArea.opts" />
		<qiun-data-charts type="area" :chartData="chartSpendingArea.data" :opts="chartSpendingArea.opts" />
		<qiun-data-charts type="pie" :chartData="chartAmountValues.data" :opts="chartAmountValues.opts" />
		<qiun-data-charts type="pie" :chartData="chartCountValues.data" :opts="chartCountValues.opts" />
	</view>
</template>

<script setup>
	import {
		computed,
		reactive
	} from 'vue'

	const props = defineProps({
		data: Object
	})
	const chartGenerator = ({
		data,
		categories,
		name,
		label
	}) => {
		return {
			data: {
				categories,
				series: [{
					name,
					data
				}]
			},
			opts: {
				dataLabel: label,
				xAxis: {
					disabled: true,
				},
				yAxis: {},
				extra: {
					column: {

					},
					area: {
						type: 'curve',
					}
				}
			}
		}
	}

	const chartExpenseArea = computed(() => chartGenerator({
		type: 'area',
		data: props.data.expenseValues,
		categories: props.data.categories,
		name: '收支合计',
		label: false,
	}))
	const chartIncomeArea = computed(() => chartGenerator({
		type: 'area',
		data: props.data.incomeValues,
		categories: props.data.categories,
		name: '总收入',
		label: false,
	}))
	const chartSpendingArea = computed(() => chartGenerator({
		type: 'area',
		data: props.data.spendingValues,
		categories: props.data.categories,
		name: '总支出',
		label: false,
	}))
	const chartAmountValues = computed(() => chartGenerator({
		data: props.data.amountValues,
		name: '支出与收入收支占比',
		label: true,
	}))
	const chartCountValues = computed(() => chartGenerator({
		data: props.data.countValues,
		name: '支出与收入笔数占比',
		label: true,
	}))
</script>

<style>
</style>