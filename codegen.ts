import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
   schema: './graphql/schema.graphql',
   documents: './client/src/graphql/books.ts',
   generates: {
        './client/src/graphql/types.ts': {
           plugins: [
               'typescript',
               'typescript-operations',
               'typescript-react-apollo',
           ],
            config: {
                withHooks: true,
                withHOC: false,
                withComponent: false,
            }
        },
   }
}

export default config