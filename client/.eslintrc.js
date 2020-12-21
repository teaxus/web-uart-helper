module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        "plugin:vue/essential"
    ],
    rules: {
        "no-unused-vars": 0,
        'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
