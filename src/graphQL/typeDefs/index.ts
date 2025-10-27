import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLSchema } from "graphql";

export const typeDefs: GraphQLSchema = loadSchemaSync("./**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

// export const typeDefs = /* GraphQL */ `
//   ${userTypeDefs}
// `;
