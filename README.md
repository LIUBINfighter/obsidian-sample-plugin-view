# Sample Plugin Template

为了避免重复工作打造的插件模板以及检查清单。

供我自己使用，当然也欢迎大家使用和 `issue/pr` .

## 功能特性

### 自定义视图 (ItemView)

本插件模板包含了一个完整的自定义视图实现示例，可以帮助开发者快速理解和实现自己的视图界面。

- **位置**: 右侧边栏
- **打开方式**:
  - 点击左侧边栏中的骰子图标
  - 使用命令面板 (Ctrl+P) 搜索 "Open Custom View"
- **功能**: 展示基本内容和交互按钮

#### 如何使用自定义视图

1. 在你的插件中引入 `src/custom-item-view.ts` 文件
2. 在主文件中注册视图，如 `main.ts` 中所示
3. 根据需要修改视图的内容和行为

#### 自定义视图的扩展建议

- 添加更多交互元素，如表单、列表、图表等
- 实现状态管理，保存和恢复用户的操作
- 与当前打开的文件集成，如显示文件的相关信息
- 添加设置选项，允许用户自定义视图的行为

#### 效果预览

当成功注册并打开自定义视图后，它将在右侧边栏显示如下内容：

```ascii
+------------------------+
|      Custom View       |
+------------------------+
|                        |
| This is a custom view  |
| created with ItemView. |
|                        |
| [    Click me!    ]    |
|                        |
+------------------------+
```

点击按钮后，将显示一个通知消息。

详细教程请查看 [docs/custom-item-view.md](docs/custom-item-view.md)

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
