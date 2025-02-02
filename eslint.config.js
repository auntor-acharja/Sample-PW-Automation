import eslintPluginTs from "@typescript-eslint/eslint-plugin";
import eslintParserTs from "@typescript-eslint/parser";
import eslintPluginPlaywright from "eslint-plugin-playwright";
import eslintPluginPrettier from "eslint-plugin-prettier";
import playwright from "eslint-plugin-playwright";

export default [
  {
    ignores: ["node_modules", "dist", "playwright-report"],
  },
  {
    ...playwright.configs["flat/recommended"],
    files: ["**/*.ts"],
    languageOptions: {
      parser: eslintParserTs,
    },
    plugins: {
      "@typescript-eslint": eslintPluginTs,
      playwright: eslintPluginPlaywright,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...playwright.configs["flat/recommended"].rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "prettier/prettier": "error",
    },
  },
];
