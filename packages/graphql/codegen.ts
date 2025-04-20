import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
   schema: '../server/src/**/*.graphql',
   documents: '../client/src/**/*.ts',
   generates: {
        '../client/src/graphql/types.ts': {
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
        '../server/src/graphql/types.ts': {
           plugins: [
               'typescript',
               'typescript-resolvers'
           ],
        }
   }
}

export default config