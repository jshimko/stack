/** @type {import('eslint').Linter.BaseConfig} **/

module.exports = {
  extends: ["@stackframe/eslint-config/base", "@stackframe/eslint-config/next"],
  ignorePatterns: ["*.jsx"],
  parserOptions: {
    projectService: true,
  },
}