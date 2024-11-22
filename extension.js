const { saveSnippet } = require("./command/saveSnippet.js");
const { insertSnippet } = require("./command/insertSnippet.js");
const { deleteSnippet } = require("./command/deleteSnippet.js");
const { configEdit } = require("./command/configEdit.js");
const {
  giteeConfig,
  codeSnippetSynchronization,
} = require("./command/giteeConfig.js");
const { codeSnippetsTip } = require("./command/codeCompletion.js");

function activate(context) {
  codeSnippetsTip(context);
  saveSnippet(context);
  insertSnippet(context);
  giteeConfig(context);
  deleteSnippet(context);
  codeSnippetSynchronization(context);
  configEdit(context);
}

function deactivate() {
  // 插件失活时的清理操作（这里暂未涉及具体清理内容）
}

module.exports = {
  activate: activate,
  deactivate: deactivate,
};
