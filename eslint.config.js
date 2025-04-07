import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import prettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettier,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "unused-imports": unusedImports,
      prettier: prettier,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react-hooks/exhaustive-deps": [
        "error",
        { enableDangerousAutofixThisMayCauseInfiniteLoops: true }, // 의존성배열 autoFix
      ],
      "unused-imports/no-unused-imports": "error", // 안쓰는 import 에러처리
      "no-duplicate-imports": "error", // 중복 import를 에러처리
      "simple-import-sort/imports": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["*.config.js"],
    rules: {
      "no-unused-vars": "off",
    },
  },
);
