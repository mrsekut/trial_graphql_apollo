default:
  @just --choose

# クライアントの起動
serve-client:
  cd packages/client && bun --hot src/index.tsx

# サーバーの起動
serve-server:
  cd packages/server && bun run src/index.ts

# コード生成
codegen:
  cd packages/graphql && bunx graphql-codegen --config codegen.ts
