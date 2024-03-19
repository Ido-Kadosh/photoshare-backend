import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { userSchema } from './userSchema'; // Adjust the path as necessary
import { postSchema } from './postSchema';

const RootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	fields: () => ({
		...userSchema.query,
		...postSchema.query,
	}),
});

const RootMutation = new GraphQLObjectType({
	name: 'RootMutation',
	fields: () => ({
		...userSchema.mutation,
		...postSchema.mutation,
	}),
});

export const schema = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation,
});
