import { typeDefs } from "@/graphQL/typeDefs/index";
import { createSchema } from "graphql-yoga";
import { resolvers } from "./resolvers";

export const schema = createSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
