module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
  ],
  ignorePatterns: [
    '**/out/*',
    '**/generated/*',
    'node_modules',
    '.eslintrc.js'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'prettier',
  ],
  root: true,
  rules: {
    // Plugin import order
    'no-console': 'off',
    'import/no-default-export': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'type',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
        ],
        pathGroups: [
          {
            pattern: '@kairos-loan/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '../../../**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '../../**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '../**',
            group: 'parent',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['type'],
        'newlines-between': 'always',
      },
    ],

    // Plugin prettier
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        endOfLine: 'auto',
        singleQuote: true,
        quoteProps: 'consistent',
        trailingComma: 'all',
        arrowParens: 'avoid',
        semi: true,
        bracketSpacing: true
      }
    ],
"import/no-default-export": "off",
    // Plugin typescript-eslint
    "@typescript-eslint/no-unsafe-enum-comparison": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-unnecessary-type-arguments': 'off',
    '@typescript-eslint/prefer-regexp-exec': 'off',
    '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/init-declarations': 'off',
    '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/parameter-properties': 'off',
    '@typescript-eslint/member-ordering': [
      'error',
      { default: ['field', 'constructor', 'signature', 'method'] }
    ],
    '@typescript-eslint/restrict-template-expressions': 'off',
    // https://typescript-eslint.io/rules/naming-convention/#allowed-selectors-modifiers-and-types
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'enumMember', format: ['UPPER_CASE'] }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/prefer-readonly': 'error',

    // to be put in error later
    '@typescript-eslint/non-nullable-type-assertion-style': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-type-alias': 'off',
    '@typescript-eslint/ban-types': 'off',


    // Misc
    'object-shorthand': 'error',
    eqeqeq: ['error', 'always'],
    'arrow-body-style': ['error', 'as-needed'],
    'spaced-comment': ['error', 'always'],
    'no-unused-expressions': 'error',
    'no-prototype-builtins': 'off',
    'no-case-declarations': 'error',
    'no-else-return': ['error', { allowElseIf: false }],
    'no-useless-return': 'error',
    'quote-props': ['error', 'as-needed'],
    'linebreak-style': [ 'error', 'unix' ],
    'no-undef': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    ],
  },
}
