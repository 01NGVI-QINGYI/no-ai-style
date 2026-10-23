<p align="center">
  <img src="docs/images/panel-zh.png" width="320" alt="中文界面下的模式面板：检查、润色、起草">
  <img src="docs/images/panel-en.png" width="320" alt="英文界面下的同一面板：Check、Polish、Draft">
</p>

<h3 align="center">No AI Style</h3>

<p align="center">
  <b>自然表达，忠于原意。</b><br>
  <sub>面向学术与专业写作的 agent skill，同时是 DeepSeek Harness 插件</sub>
</p>

<p align="center">
  <a href="https://github.com/01NGVI-QINGYI/no-ai-style/releases"><img alt="最新版本" src="https://img.shields.io/github/v/release/01NGVI-QINGYI/no-ai-style?style=flat-square&label=release&color=4c84f4"></a>
  <a href="https://awesome-dsh-plugin.com/p/01NGVI-QINGYI/no-ai-style/"><img alt="DeepSeek Harness 插件市场" src="https://img.shields.io/badge/DSH-plugin%20market-8b5cf6?style=flat-square"></a>
  <a href="LICENSE"><img alt="MIT 许可证" src="https://img.shields.io/badge/license-MIT-2ea44f?style=flat-square"></a>
  <img alt="中文、英文、日文" src="https://img.shields.io/badge/%E4%B8%AD%20%C2%B7%20EN%20%C2%B7%20%E6%97%A5-555?style=flat-square">
</p>

<p align="center">
  <a href="README.md">English</a> ·
  <a href="README.zh-CN.md">中文</a> ·
  <a href="README.ja.md">日本語</a>
</p>

---

## 它做什么

删掉让文章读起来像模板的那些措辞——开场的铺陈、层层叠加的限定、替自己辩解的话——但不动主张本身。事实、数字、引用、方法和局限性原样保留，语气仍然是你的。

> **修改前** — 为了说明清楚，需要指出的是，该设备配有两个 USB 接口。
>
> **修改后** — 该设备配有两个 USB 接口。

## 三种模式

| 模式 | 名称 | 你得到什么 |
| :-- | :-- | :-- |
| `audit` | **检查** | 只给问题和建议。若你问能否提交，再补上结论和未解决问题。原文件不动。 |
| `revise` | **润色** | 在你指定范围内改写一版。 |
| `compose` | **起草** | 依据你提供的材料起草。 |

默认轻度编辑，需要更大幅度的改写时直接说。技能会跟随原文语言，把本来就通顺的段落原样留下。

```text
请用 no-ai-style 检查这段文字。
请用 no-ai-style 润色。
请用 no-ai-style 根据这些材料起草。
```

两个标记用来守住底线：`[EVIDENCE GAP]` 标注缺少出处的断言，并阻止给出 `ready` 结论；`[INTERPRETATION FLAG]` 标注需要作者确认的理解。

## 在输入框里

DSH 插件会在输入框那一行加一个 ⭐ **no ai style** 按钮。选一个模式，对应指令就插入到草稿最前面——按界面语言（中文、英文、日文）——你已经写的内容原样保留。

插入可以撤销。草稿里含文件或命令引用时会拒绝插入而不是把它们拍平，引用不会丢。

## 安装

### DeepSeek Harness

应用内：**Settings → Plugins** → 添加 `github:01NGVI-QINGYI/no-ai-style`，然后重启。

命令行：`--profile` 填你实际在用的那个，`dsh web` 用 `web`，桌面应用用 `desktop`：

```bash
dsh plugin --profile web add github:01NGVI-QINGYI/no-ai-style
```

插件会注册自己的 skill provider，技能直接对那个 profile 下的所有会话生效，不会动你的项目、自定义或用户 skill 目录。

<details>
<summary><b>只想要技能、不装插件？</b></summary>

<br>

在 DeepSeek Harness 项目目录运行下面命令，安装到 `.agents/skills`：

```bash
npx skills add 01NGVI-QINGYI/no-ai-style --agent universal --copy
```

</details>

### 其他 agent

```bash
npx skills add 01NGVI-QINGYI/no-ai-style
```

按提示选择你的 agent。项目内安装就去掉 `--global`。

<details>
<summary><b>各 agent 的单独命令</b></summary>

<br>

| Agent | 命令 |
| :-- | :-- |
| Codex | `npx skills add 01NGVI-QINGYI/no-ai-style --global --agent codex` |
| Claude Code | `npx skills add 01NGVI-QINGYI/no-ai-style --global --agent claude-code` |
| Cursor | `npx skills add 01NGVI-QINGYI/no-ai-style --global --agent cursor` |
| Pi | `npx skills add 01NGVI-QINGYI/no-ai-style --global --agent pi` |

手动安装：把 `skills/no-ai-style/` 复制到你的 agent 的 skills 目录。

</details>

## 可选检查

两个本地脚本，Python 3.9+，无第三方依赖。在仓库根目录运行：

```bash
python3 skills/no-ai-style/scripts/audit_prose.py draft.md --lang auto
python3 skills/no-ai-style/scripts/compare_anchors.py before.md after.md --format json
```

脚本不上传文本。结果仍需要人读一遍：未闭合的注释或代码块会给出警告，加 `--strict` 可让缺证据标记或未闭合标记返回退出码 1。

## 许可证

[MIT](LICENSE) · 技能 v1.0 · DSH 插件 v1.2.2 · 作者 [01NGVI-QINGYI](https://github.com/01NGVI-QINGYI)

目标是读起来通顺、表达忠实，而不是躲过 AI 检测器。完整规则见 [SKILL.md](skills/no-ai-style/SKILL.md)。
