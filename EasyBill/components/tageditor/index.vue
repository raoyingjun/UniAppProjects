<template>
	<view class="flex">
		<template v-for="(tag, index) in tags">
			<uni-tag v-if="editable ? true : tag.checked" class="mr-4 my-4" :text="`${tag.text} ${isDelete ? '×' : ''}`"
				@click="updateTag(tag.id)" :type="isDelete? 'error' : tag.checked ? 'primary' : 'default'"
				:inverted="!tag.checked" size="small" />
		</template>
		<template v-if="editable">
			<uni-tag :star="false" text="+ 标签" @click="createTagDialog.open()" class="mr-4 my-4" type="primary"
				inverted="" size="small" />
			<uni-tag :star="false" :text="isDelete ? '× 取消删除' : '× 删除标签'" @click="deletable" class="mr-4 my-4"
				type="error" inverted="" size="small" />
			<uni-popup ref="createTagDialog" type="dialog">
				<uni-popup-dialog mode="input" title="创建新标签" placeholder="输入标签名称" @confirm="createTag" />
			</uni-popup>
		</template>
	</view>
</template>

<script setup>
	import {
		cloneDeep
	} from 'lodash';
	import {
		computed,
		onBeforeUpdate,
		onUpdated,
		reactive,
		ref
	} from 'vue';
	import {
		useRoute
	} from 'vue-router';

	const query = getCurrentPages()[getCurrentPages().length - 1].$page.options
	const props = defineProps({
		modelValue: {
			/**
			 *	[id1, id2, id3]
			 */
			type: Array,
			default: () => []
		},
		editable: Boolean
	})
	const emits = defineEmits(['create', 'delete', 'change'])
	const createTagDialog = ref()

	const tags = ref([])
	const fetchTags = () => {
		tags.value = (uni.getStorageSync(`bill-${query.id}-tag-keys`) || [])
			.map(id => uni.getStorageSync(`bill-${query.id}-tag-${id}`))
			.map(v => {
				return props.modelValue.includes(v.id) ? {
					checked: true,
					...v
				} : v
			})
	}
	const createTag = text => {
		if (!text) {
			uni.showToast({
				icon: 'error',
				title: '标签名不能为空',
				mask: true
			})
			return
		}
		emits('create', text)
		fetchTags();
	}

	const isDelete = ref(false)
	const deletable = () => {
		isDelete.value = !isDelete.value
	}

	const updateTag = (id) => {
		if (isDelete.value) {
			emits('delete', id)
		} else {
			emits('change', id)
		}
		fetchTags();
	}
	fetchTags();
</script>

<style>
</style>