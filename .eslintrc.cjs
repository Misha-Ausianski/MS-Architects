/* eslint-env node */
export default {
  root: true,
  env: { browser: true, es2023: true, node: true },
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { "import/resolver": { node: { extensions: [".js",".jsx",".ts",".tsx"] } } },
  plugins: ["import"],
  extends: ["eslint:recommended", "plugin:import/recommended", "plugin:import/typescript", "prettier"],
  rules: {
    "import/no-unresolved": "off"
  }
};
