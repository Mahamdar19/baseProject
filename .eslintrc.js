module.exports = {
	env: {
		node: true,
		"es6": true
	},
	extends: [
		'./eslintRules/best-practices.js',
		'./eslintRules/errors.js',
		'./eslintRules/node.js',
		'./eslintRules/es6.js',
		'./eslintRules/variables.js'
	],
	rules: {},
	parserOptions: {
		ecmaVersion: 2017
	}
};
