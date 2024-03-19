import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLEnumType } from 'graphql';

import { Post as PostType, User } from '@prisma/client';
import { resolvers } from './resolvers';

const PostContentType = new GraphQLEnumType({
	name: 'ContentType',
	values: {
		IMG: { value: 'IMG' },
		VIDEO: { value: 'VIDEO' },
	},
});

const User: GraphQLObjectType<User> = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: { type: new GraphQLNonNull(GraphQLString) },
		username: { type: new GraphQLNonNull(GraphQLString) },
		email: { type: new GraphQLNonNull(GraphQLString) },
		imgUrl: { type: new GraphQLNonNull(GraphQLString) },
		createdAt: { type: new GraphQLNonNull(GraphQLString) },
		posts: {
			type: new GraphQLList(Post),
			resolve: resolvers.post.getByUser,
		},
	}),
});

const Post: GraphQLObjectType<PostType> = new GraphQLObjectType({
	name: 'Post',
	fields: () => ({
		id: { type: new GraphQLNonNull(GraphQLString) },
		title: { type: new GraphQLNonNull(GraphQLString) },
		contentUrl: { type: new GraphQLNonNull(GraphQLString) },
		contentType: { type: new GraphQLNonNull(GraphQLString) },
		createdAt: { type: new GraphQLNonNull(GraphQLString) },
		userId: { type: new GraphQLNonNull(GraphQLString) },
		user: {
			type: User,
			resolve: resolvers.user.getByPost,
		},
	}),
});

export const typeDefs = {
	Post,
	User,
	PostContentType,
};
