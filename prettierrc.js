module.exports = {
  printWidth: 80,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSpacing: false,
  arrowParens: "avoid",
  // @trivago/prettier-plugin-sort-imports
  importOrder: ["<THIRD_PARTY_MODULES>", "^@/(.*)$"],
  importOrderSeparation: true,
  importOrderCaseInsensitive: true,
};
