export const userResolvers = {
  Query: {
    greetings: () => ({ first: "Hello", last: "World" }),
  },
  Mutation: {
    createUser: (_: unknown, args: { name: string }) => {
      return {
        id: "dsg",
        name: args.name,
      };
    },
    updateUser: (_: unknown, args: { name?: string }) => {
      return {
        id: 124124,
        name: args?.name ?? "",
      };
    },
  },
};
