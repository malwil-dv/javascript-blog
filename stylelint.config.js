export default {
  extends: ["stylelint-config-standard-scss"],
  rules: {
    "at-rule-no-unknown": [true, {
    ignoreAtRules: ["import", "use", "forward"]
    }],
    "comment-empty-line-before": null,
    "unit-allowed-list": null,
    "no-descending-specificity": null,
    "scss/no-global-function-names": null
  }
};
