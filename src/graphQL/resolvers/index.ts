import { postResolver } from './postResolvers';
import { userResolvers } from './userResolvers';

export const resolvers = {
	user: userResolvers,
	post: postResolver,
};
