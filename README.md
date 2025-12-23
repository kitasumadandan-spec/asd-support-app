# ASDの方のための支援アプリ

自閉スペクトラム症（ASD）の方への支援を体系的に行うためのWebアプリケーションです。

## 機能

### ステップ1: ご利用者の生活を知ろう
- プロフィール情報の入力
- 日常生活アセスメント
- 1週間の過ごし方
- ICF評価に基づく強みと現状の支援

### ステップ2: 困った行動とその背景を知ろう
- 困った行動の記録
- 背景となる障害特性の分析
- 氷山モデルワークシート
- スキャッタープロット・ABC記録

### ステップ3: 支援の計画を立てよう
- 支援計画の作成
- TEACCHプログラムに基づく構造化支援
- ストラテジーシートの作成

### ステップ4: 実際に支援をしてみよう
- アセスメントツール（FAST、コミュニケーションサンプル等）
- 支援ツールの作成と実践
- 効果検証

## 開発環境のセットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

## デプロイ方法

### Vercelへのデプロイ（推奨）

1. [GitHub](https://github.com)にリポジトリを作成
2. このプロジェクトをプッシュ
3. [Vercel](https://vercel.com)にGitHubアカウントでログイン
4. 「New Project」からリポジトリを選択
5. 「Deploy」をクリック

数分で公開URLが発行されます。

### Netlifyへのデプロイ

1. [Netlify](https://www.netlify.com)にログイン
2. 「Sites」→「Add new site」→「Import an existing project」
3. GitHubを選択してリポジトリを選ぶ
4. Build command: `npm run build`
5. Publish directory: `dist`
6. 「Deploy」をクリック

## 技術スタック

- React 18
- Vite
- Tailwind CSS
- Lucide React (アイコン)
- Recharts (グラフ)

## ライセンス

MIT License
