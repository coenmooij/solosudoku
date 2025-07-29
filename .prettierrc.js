module.exports = {
  printWidth: 120,
  overrides: [
    { files: "*.html", options: { parser: "angular" } },
    { files: ["*.js", "*.mjs"], options: { parser: "babel", tabWidth: 2 } },
    { files: "*.md", options: { parser: "markdown", proseWrap: "always" } },
    { files: "*.ts", options: { parser: "typescript", singleQuote: true, tabWidth: 2, experimentalTernaries: true } },
    { files: "*.json", options: { parser: "json", tabWidth: 2 } },
    { files: ["*.yml", "*.yaml"], options: { parser: "yaml", tabWidth: 2 } },
  ],
};
