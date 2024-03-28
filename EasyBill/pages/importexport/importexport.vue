<template>
	<view>
		<uni-card is-full title="导入数据到本地" sub-title="导入外部数据并存储到本地" :border="false" class="br-8 shadow">
			<uni-forms label-width="150rpx" :model="importForm">
				<uni-forms-item label="合并方式">
					<uni-data-checkbox v-model="importForm.type" :localdata="importType" />
				</uni-forms-item>
				<uni-forms-item label="选择文件">
					<!-- #ifdef H5 -->
					<uni-file-picker :auto-upload="false" ref="fileRef" file-extname="txt,json" limit="1"
						file-mediatype="all" @select="selectFile"></uni-file-picker>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<button @click="chooseImportFile" type="primary" size="mini">选择文件</button>
					<view>{{selectTip}}</view>
					<!-- #endif -->
				</uni-forms-item>
				<uni-forms-item label="">
					<button type="primary" size="mini" @click="importData">开始导入</button>
				</uni-forms-item>
			</uni-forms>
			<uni-notice-bar text="仅支持文件后缀为 .json 和 .txt 类型的文件" />
		</uni-card>
		<uni-card title="导出本地数据" sub-title="将本地所有数据导出为文件" is-full style="margin-top: 16px;" :border="false" class="br-8 shadow">
			<uni-forms label-width="150rpx" :model="exportForm">
				<uni-forms-item label="导出格式">
					<uni-data-checkbox v-model="exportForm.type" :localdata="exportType" />
				</uni-forms-item>
				<uni-forms-item label="文件命名">
					<uni-easyinput errorMessage v-model="exportForm.downloadFilename" focus placeholder="请输入内容" />
				</uni-forms-item>
				<uni-forms-item label="">
					<button type="primary" size="mini" @click="exportData">开始导出</button>
					<button @click="copy" size="mini" class="ml-8" type="primary" plain
						v-if="exportForm.json">复制到剪贴板</button>
				</uni-forms-item>
			</uni-forms>
			<uni-notice-bar :text="`导出文件保存位置: ${exportForm.savedPath}`" v-if="exportForm.savedPath" color="#2979FF"
				background-color="#EAF2FF" />
			<uni-notice-bar text="如果点击导出按钮未弹出下载提示, 请尝试复制数据到剪贴板并手动粘贴到文件内进行保存" v-if="exportForm.json" />
		</uni-card>

	</view>
</template>

