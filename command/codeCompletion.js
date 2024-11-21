const vscode = require("vscode");
const { getExtensionFile } = require("../utils/utils.js");

let completionItemsData = [];

// 定义提供代码补全项的方法
function provideCompletionItems(document, position, token, context) {
  return completionItemsData.map((item) => {
    let completionItem = new vscode.CompletionItem(item.label);
    completionItem.detail = item.detail;
    completionItem.documentation = item.documentation;
    completionItem.insertText = item.insertText;
    return completionItem;
  });
}

// 定义解析单个代码补全项的方法
function resolveCompletionItem(completionItem, token) {
  return completionItem;
}

async function codeSnippetsTip(context) {
  const snippets = await getExtensionFile(context, "config/snippets.json");
  completionItemsData = [];
  for (const key in snippets) {
    completionItemsData.push({
      label: key,
      detail: "saveCodeSnippetsAndReusePlugins",
      documentation: snippets[key],
      insertText: snippets[key],
    });
  }
  const config = await getExtensionFile(context, "config/config.json");
  const effectiveDocuments =
    config.effectiveDocuments ||
    "html,css,javascript,typescript,json,svg,less,sass,scss,vue,jsx,tsx,bat,sh";
  // 注册代码提示提供者
  const completionProvider = vscode.languages.registerCompletionItemProvider(
    effectiveDocuments.split(","), // 语言标识符，要与activationEvents中的设置匹配
    {
      provideCompletionItems: provideCompletionItems,
      resolveCompletionItem: resolveCompletionItem,
    },
    ""
  );

  context.subscriptions.push(completionProvider);
  return completionProvider;
}

module.exports = {
  codeSnippetsTip,
};
