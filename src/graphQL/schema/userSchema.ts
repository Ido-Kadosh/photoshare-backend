import { GraphQLList, GraphQLString } from 'graphql';
import { resolvers } from '../resolvers';
import { typeDefs } from '../typeDefs';

const userQuery = {
	user: {
		type: typeDefs.User,
		args: { id: { type: GraphQLString } },
		resolve: resolvers.user.getById,
	},
	users: {
		type: new GraphQLList(typeDefs.User),
		resolve: resolvers.user.get,
	},
};

const userMutation = {};

export const userSchema = {
	query: userQuery,
	mutation: userMutation,
};