<script>
	import {
		assign,
		assignWith,
		forIn,
		isEmpty,
		uniq
	} from 'lodash'
	import {
		v4 as uuidv4
	} from 'uuid'
	import {
		dateFormat
	} from '@/utils/format.js'

	export default {
		data() {
			return {
				query: getCurrentPages()[getCurrentPages().length - 1].$page.options,
				res: {},
				importForm: {
					type: 'merge',
					file: '',
					filename: ''
				},
				importType: [{
						text: '与本地数据合并',
						value: 'merge'
					},
					{
						text: '覆盖本地数据',
						value: 'cover'
					}
				],
				exportForm: {
					downloadFilename: `账本_${dateFormat(new Date(), '', '', '')}`,
					type: 'txt',
					json: '',
					savedPath: '',
				},
				exportType: [{
						text: '导出为文本文件（.txt）',
						value: 'txt'
					},
					{
						text: '导出为JSON文件（.json）',
						value: 'json'
					}
				],
			}
		},
		computed: {
			selectTip() {
				return this.importForm.filename ? `已选取文件: ${this.importForm.filename}` : '未选择文件'
			}
		},
		methods: {
			chooseImportFile() {
				const lemonjkFileSelect = uni.requireNativePlugin('lemonjk-FileSelect');
				lemonjkFileSelect.showNativePicker({
					navTitle: "选择文件以导入",
					navTextColor: '#ffffff',
					navBarBgColor: '#5EA0FF',
					filterConfig: {
						fileExtension: ['txt', 'json'], //属性数组满足其中一项 
					}
				}, result => {
					const {
						filePath,
						fileRealName,
						code,
						fileExtension
					} = result.files[0]
					
					if (code == 1001) {
						uni.showModal({
							title: "授权提醒",
							content: "未授权本应用读取文件权限，请授予权限以选取文件",
							confirmText: "去授权",
							cancelText: "拒绝",
							success(res) {
								if (res.confirm) {
									// 跳转到应用设置页
									lemonjkFileSelect.gotoSetting();
								}
							}
						})
					}
					
					if (['txt', 'json'].indexOf(fileExtension) === -1) {
						uni.showToast({
							title: '文件类型不支持',
							icon: 'error'
						})
						return
					}
					
					this.importForm.filename = fileRealName
					plus.io.requestFileSystem(plus.io.PUBLIC_DOWNLOADS,
						fs => {
							fs.root.getFile(filePath, {
									create: false
								},
								fileEntry => {
									fileEntry.file(
										file => {
											this.importForm.file = file
										},
										e => {
											uni.showToast({
												title: '获取文件时出错',
												icon: 'error'
											})
										})
								},
								e => {
									uni.showToast({
										title: '无法读取文件',
										icon: 'error'
									})
								});
						}, e => {
							uni.showToast({
								title: '请求授权时出错',
								icon: 'error'
							})
						});
				})
			},
			selectFile({
				tempFiles
			}) {
				this.importForm.file = tempFiles[0].file
			},
			importData() {
				if (!this.importForm.file) {
					uni.showToast({
						title: '请先选择文件',
						icon: 'error',
					})
					return
				}
				// #ifdef H5
				const fr = new FileReader()
				// #endif

				// #ifndef H5
				const fr = new plus.io.FileReader()
				// #endif

				fr.readAsText(this.importForm.file)
				fr.onload = e => {
					try {
						const data = JSON.parse(fr.result)
						if (this.importForm.type === 'cover') {
							uni.clearStorageSync()
						}

						for (const bill of data.bills) {
							const {
								id
							} = bill

							const bills = uni.getStorageSync('bills') || []
							const foundSameIndex = bills.findIndex(v => v.id === id)
							// 存在相同的数据
							if (foundSameIndex > -1 && this.importForm.type === 'merge') {
								// 处理账单
								if (new Date(bill.lastModifiedTime) > new Date(bills[foundSameIndex]
										.lastModifiedTime)) {
									assign(bills[foundSameIndex], bill)
									uni.setStorageSync('bills', bills)
								}
								// 处理标签
								;
								(data[`bill-${id}-tag-keys`] || []).forEach(
									_id => {
										const fountSameIndex = (uni
												.getStorageSync(`bill-${id}-tag-keys`) || [])
											.findIndex(id => id === _id)
										if (fountSameIndex > -1) {
											if (new Date(data[`bill-${id}-tag-${_id}`].datetime) > new Date(uni
													.getStorageSync(`bill-${id}-tag-${_id}`).datetime)) {
												const tag = uni.getStorageSync(`bill-${id}-tag-${_id}`)
												assign(tag, data[`bill-${id}-tag-${_id}`])
												uni.setStorageSync(`bill-${id}-tag-${_id}`, tag)
											}
										} else {
											const tags = (uni.getStorageSync(`bill-${id}-tag-keys`) || [])
											tags.push(_id)
											uni.setStorageSync(`bill-${id}-tag-keys`, tags)
											uni.setStorageSync(`bill-${id}-tag-${_id}`, data[
												`bill-${id}-tag-${_id}`])
										}
									}
								)
								// 处理流水
								;
								(data[`bill-${id}-expense-keys`] || []).forEach(
									_id => {
										const fountSameIndex = (uni
												.getStorageSync(`bill-${id}-expense-keys`) || [])
											.findIndex(id => id === _id)
										if (fountSameIndex > -1) {
											if (new Date(data[`bill-${id}-expense-${_id}`].lastModifiedTime) >
												new Date(uni
													.getStorageSync(`bill-${id}-expense-${_id}`)
													.lastModifiedTime)
											) {
												const expense = uni.getStorageSync(`bill-${id}-expense-${_id}`)
												assignWith(
													expense,
													data[`bill-${id}-expense-${_id}`],
													(objValue, srcValue, key) => key === 'tags' ?
													objValue :
													undefined
												)
												expense.tags = uniq([...expense.tags, ...data[
													`bill-${id}-expense-${_id}`].tags])
												uni.setStorageSync(`bill-${id}-expense-${_id}`, expense)
											}
										} else {
											const expenses = (uni.getStorageSync(`bill-${id}-expense-keys`) || [])
											expenses.push(_id)
											uni.setStorageSync(`bill-${id}-expense-keys`, expenses)
											uni.setStorageSync(`bill-${id}-expense-${_id}`, data[
												`bill-${id}-expense-${_id}`])
										}
									}
								)
							}
							// 不存在相同的数据
							else {
								bills.push(bill)
								uni.setStorageSync(`bill-${id}-expense-keys`, data[`bill-${id}-expense-keys`])
								uni.setStorageSync(`bill-${id}-tag-keys`, data[`bill-${id}-tag-keys`]);
								(data[`bill-${id}-expense-keys`] || []).forEach(
									_id => uni.setStorageSync(
										`bill-${id}-expense-${_id}`,
										data[`bill-${id}-expense-${_id}`])
								);
								(data[`bill-${id}-tag-keys`] || []).forEach(
									_id => uni.setStorageSync(
										`bill-${id}-tag-${_id}`,
										data[`bill-${id}-tag-${_id}`])
								)

								uni.setStorageSync('bills', bills)
							}
						}
						uni.showToast({
							title: '导入成功'
						})
					} catch (e) {
						uni.showToast({
							title: '无法解析数据',
							icon: 'error'
						})
					}

				}
			},
			copy() {
				uni.setClipboardData({
					data: JSON.stringify(this.exportForm.json)
				})
			},
			exportData() {
				if (!this.exportForm.downloadFilename) {
					uni.showToast({
						title: '文件必须命名',
						icon: 'error',
					})
					return
				}
				const {
					keys
				} = uni.getStorageInfoSync()
				const json = {}

				for (const key of keys) {
					if (key.indexOf('bill') > -1) {
						json[key] = uni.getStorageSync(key)
					}
				}

				if (isEmpty(json)) {
					uni.showToast({
						title: '无数据可导出',
						mask: true,
						icon: 'error'
					})
					return
				}

				this.exportForm.json = json

				const {
					type,
					downloadFilename,
				} = this.exportForm

				// #ifdef H5
				const url = window.URL.createObjectURL(new Blob([JSON.stringify(json)]))
				const a = document.createElement('a')

				a.download = downloadFilename + '.' + type
				a.href = url
				a.click()

				uni.showToast({
					title: '导出成功',
					mask: true
				})
				// #endif

				// #ifndef H5
				plus.io.requestFileSystem(plus.io.PUBLIC_DOWNLOADS, fs => {
					fs.root.getFile(
						`file:///storage/emulated/0/easybill/${downloadFilename}.${type}`, {
							create: true
						}, fileEntry => {
							fileEntry.createWriter(writer => {
								writer.onwriteend = e => {
									const path = fileEntry.fullPath
									this.exportForm.savedPath = path.substring(
										path.indexOf('0') + 1)
									uni.showToast({
										title: '导出成功',
										mask: true
									})
								};
								writer.onerror = e => {
									uni.showToast({
										title: '写入文件时出错',
										icon: 'error'
									})
								};
								writer.write(JSON.stringify(json));
							}, e => {
								uni.showToast({
									title: '无法写入文件',
									icon: 'error'
								})
							});
						}, e => {
							uni.showToast({
								title: '无法下载文件',
								icon: 'error'
							})
						});
				});
				// #endif
			}
		}
	}
</script>

<style>

</style>