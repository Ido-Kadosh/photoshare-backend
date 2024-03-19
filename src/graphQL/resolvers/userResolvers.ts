import { Post, User } from '@prisma/client';

const users: User[] = [
	{
		id: '123123',
		username: 'benjamin',
		email: '123@gmail.com',
		imgUrl: 'htp.com',
		createdAt: new Date(),
	},
];

const getByPost = async (post: Post): Promise<User | undefined> => {
	return users.find(user => user.id === post.userId);
};

const getById = async (userId: string): Promise<User | undefined> => {
	return users.find(user => user.id === userId);
};

const get = async (): Promise<User[]> => {
	return users;
};

export const userResolvers = {
	getByPost,
	get,
	getById,
};
