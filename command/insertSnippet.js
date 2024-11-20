const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
// 注册插入代码片段的命令
function insertSnippet(context) {
  const insertSnippetDisposable = vscode.commands.registerCommand(
    "saveCodeSnippetsAndReusePlugins.insertSnippet",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        // 读取已有的代码片段数据
        const snippetsFilePath = path.join(
          context.extensionPath,
          "config/snippets.json"
        );
        let snippetsData = {};
        if (fs.existsSync(snippetsFilePath)) {
          snippetsData = JSON.parse(fs.readFileSync(snippetsFilePath, "utf8"));
        }

        const snippetNames = Object.keys(snippetsData);
        const selectedSnippetName = await vscode.window.showQuickPick(
          snippetNames,
          {
            placeHolder: "请选择要插入的代码片段",
          }
        );

        if (selectedSnippetName) {
          const selectedSnippet = snippetsData[selectedSnippetName];
          if (selectedSnippet) {
            const position = editor.selection.start;
            editor.edit((editBuilder) => {
              editBuilder.insert(position, selectedSnippet);
            });
          }
        }
      }
    }
  );
  context.subscriptions.push(insertSnippetDisposable);
}
module.exports = {
  insertSnippet,
};
