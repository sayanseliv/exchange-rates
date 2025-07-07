import vue from 'eslint-plugin-vue'
import js from '@eslint/js'
import babelParser from '@babel/eslint-parser'
import vueParser from 'vue-eslint-parser'

export default [
  js.configs.recommended,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        parser: babelParser,
        requireConfigFile: false, // <-- добавь эту строку
      },
    },
    plugins: {
      vue,
    },
    rules: {
      'vue/attributes-order': ['error'],
      // другие правила по желанию
    },
  },
]
