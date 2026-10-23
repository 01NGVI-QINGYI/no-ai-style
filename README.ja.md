<p align="center">
  <img src="docs/images/panel-en.png" width="320" alt="モードパネル（英語 UI）：Check、Polish、Draft">
</p>

<h3 align="center">No AI Style</h3>

<p align="center">
  <b>自然な表現、忠実な意味。</b><br>
  <sub>学術・専門ライティング向けの agent skill 兼 DeepSeek Harness プラグイン</sub>
</p>

<p align="center">
  <a href="https://github.com/01NGVI-QINGYI/no-ai-style/releases"><img alt="最新リリース" src="https://img.shields.io/github/v/release/01NGVI-QINGYI/no-ai-style?style=flat-square&label=release&color=4c84f4"></a>
  <a href="https://awesome-dsh-plugin.com/p/01NGVI-QINGYI/no-ai-style/"><img alt="DeepSeek Harness プラグインマーケット" src="https://img.shields.io/badge/DSH-plugin%20market-8b5cf6?style=flat-square"></a>
  <a href="LICENSE"><img alt="MIT ライセンス" src="https://img.shields.io/badge/license-MIT-2ea44f?style=flat-square"></a>
  <img alt="日本語、英語、中国語" src="https://img.shields.io/badge/%E6%97%A5%20%C2%B7%20EN%20%C2%B7%20%E4%B8%AD-555?style=flat-square">
</p>

<p align="center">
  <a href="README.md">English</a> ·
  <a href="README.zh-CN.md">中文</a> ·
  <a href="README.ja.md">日本語</a>
</p>

---

## これは何をするか

文章をテンプレートのように読ませる言い回し——前置き、重ねられた留保、自己正当化——を取り除き、主張そのものには触れません。事実、数値、引用、手法、限界は書かれたまま残り、声はあなたのものです。

> **変更前** — 明確にするために述べておくと、この機器は USB ポートを 2 つ備えています。
>
> **変更後** — この機器は USB ポートを 2 つ備えています。

## 3 つのモード

| モード | 名称 | 得られるもの |
| :-- | :-- | :-- |
| `audit` | **確認** | 問題点と提案のみ。提出可能か尋ねれば、判定と未解決の問題も示します。元ファイルは変更しません。 |
| `revise` | **推敲** | 指定した範囲での編集稿。 |
| `compose` | **草稿** | 提供したメモと根拠に基づく草稿。 |

既定は軽い編集で、より大きな書き換えが必要なら伝えてください。技能は本文の言語に従い、すでに通っている箇所はそのまま残します。

```text
この文章を no-ai-style で確認してください。
no-ai-style で推敲してください。
このメモから no-ai-style で草稿を作ってください。
```

2 つのマーカーが誠実さを保ちます。`[EVIDENCE GAP]` は出典が必要な主張を示して `ready` の判定を止め、`[INTERPRETATION FLAG]` は著者が確認すべき解釈を示します。

## 入力欄で

DSH プラグインは入力欄の行に ⭐ **no ai style** ボタンを追加します。モードを選ぶと、対応する指示が草稿の先頭に挿入されます——UI の言語（日本語・英語・中国語）で——すでに入力した内容はそのまま残ります。

挿入は元に戻せます。ファイルやコマンドの参照を含む草稿では、参照を潰す代わりに挿入を拒否します。

## インストール

### DeepSeek Harness

アプリから：**Settings → Plugins** → `github:01NGVI-QINGYI/no-ai-style` を追加し、再起動します。

CLI から：`--profile` には実際に使っているプロファイルを指定します。`dsh web` なら `web`、デスクトップアプリなら `desktop`：

```bash
dsh plugin --profile web add github:01NGVI-QINGYI/no-ai-style
```

プラグインは独自の skill provider を登録するため、プロジェクト・カスタム・ユーザーの各 skill ディレクトリには触れず、そのプロファイルの全セッションで技能が使えます。

<details>
<summary><b>プラグインなしで技能だけを使う</b></summary>

<br>

DeepSeek Harness のプロジェクト内で次を実行すると `.agents/skills` にインストールされます：

```bash
npx skills add 01NGVI-QINGYI/no-ai-style --agent universal --copy
```

</details>

### その他の agent

```bash
npx skills add 01NGVI-QINGYI/no-ai-style
```

プロンプトで agent を選びます。プロジェクト内に入れる場合は `--global` を外します。

<details>
<summary><b>agent ごとのコマンド</b></summary>

<br>

| Agent | コマンド |
| :-- | :-- |
| Codex | `npx skills add 01NGVI-QINGYI/no-ai-style --global --agent codex` |
| Claude Code | `npx skills add 01NGVI-QINGYI/no-ai-style --global --agent claude-code` |
| Cursor | `npx skills add 01NGVI-QINGYI/no-ai-style --global --agent cursor` |
| Pi | `npx skills add 01NGVI-QINGYI/no-ai-style --global --agent pi` |

手動で入れる場合は `skills/no-ai-style/` を agent の skills ディレクトリにコピーします。

</details>

## 任意の確認

ローカルで動くスクリプト 2 つ。Python 3.9+、外部依存なし。リポジトリのルートで実行します：

```bash
python3 skills/no-ai-style/scripts/audit_prose.py draft.md --lang auto
python3 skills/no-ai-style/scripts/compare_anchors.py before.md after.md --format json
```

テキストはアップロードしません。結果は人が読む必要があります。閉じていないコメントやコードフェンスは警告になり、`--strict` を付けると根拠不足のマーカーや閉じていない記法で終了コード 1 を返します。

## ライセンス

[MIT](LICENSE) · 技能 v1.0 · DSH プラグイン v1.2.2 · 作者 [01NGVI-QINGYI](https://github.com/01NGVI-QINGYI)

目的は読みやすく忠実な文章であり、AI 検出器を避けることではありません。詳細な規則は [SKILL.md](skills/no-ai-style/SKILL.md) にあります。
