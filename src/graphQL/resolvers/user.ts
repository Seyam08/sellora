import {
  Greetings,
  MutationCreateUserArgs,
  MutationUpdateUserArgs,
  Resolvers,
  Test,
  User,
} from "@/graphQL/graphQL-Types";

export const userResolvers: Resolvers = {
  Query: {
    greetings: (): Greetings => ({ first: "Hello", last: true }),
    hello: (): Test => {
      return { text: "he is a liar!", state: true };
    },
  },
  Mutation: {
    createUser: (_: unknown, args: MutationCreateUserArgs) => {
      return {
        id: "dsg",
        name: args.name,
      };
    },
    updateUser: (_: unknown, args: MutationUpdateUserArgs): User => {
      return {
        id: "124124",
        name: args?.name ?? "",
      };
    },
  },
};
