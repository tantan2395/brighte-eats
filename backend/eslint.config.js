import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['src/**/*.ts', 'tests/**/*.ts', '**/*.d.ts'], // Add **/*.d.ts
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'prettier/prettier': 'error'
    }
  },
  {
    files: ['*.config.ts', 'knexfile.ts', '**/*.d.ts'], // Add **/*.d.ts here too
    languageOptions: {
      parser,
      parserOptions: {
        sourceType: 'module'
      }
    }
  },
  configPrettier
];