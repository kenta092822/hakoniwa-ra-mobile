# Hakoniwa R.A. Mobile

Hakoniwa R.A. Mobile v1.3 Phase 10 の Railway デプロイ用リポジトリです。

## Runtime

Railway では `hakoniwa_ra_runtime_v1_3.zip` を Docker build 時に展開し、Node.js 22 で `server.js` を起動します。

## Railway environment variables

最低限、Railway 側で以下を設定してください。

- `APP_SECRET` : 十分に長いランダム文字列
- `ADMIN_PASSWORD` : 管理画面用の十分に長いパスワード
- `DATA_DIR=/data`

任意設定:

- `TURN_SECONDS=21600` : 1ターン6時間（デフォルトも21600秒）
- `APP_OPERATOR_NAME`
- `APP_SUPPORT_EMAIL`
- `CORS_ORIGINS`

永続化のため Railway Volume を `/data` にマウントしてください。

## Deploy

Railway でこのGitHubリポジトリを選択してDeployします。`Dockerfile` と `railway.json` を自動認識します。

公開後は `/api/meta` がHTTP 200を返すことを確認してください。
