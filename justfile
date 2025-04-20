default:
  @just --choose

# クライアントの起動
serve-client:
  cd client && bun --hot src/index.tsx

# サーバーの起動
serve-server:
  cd server && bun run src/index.ts

# コード生成
codegen:
  cd graphql && bunx graphql-codegen --config codegen.ts
