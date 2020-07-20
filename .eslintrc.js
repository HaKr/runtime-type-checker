module.exports = {
	env: {
		es6: true,
		node: true
	},
	extends: [
		"eslint:recommended",
		'plugin:@typescript-eslint/recommended',
		"prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
		"plugin:prettier/recommended" // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
	],
	globals: {},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 6,
		ecmaFeatures: {
			modules: true
		},
		sourceType: 'module'
	},
	plugins: [
		'@typescript-eslint',
		"prettier",
		"simple-import-sort"
	],
	rules: {
		"@typescript-eslint/explicit-function-return-type": "off",
		"no-dupe-class-members": "off",
		"no-console": "warn",
		"simple-import-sort/sort": "error",
		"prettier/prettier": "error"
	},
	overrides: [ ]
};
