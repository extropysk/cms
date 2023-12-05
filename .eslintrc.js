module.exports = {
  root: true,
  extends: ['@payloadcms'],
  ignorePatterns: ['**/payload-types.ts'],
  plugins: ['prettier'],
  rules: {
    'simple-import-sort/imports': 'off',
  },
  'prettier/prettier': [
    'error',
    {
      endOfLine: 'auto',
    },
  ],
}
