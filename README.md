## Sample Plugin Template

为了避免重复工作打造的插件模板以及检查清单。

供我自己使用，当然也欢迎大家使用和 `issue/pr` .

### 如果你想要使用（开发全新的插件而不是开发这个模板）

1. `use this template`
2. 进行相关名称的替换。这里以 `main.ts` 给出参考（注意遵守大小写）
   - `MyPluginSettings` 
   - `mySetting` 
   - `MyPlugin` 
   - `SampleSettingTab`
   - 其余命名系统请自行决定。
3. 插件信息 `manifest.json` 其中的内容需要几乎全部重写。 参考：[官英](https://docs.obsidian.md/Reference/Manifest),或者[社区中文翻译](https://liubinfighter.github.io/obsidian-dev-docs-zh/zh/reference/manifest.html)

### 已完成的重复工作

- 杂活部分
  - 建立 `src`, 移动 `main.ts`，删除多余的示例代码
  - 修改 `tsconfig.json`
    - 添加 `jsx` `react` 支持
    - 源码目录改变
  - 添加 .github/workflows 以便通过打 tag 自动化 release，见 [使用GitHub Actions发布插件](https://liubinfighter.github.io/obsidian-dev-docs-zh/zh/plugins/releasing/release-your-plugin-with-github-actions.html)

`manifest.json`

```diff
- "minAppVersion": "0.15.0",
+ "minAppVersion": "1.8.0",
```

如果插件有多语言支持，则请注意不要在设置中添加语言一栏，而是使用`getLanguage`（1.8.0），此处见官方团队的评审意见： "Use the getLanguage function to get the configured language (requires minAppVersion of at least 1.8.0)"

`.gitignore`

```diff
+ **/.obsidian/
```

如果涉及到docs编辑，需要忽略掉 `.obsidian` 设置文件夹
