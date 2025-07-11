import vue from 'eslint-plugin-vue'
import tseslint from '@typescript-eslint/eslint-plugin'
import pluginPinia from 'eslint-plugin-pinia'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import prettier from 'eslint-plugin-prettier'
import functional from 'eslint-plugin-functional'
import path from 'node:path'

export default [
  {
    files: ['src/**/*.{vue,ts}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        project: path.resolve('./tsconfig.json'),
        tsconfigRootDir: path.resolve(),
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': tseslint,
      prettier,
      pinia: pluginPinia,
      functional: functional,
    },
    rules: {
      'prettier/prettier': 'error',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'vue/attributes-order': 'warn',

      // ⚙️ Functional programming rules (по умолчанию строгие)
      'functional/no-let': 'error',
      'functional/prefer-readonly-type': 'warn',
      'functional/immutable-data': [
        'warn',
        {
          ignoreAccessorPattern: ['**.value'],
        },
      ],

      // ✅ Pinia-specific rules
      'pinia/no-return-global-properties': 'warn',
      'pinia/prefer-single-store-per-file': 'warn',
      'pinia/no-store-to-refs-in-store': 'warn',
      'pinia/no-duplicate-store-ids': 'warn',
    },
  },

  {
    files: ['src/stores/**/*.{ts,js}'],
    rules: {
      'functional/immutable-data': 'off',
      'functional/prefer-readonly-type': 'off',
      'functional/no-this-expression': 'off',
      'functional/no-let': 'off',
    },
  },
]
