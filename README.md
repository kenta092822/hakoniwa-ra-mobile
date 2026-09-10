# Hakoniwa R.A. Mobile

Hakoniwa R.A. Mobile v1.3 Phase 10 の Railway デプロイ用リポジトリです。

## Runtime

Railway では、リポジトリ直下の `hakoniwa_ra_runtime_v1_3.zip` を Docker build 時に展開し、Node.js 22 で `server.js` を起動します。

このZIPは、完成版 v1.3 Phase 10 から Railway 実行に必要なファイルだけを抽出したランタイムです。

SHA-256:

`ce4d11e6bf7afd288c63a2f6f768fa9c819ee0c051f903357ccaa0e5c9e5eab1`

アップロード時は ZIP を展開せず、そのまま `hakoniwa_ra_runtime_v1_3.zip` という名前でリポジトリ直下へ置いてください。

## Railway environment variables

推奨必須:

- `APP_SECRET` : 十分に長いランダム文字列
- `ADMIN_PASSWORD` : 管理画面用の十分に長いパスワード
- `DATA_DIR=/data`

任意設定:

- `TURN_SECONDS=21600` : 1ターン6時間（デフォルトも21600秒）
- `APP_OPERATOR_NAME`
- `APP_SUPPORT_EMAIL`
- `CORS_ORIGINS`

Railway は `PORT` を自動設定するため、通常は手動設定不要です。

永続化のため Railway Volume を `/data` にマウントしてください。

## Deploy

Railway でこのGitHubリポジトリを選択してDeployします。`Dockerfile` と `railway.json` を自動認識します。

公開後は `/api/meta` が HTTP 200 を返し、`title: Hakoniwa R.A. Mobile`、`version: 18`、`turnSeconds: 21600` になっていることを確認してください。

## Verified locally

- Runtime ZIP integrity: OK
- Node server startup: OK
- `/api/meta`: HTTP 200
- 12×12 map / 40 plans / 30 islands per sea / 6-hour turn metadata confirmed
