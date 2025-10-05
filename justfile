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
  cd packages/server && bun run src/index.ts

# コード生成
codegen: install
  cd packages/graphql && bunx graphql-codegen --config codegen.ts

# 型チェック（全体）
typecheck: install
  @echo "🔍 Checking client types..."
  cd packages/client && bunx tsc --noEmit
  @echo "🔍 Checking server types..."
  cd packages/server && bunx tsc --noEmit
  @echo "✅ All type checks passed!"