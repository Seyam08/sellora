import { schema } from "@/graphQL/schema";
import { createYoga } from "graphql-yoga";

const { handleRequest } = createYoga({
  schema: schema,

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: "/api",

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
  graphiql: true,
});

export {
  handleRequest as GET,
  handleRequest as OPTIONS,
  handleRequest as POST,
};
