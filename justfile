default:
  @just --choose

install:
  cd packages/client && bun install
  cd packages/server && bun install
  cd packages/graphql && bun install

# クライアントの起動
serve-client: install
  cd packages/client && bun --hot src/index.tsx

# サーバーの起動
serve-server: install
  cd packages/server && bun run index.ts

# コード生成
codegen: install
  cd packages/graphql && bunx graphql-codegen --config codegen.ts
