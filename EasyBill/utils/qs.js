export const qs = target => {
	if (typeof target === 'string') {
		return target.split('&').reduce((o, kv) => {
			const [k, v] = kv.split('=')
			o[k] = decodeURIComponent(v)
			return o
		}, {})
	}
	let pairs = []
	for (const k in target) {
		pairs.push(`${k}=${target[encodeURIComponent(k)]}`)
	}
	return pairs.join('&')
}