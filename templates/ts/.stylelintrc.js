module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-css-modules',
  ],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'scss/double-slash-comment-inline': 'always',
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'at-rules',
      'less-mixins',
      'declarations',
      'rules',
    ],
    'order/properties-alphabetical-order': true,
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.txs', '**/*.json'],
};
