# ASDの方のための支援アプリ - デプロイ手順書

## 📦 ダウンロードしたZIPファイルの使い方

### 1. ZIPファイルを解凍する
ダウンロードした `asd-support-app.zip` をダブルクリックして解凍してください。
`asd-support-app` というフォルダができます。

---

## 🚀 Vercelへのデプロイ手順（推奨・無料）

### ステップ1: GitHubにリポジトリを作成

1. **GitHubにログイン**
   - https://github.com にアクセス
   - ログインする（アカウントがない場合は作成）

2. **新しいリポジトリを作成**
   - 右上の「+」ボタン → 「New repository」をクリック
   - Repository name: `asd-support-app`（任意の名前でOK）
   - Public または Private を選択（どちらでもOK）
   - 「Create repository」をクリック

3. **ファイルをアップロード**
   - 作成したリポジトリのページで「uploading an existing file」をクリック
   - 解凍したフォルダの **中身すべて** をドラッグ＆ドロップ
     - `src/` フォルダ
     - `index.html`
     - `package.json`
     - `vite.config.js`
     - `tailwind.config.js`
     - `postcss.config.js`
     - `README.md`
     - `.gitignore`
   - 「Commit changes」をクリック

### ステップ2: Vercelでデプロイ

1. **Vercelにアクセス**
   - https://vercel.com にアクセス

2. **GitHubでログイン**
   - 「Continue with GitHub」をクリック
   - GitHubアカウントで認証

3. **プロジェクトをインポート**
   - 「Add New...」→「Project」をクリック
   - 「Import Git Repository」で先ほど作成したリポジトリを選択
   - 「Import」をクリック

4. **設定を確認してデプロイ**
   - Framework Preset: `Vite` が自動選択されるはず
   - Build Command: `npm run build`（自動）
   - Output Directory: `dist`（自動）
   - 「Deploy」をクリック

5. **完了！**
   - 2〜3分でデプロイが完了
   - `https://あなたのプロジェクト名.vercel.app` というURLが発行されます
   - このURLを共有すれば、誰でもアプリを使えます！

---

## 🔄 アプリを更新したい場合

1. GitHubのリポジトリでファイルを編集・アップロード
2. Vercelが自動的に検知して再デプロイします（約1〜2分）

---

## ⚠️ よくある問題と解決方法

### ビルドエラーが出る場合
- `package.json` がルートディレクトリにあることを確認
- フォルダ構造が正しいか確認（`src/` フォルダの中にコンポーネントがあるか）

### 画面が真っ白になる場合
- ブラウザの開発者ツール（F12）でエラーを確認
- コンソールのエラーメッセージを確認

---

## 📁 ファイル構造

```
asd-support-app/
├── index.html           # HTMLテンプレート
├── package.json         # 依存関係
├── vite.config.js       # Vite設定
├── tailwind.config.js   # Tailwind CSS設定
├── postcss.config.js    # PostCSS設定
├── README.md            # プロジェクト説明
├── .gitignore           # Git除外設定
└── src/
    ├── main.jsx         # エントリーポイント
    ├── index.css        # グローバルCSS
    ├── App.jsx          # メインアプリ
    ├── constants.js     # 定数定義
    ├── SharedComponents.jsx    # 共有コンポーネント
    ├── BehaviorAnalysisChat.jsx # AIチャット
    ├── Step1Components.jsx     # ステップ1
    ├── Step2Components.jsx     # ステップ2
    ├── Step3Components.jsx     # ステップ3
    ├── Step4Assessment.jsx     # ステップ4（アセスメント）
    └── Step4Tools.jsx          # ステップ4（ツール）
```

---

## 💡 ヒント

- **独自ドメイン**: Vercelの設定で独自ドメインを設定できます（無料）
- **アクセス制限**: Vercelの有料プランで、パスワード保護ができます
- **データ**: このアプリのデータは各ユーザーのブラウザに保存されます（サーバーには送信されません）

---

何か問題があれば、お気軽にご質問ください！
