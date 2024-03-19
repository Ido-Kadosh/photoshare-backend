import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { resolvers } from '../resolvers';
import { typeDefs } from '../typeDefs';
import { Post, PostContentType } from '@prisma/client';

export interface IAddPost {
	title: string;
	contentUrl: string;
	contentType: PostContentType;
	userId: string;
}

const postQuery = {
	post: {
		type: typeDefs.Post,
		args: { id: { type: GraphQLString } },
		resolve: (_: unknown, args: { id: string }) => resolvers.post.getById(args.id),
	},
	posts: {
		type: new GraphQLList(typeDefs.Post),
		resolve: resolvers.post.get,
	},
};

const postMutation = {
	addPost: {
		type: typeDefs.Post,
		args: {
			title: { type: new GraphQLNonNull(GraphQLString) },
			contentUrl: { type: new GraphQLNonNull(GraphQLString) },
			contentType: { type: new GraphQLNonNull(typeDefs.PostContentType) },
			userId: { type: new GraphQLNonNull(GraphQLString) },
		},
		resolve: (_: unknown, args: IAddPost) => resolvers.post.add(args),
	},
	// deletePost: {
	// 	type: typeDefs.Post,
	// 	args: {
	// 		id: { type: new GraphQLNonNull(GraphQLString) },
	// 	},
	// 	resolve: (_: unknown, args: { id: string }) => resolvers.post.remove(args.id),
	// },
};

export const postSchema = {
	query: postQuery,
	mutation: postMutation,
};
