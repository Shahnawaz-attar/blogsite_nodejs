module.exports = [
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**", "public/**"],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: "script",
    },
    rules: {
      indent: ["error", 2],
      quotes: ["error", "double"],
      semi: ["error", "always"],
    },
  },
];
