module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    'standard'
  ],
  parserOptions: {
    parser: "babel-eslint",
    // specifying a module sourcetype prevent eslint from marking import statements as errors
    sourceType: "module"
  },
  rules: {
    // we should always disable console logs and debugging in production
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
}
