[English](README.md) | [中文](README.zh-CN.md) | [日本語](README.ja.md)

# No AI Style

**自然表达，忠于原意。**

Skill v1.0 · DSH 插件 v1.0.0 · 英语 / 中文 / 日语 · 作者：[01NGVI-QINGYI](https://github.com/01NGVI-QINGYI)

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
请用 no-ai-style 轻度润色 docs/product.md。
保留产品规格、兼容条件和已知限制。
```

只检查、不修改文件：

```text
请用 no-ai-style 的 audit 模式检查 docs/product.md，不要修改文件。
```

| 模式 | 输出 |
| --- | --- |
| `audit` | 问题与建议，原文件不变 |
| `revise` | 指定范围内的修改稿 |
| `compose` | 根据已有笔记和证据起草 |
| `release` | 提交前检查与未解决的问题 |

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
