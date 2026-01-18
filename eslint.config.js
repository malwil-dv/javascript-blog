import js from "@eslint/js";

export default [
  // odpowiednik "extends": "eslint:recommended"
  js.configs.recommended,

  {
    files: ["js/**/*.js"],

    languageOptions: {
      ecmaVersion: 2015,

      globals: {
        // env: browser
        window: "readonly",
        document: "readonly",
        console: "readonly"
      }
    },

    rules: {
      indent: ["error", 2],

      "linebreak-style": "off",

      quotes: [
        "error",
        "single",
        { allowTemplateLiterals: true }
      ],

      semi: ["error", "always"],

      "no-console": "off",

      "no-prototype-builtins": "off"
    }
  }
];