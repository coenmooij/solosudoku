const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const simpleImportSort = require("eslint-plugin-simple-import-sort");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const eslintPluginPrettier = require("eslint-plugin-prettier");
const eslintPluginImport = require("eslint-plugin-import");
const rxjs = require("@smarttools/eslint-plugin-rxjs");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    ignores: ["src/environments/environment.**.ts"],
    extends: [
      eslint.configs.recommended,
      eslintPluginPrettierRecommended,
      eslintPluginImport.flatConfigs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      {
        languageOptions: {
          parserOptions: { projectService: true, tsconfigRootDir: __dirname },
        },
      },
      ...angular.configs.tsRecommended,
      rxjs.configs.recommended,
    ],
    plugins: { "simple-import-sort": simpleImportSort, eslintPluginPrettier, rxjs },
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/component-class-suffix": [
        "error",
        { suffixes: ["Component", "Layout", "Modal", "Page", "Card", "Form", "Tab", ""] },
      ],
      "@angular-eslint/component-max-inline-declarations": ["error", { template: 1 }],
      "@angular-eslint/prefer-standalone": "error",
      "@angular-eslint/consistent-component-styles": ["error"],
      "@typescript-eslint/explicit-function-return-type": ["error"],
      "@typescript-eslint/explicit-member-accessibility": ["error", { overrides: { constructors: "off" } }],
      "@typescript-eslint/no-use-before-define": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-unused-expressions": ["error", { allowShortCircuit: true, allowTernary: true }],
      "@typescript-eslint/consistent-generic-constructors": "off",
      "@typescript-eslint/consistent-indexed-object-style": "off",
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "enumMember", format: ["PascalCase"] },
        { selector: "typeAlias", format: ["PascalCase"] },
        { selector: "variable", types: ["boolean"], format: ["camelCase"] },
        { selector: "class", format: ["PascalCase"] },
        { selector: "variableLike", format: ["camelCase"] },
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          leadingUnderscore: "allow",
          trailingUnderscore: "forbid",
        },
      ],
      "import/order": ["error", { "newlines-between": "never", alphabetize: { order: "asc", caseInsensitive: false } }],
      "simple-import-sort/exports": "error",
      "max-len": ["error", { code: 120 }],
      "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
      "no-empty-function": ["error", { allow: ["arrowFunctions", "constructors"] }],
      "no-multi-spaces": "error",
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "no-trailing-spaces": "error",
      "comma-dangle": ["error", "always-multiline"],
      "import/no-unresolved": "off",
      "import/named": "off",
      "@smarttools/rxjs/no-async-subscribe": "error",
      "@smarttools/rxjs/no-ignored-observable": "error",
      "@smarttools/rxjs/no-nested-subscribe": "error",
      "@smarttools/rxjs/no-unbound-methods": "error",
      "@smarttools/rxjs/throw-error": "error",
      "@smarttools/rxjs/no-implicit-any-catch": "error",
      "@smarttools/rxjs/finnish": [
        "error",
        {
          functions: true,
          methods: true,
          names: { "^(canActivate|canActivateChild|canDeactivate|canLoad|intercept|resolve|validate)$": false },
          parameters: true,
          properties: true,
          types: { "^EventEmitter$": false },
          variables: true,
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  },
);
