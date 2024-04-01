module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    // ESLint/React settings are disabled in favor of Next.js recommendations.
    // "eslint:recommended",
    // "plugin:@typescript-eslint/recommended",
    // "plugin:react/recommended",
    "next/core-web-vitals",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    // Suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": "off",
    // Allow jsx syntax in js files (for next.js project)
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
