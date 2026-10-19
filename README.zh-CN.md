[English](README.md) | [中文](README.zh-CN.md) | [日本語](README.ja.md)

# No AI Style

**自然表达，忠于原意。**

Skill v1.0 · DSH 插件 v1.1.0 · 英语 / 中文 / 日语 · 作者：[01NGVI-QINGYI](https://github.com/01NGVI-QINGYI)

用于学术和专业文本的 agent skill，也可作为 DeepSeek Harness 插件安装。减少机械表达和多余铺垫，保留事实、引用、必要限定与作者语气。

**修改前：** 为了说明清楚，需要指出的是，该设备配有两个 USB 接口。

**修改后：** 该设备配有两个 USB 接口。

## 安装

需要 Node.js 和 npm。

**Codex**

```bash
npx skills add 01NGVI-QINGYI/no-ai-style --global --agent codex
```

**Deepseek Harness**

在 DSH Desktop 的 **Settings → Plugins** 中添加 `github:01NGVI-QINGYI/no-ai-style`。也可以在命令行安装：

```bash
dsh plugin --profile web add github:01NGVI-QINGYI/no-ai-style
```

`--profile` 填你实际在用的那个：`dsh web` 用 `web`，桌面应用用 `desktop`。插件会注册自己的 skill provider，技能直接对那个 profile 下的所有会话生效，不会动你的项目、自定义或用户 skill 目录。

重启 DSH 后即可加载插件。如需将它作为普通 agent skill 安装，在 Deepseek Harness 项目目录运行下面命令，安装到 `.agents/skills`：

```bash
npx skills add 01NGVI-QINGYI/no-ai-style --agent universal --copy
```

**Claude Code**

```bash
npx skills add 01NGVI-QINGYI/no-ai-style --global --agent claude-code
```

**Pi**

```bash
npx skills add 01NGVI-QINGYI/no-ai-style --global --agent pi
```

**Cursor**

```bash
npx skills add 01NGVI-QINGYI/no-ai-style --global --agent cursor
```

**Other agents**

```bash
npx skills add 01NGVI-QINGYI/no-ai-style
```

按提示选择其他工具。去掉 `--global` 可安装到当前项目。

手动安装：将 `skills/no-ai-style/` 文件夹复制到所用工具的 skills 目录。

## 使用

安装后直接用自然语言提出要求，粘贴文本或提供文件路径：

```text
用 no-ai-style 检查。
用 no-ai-style 润色。
用 no-ai-style 起草。
```

“检查”既可用于一般审阅，也可用于提交前检查；询问能否提交时，会附上结论和未解决问题。

在 DSH 输入框里有一个 **no ai style** 按钮（⭐ no ai style）。点击后选择检查、润色或起草。确认后，对应提示词会插入现有草稿最前面；取消则不改动草稿。界面文案跟随 DSH 语言；启用日文语言包时显示日文，其他未支持的语言显示英文。旧版 DSH 草稿含文件或命令引用时会阻止插入，以免丢失引用。

<p align="center">
  <img src="docs/images/panel-zh.png" width="330" alt="中文界面下的模式面板：检查、润色、起草，底部为取消与插入到输入框">
  <img src="docs/images/panel-en.png" width="330" alt="英文界面下的同一面板：Check、Polish、Draft">
</p>


| 模式 | 输出 |
| --- | --- |
| `audit` | 问题与建议；询问能否提交时补充结论和未解决问题，原文件不变 |
| `revise` | 指定范围内的修改稿 |
| `compose` | 根据已有笔记和证据起草 |

默认轻度修改；需要更大幅度重写时可直接说明。沿用原文语言，合理的表达不强行改动。
缺少证据用 `[EVIDENCE GAP]` 标记；需要作者判断的解释用 `[INTERPRETATION FLAG]` 标记。

## 可选检查

需要 Python 3.9+，无第三方依赖。在仓库根目录运行：

```bash
python3 skills/no-ai-style/scripts/audit_prose.py draft.md --lang auto
python3 skills/no-ai-style/scripts/compare_anchors.py before.md after.md --format json
```
脚本在本地运行，不上传文本。结果需结合上下文判断；未闭合的注释或代码围栏会告警。
加入 `--strict` 后，缺失证据标记或未闭合格式会返回退出码 1。

本项目旨在改善可读性，不以规避 AI 检测为目标。详细规则见 [SKILL.md](skills/no-ai-style/SKILL.md)。

## 许可证

[MIT](LICENSE) · 作者：[01NGVI-QINGYI](https://github.com/01NGVI-QINGYI)。
