# GitHub Pagesへのデプロイ手順

この台北小籠包ガイドウェブサイトをGitHub Pagesを使ってデプロイする手順を説明します。

## 準備

1. GitHubアカウントを持っていることを確認
2. Gitがローカル環境にインストールされていることを確認

## 手順

### 1. GitHubリポジトリを作成

1. GitHubにログイン
2. 右上の「+」ボタンをクリックし、「New repository」を選択
3. リポジトリ名を入力（例：`taipei-xiaolongbao-guide`）
4. 説明（Description）を入力（任意）
5. 「Public」を選択
6. 「Create repository」をクリック

### 2. ローカルリポジトリの初期化とファイルの追加

```bash
# リポジトリ用のディレクトリを作成
mkdir taipei-xiaolongbao-guide
cd taipei-xiaolongbao-guide

# Gitリポジトリを初期化
git init

# プロジェクトファイルをコピー
# - index.html
# - css/style.css
# - js/main.js
# - README.md
# - その他の必要なファイル

# ファイルをステージング
git add .

# 初回コミット
git commit -m "初期コミット：台北小籠包ガイドウェブサイト"
```

### 3. リモートリポジトリに接続

```bash
# リモートリポジトリを追加（URLは実際のリポジトリURLに置き換え）
git remote add origin https://github.com/yourusername/taipei-xiaolongbao-guide.git

# ファイルをプッシュ
git push -u origin main
```

**注意**: 新しいGitHubリポジトリではデフォルトブランチが`main`です。もし`master`ブランチを使用している場合は、`git push -u origin master`としてください。

### 4. GitHub Pagesの設定

1. GitHubリポジトリページに移動
2. 「Settings」タブをクリック
3. 左側のメニューから「Pages」を選択
4. 「Source」セクションで、ブランチを「main」（または「master」）に設定
5. フォルダを「/(root)」に設定
6. 「Save」をクリック

### 5. サイトの公開確認

設定後、GitHub Pagesが有効になるまで数分待ちます。有効になると、以下のURLでサイトにアクセスできます：

```
https://yourusername.github.io/taipei-xiaolongbao-guide/
```

## 更新方法

サイトを更新する場合は、ローカルで変更を加えた後、以下のコマンドで変更をプッシュします：

```bash
# 変更をステージング
git add .

# コミット
git commit -m "更新内容の説明"

# プッシュ
git push
```

変更がGitHubにプッシュされると、自動的にGitHub Pagesのサイトも更新されます（反映には数分かかる場合があります）。

## カスタムドメインの設定（オプション）

独自ドメインを持っている場合、GitHub Pagesで使用することができます：

1. DNSプロバイダーでCNAMEレコードを設定
   ```
   www.yourdomain.com -> yourusername.github.io.
   ```

2. GitHubリポジトリの「Settings」->「Pages」でカスタムドメインを入力
3. 「Enforce HTTPS」にチェックを入れる（推奨）

## トラブルシューティング

- **サイトが表示されない場合**: GitHub Pagesの有効化には数分かかることがあります。しばらく待ってからアクセスしてみてください。
- **CSS/JSが適用されない場合**: パスが正しいか確認してください。GitHub Pagesでは、相対パスが推奨されます。
- **404エラーが表示される場合**: `index.html`がリポジトリのルートにあることを確認してください。

以上の手順で、台北小籠包ガイドウェブサイトをGitHub Pagesにデプロイできます。
