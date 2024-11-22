const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const { refreshCodeSnippetsTip } = require("./codeCompletion.js");
const {
  getDecodedContent,
  fetchFileContent,
  putFileContent,
} = require("../utils/gitee.js");

async function getStr(name, value = "") {
  const token = await vscode.window.showInputBox({
    placeHolder: `请输入${name}`,
    value,
  });
  return token;
}
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
async function saveGiteeConfig(gitConfigData, context) {
  const gitConfigFilePath = path.join(
    context.extensionPath,
    "config/gitConfig.json"
  );
  fs.writeFileSync(
    gitConfigFilePath,
    JSON.stringify(gitConfigData, null, 2),
    "utf8"
  );
  vscode.window.showInformationMessage(`gitee配置已成功保存！`);
}
//代码片段仓库配置
function giteeConfig(context) {
  const giteeConfigDisposable = vscode.commands.registerCommand(
    "saveCodeSnippetsAndReusePlugins.giteeConfig",
    async () => {
      const gitConfigData = await getGiteeConfig(context);
      const token = await getStr("token", gitConfigData.token);
      if (!token) {
        vscode.window.showInformationMessage(`请输入token`);
        return;
      }
      const owner = await getStr("owner", gitConfigData.owner);
      if (!owner) {
        vscode.window.showInformationMessage(`请输入owner`);
        return;
      }
      const repo = await getStr("仓库名", gitConfigData.repo);
      if (!repo) {
        vscode.window.showInformationMessage(`请输入仓库名`);
        return;
      }
      await saveGiteeConfig(
        {
          token,
          owner,
          repo,
        },
        context
      );
      const url = `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/codeSnippets/snippets.json`;
      const file = await fetchFileContent(url, token);
      if (file.message) {
        vscode.window.showInformationMessage(
          `${file.message}，获取gitee代码片段出错，请检查gitee配置信息`
        );
        return;
      }
      const fileContent = file.content || "";
      const content = await getDecodedContent(fileContent);
      const snippetsFilePath = path.join(
        context.extensionPath,
        "config/snippets.json"
      );
      const snippetsData = JSON.parse(
        fs.readFileSync(snippetsFilePath, "utf8")
      );
      fs.writeFileSync(
        snippetsFilePath,
        JSON.stringify(Object.assign(content, snippetsData), null, 2),
        "utf8"
      );

      const modifiedContent = JSON.stringify(
        Object.assign(content, snippetsData),
        null,
        2
      );
      const encoder = new TextEncoder();
      const data = encoder.encode(modifiedContent);
      const encodedContent = btoa(
        String.fromCharCode.apply(null, new Uint8Array(data))
      );
      await putFileContent(
        url,
        token,
        encodedContent,
        file.sha,
        "更新代码片段"
      );
      vscode.window.showInformationMessage("已同步gitee最新代码片段");
      refreshCodeSnippetsTip(context);
    }
  );
  context.subscriptions.push(giteeConfigDisposable);
  return giteeConfigDisposable;
}

//代码片段同步
function codeSnippetSynchronization(context) {
  const codeSnippetSynchronizationDisposable = vscode.commands.registerCommand(
    "saveCodeSnippetsAndReusePlugins.codeSnippetSynchronization",
    async () => {
      const gitConfigData = await getGiteeConfig(context);
      const { owner, repo, token } = gitConfigData;
      const url = `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/codeSnippets/snippets.json`;
      const file = await fetchFileContent(url, token);
      if (file.message) {
        vscode.window.showInformationMessage(
          `${file.message}，获取gitee代码片段出错，请检查gitee配置信息`
        );
        return;
      }
      const fileContent = file.content || "";
      const content = await getDecodedContent(fileContent);
      const snippetsFilePath = path.join(
        context.extensionPath,
        "config/snippets.json"
      );
      const snippetsData = JSON.parse(
        fs.readFileSync(snippetsFilePath, "utf8")
      );
      fs.writeFileSync(
        snippetsFilePath,
        JSON.stringify(Object.assign(content, snippetsData), null, 2),
        "utf8"
      );

      const modifiedContent = JSON.stringify(
        Object.assign(content, snippetsData),
        null,
        2
      );
      const encoder = new TextEncoder();
      const data = encoder.encode(modifiedContent);
      const encodedContent = btoa(
        String.fromCharCode.apply(null, new Uint8Array(data))
      );
      await putFileContent(
        url,
        token,
        encodedContent,
        file.sha,
        "更新代码片段"
      );
      vscode.window.showInformationMessage("已同步gitee最新代码片段");
      refreshCodeSnippetsTip(context);
    }
  );
  context.subscriptions.push(codeSnippetSynchronizationDisposable);
  return codeSnippetSynchronizationDisposable;
}

module.exports = {
  giteeConfig,
  codeSnippetSynchronization,
};
