import { User } from '@prisma/client';

import prisma from '../../db';
import { IAddUser } from '../schema/userSchema';

const getByPostId = async (postId: string): Promise<User | null> => {
	return prisma.user.findFirst({
		where: {
			posts: {
				some: {
					id: postId,
				},
			},
		},
	});
};

const get = async (): Promise<User[]> => {
	return prisma.user.findMany();
};

const getById = async (userId: string): Promise<User | null> => {
	return prisma.user.findUnique({
		where: {
			id: userId,
		},
	});
};

const add = async (user: IAddUser): Promise<User> => {
	return await prisma.user.create({
		data: {
			username: user.username,
			email: user.email,
			imgUrl: user.imgUrl,
		},
	});
};

export const userResolvers = {
	getByPostId,
	get,
	getById,
	add,
};
