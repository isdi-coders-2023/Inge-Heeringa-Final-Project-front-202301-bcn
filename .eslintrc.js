module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["xo", "prettier"],
  overrides: [
    {
      extends: ["xo-typescript", "prettier"],
      files: ["*.ts"],
      rules: {
        "@typescript-eslint/consistent-type-imports": "off",
        "@typescript-eslint/no-unnecessary-type-assertion": [
          "error",
          { typesToIgnore: ["CustomTokenPayload"] },
        ],
        "@typescript-eslint/consistent-type-definitions": [
          "error",
          "interface",
        ],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "new-cap": [
      "error",
      { capIsNewExceptions: ["NgModule", "Component", "Injectable", "Inject"] },
    ],
  },
};
