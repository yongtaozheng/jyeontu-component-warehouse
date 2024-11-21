const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const { getInput, getExtensionFile } = require("../utils/utils.js");
const { codeSnippetsTip } = require("./codeCompletion.js");

async function configEdit(context, completionProvider) {
  completionProvider = await completionProvider;
  const editEffectiveDocumentsDisposable = vscode.commands.registerCommand(
    "saveCodeSnippetsAndReusePlugins.editEffectiveDocuments",
    async () => {
      const config =
        (await getExtensionFile(context, "config/config.json")) || {};
      const effectiveDocuments = config.effectiveDocuments || "";
      const newVal = await getInput("修改插件生效文件范围", effectiveDocuments);
      if (!newVal || newVal === effectiveDocuments) return;
      const configFilePath = path.join(
        context.extensionPath,
        "config/config.json"
      );
      config.effectiveDocuments = newVal;
      fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), "utf8");
      vscode.window.showInformationMessage("成功修改插件生效文件范围");
      if (completionProvider) completionProvider.dispose();
      completionProvider = await codeSnippetsTip(context);
    }
  );
  context.subscriptions.push(editEffectiveDocumentsDisposable);
  return editEffectiveDocumentsDisposable;
}

module.exports = {
  configEdit,
};
