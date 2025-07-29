module.exports = {
  "**/*.{js,html,scss,md,yml,yaml,json}": "prettier --write",
  "*.{js,ts,html}": "eslint --fix",
  "**/*.{css,scss}": "stylelint --fix",
};
