module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{jpg,svg,png,html,json,md,css}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};