module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
  printWidth: 80,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSpacing: false,
  arrowParens: "avoid",
  tabWidth: 2,
  trailingComma: "all",
  importOrder: ["<THIRD_PARTY_MODULES>", "^@/(.*)$"],
  importOrderSeparation: true,
  importOrderCaseInsensitive: true,
};
