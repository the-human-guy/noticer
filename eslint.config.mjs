// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/no-multiple-template-root': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'vue/html-self-closing': 0,
    'vue/require-default-prop': 0,
  },
})
