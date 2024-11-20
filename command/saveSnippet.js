const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const { fetchFileContent, putFileContent } = require("../utils/gitee.js");

async function getGiteeConfig(context) {
  const gitConfigFilePath = path.join(
    context.extensionPath,
    "config/gitConfig.json"
  );
  let gitConfigData = {};
  if (fs.existsSync(gitConfigFilePath)) {
    gitConfigData = JSON.parse(
      fs.readFileSync(gitConfigFilePath, "utf8") || "{}"
    );
  }
  return gitConfigData;
}
// 注册保存代码片段的命令
function saveSnippet(context) {
  const saveSnippetDisposable = vscode.commands.registerCommand(
    "saveCodeSnippetsAndReusePlugins.saveSnippet",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selection = editor.selection;
        const text = editor.document.getText(selection);

        // 提示用户输入自定义名称
        const snippetName = await vscode.window.showInputBox({
          placeHolder: "请输入代码片段的自定义名称",
        });

        if (snippetName) {
          // 读取已有的代码片段数据
          const snippetsFilePath = path.join(
            context.extensionPath,
            "config/snippets.json"
          );
          let snippetsData = {};
          if (fs.existsSync(snippetsFilePath)) {
            snippetsData = JSON.parse(
              fs.readFileSync(snippetsFilePath, "utf8")
            );
          }
          // 将新的代码片段添加到数据中
          snippetsData[snippetName] = text;
          // 保存更新后的代码片段数据
          fs.writeFileSync(
            snippetsFilePath,
            JSON.stringify(snippetsData, null, 2),
            "utf8"
          );
          vscode.window.showInformationMessage(`代码片段已保存到本地！`);

          const giteeConfig = await getGiteeConfig(context);
          const { token, owner, repo } = giteeConfig;
          const url = `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/codeSnippets/snippets.json`;
          const file = await fetchFileContent(url, token);
          const modifiedContent = JSON.stringify(snippetsData, null, 2);
          const encoder = new TextEncoder();
          const data = encoder.encode(modifiedContent);
          const encodedContent = btoa(
            String.fromCharCode.apply(null, new Uint8Array(data))
          );
          const res = await putFileContent(
            url,
            token,
            encodedContent,
            file.sha,
            "更新代码片段"
          );
          vscode.window.showInformationMessage(
            `代码片段 "${snippetName}" 同步到gitee仓库 ${
              res ? "成功" : "失败"
            }！`
          );
        }
      }
    }
  );
  context.subscriptions.push(saveSnippetDisposable);
}

module.exports = {
  saveSnippet,
};
