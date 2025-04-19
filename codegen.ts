import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
   schema: './graphql/schema.graphql',
   generates: {
    './graphql/types.ts': {
        plugins: ['typescript']
    }
   }
}

export default config