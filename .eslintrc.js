/**
 * @type {import('eslint/lib/shared/types').ConfigData}
 */
module.exports = {
    env: {
        browser: true,
        node: true
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
    rules: {
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/multi-word-component-names': 'off'
    }
}
