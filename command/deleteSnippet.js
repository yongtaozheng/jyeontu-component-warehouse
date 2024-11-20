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

// 注册删除代码片段的命令
function deleteSnippet(context) {
  const deleteSnippetDisposable = vscode.commands.registerCommand(
    "saveCodeSnippetsAndReusePlugins.deleteSnippet",
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

        // 构建一个包含代码片段名称的快速选择列表
        // const snippetNames = snippetsData.snippets.map(
        //   (snippet) => snippet.name
        // );
        const snippetNames = Object.keys(snippetsData.snippets);
        const selectedSnippetName = await vscode.window.showQuickPick(
          snippetNames,
          {
            placeHolder: "请选择要删除的代码片段",
          }
        );

        if (selectedSnippetName) {
          const confirmation = await vscode.window.showWarningMessage(
            `你确定要删除${selectedSnippetName}这个代码片段吗？此操作不可撤销。`,
            "是",
            "否"
          );
          if (confirmation === "是") {
            // snippetsData.snippets = snippetsData.snippets.filter(
            //   (snippet) => snippet.name !== selectedSnippetName
            // );
            delete snippetsData.snippets[selectedSnippetName];
            // 保存更新后的代码片段数据
            fs.writeFileSync(
              snippetsFilePath,
              JSON.stringify(snippetsData, null, 2),
              "utf8"
            );
            vscode.window.showInformationMessage(`本地代码片段已删除！`);
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
              `gitee仓库代码片段删除${res ? "成功" : "失败"}！`
            );
          } else {
            vscode.window.showInformationMessage("操作已取消。");
          }
        }
      }
    }
  );
  context.subscriptions.push(deleteSnippetDisposable);
}
module.exports = {
  deleteSnippet,
};
