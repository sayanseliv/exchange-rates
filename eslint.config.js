import process, { env } from 'node:process'
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        parser: tsParser,
        extraFileExtensions: ['.vue'],
        project: './tsconfig.app.json',
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        console: 'readonly',
        localStorage: 'readonly',
        window: 'readonly',
        document: 'readonly',
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'vue/attributes-order': ['error'],
    },
  },
]
