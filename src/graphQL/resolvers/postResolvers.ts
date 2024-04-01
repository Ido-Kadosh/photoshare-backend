import { Post } from '@prisma/client';
import prisma from '../../db';
import { IAddPost } from '../schema/postSchema';

const getByUserId = async (userId: string) => {
	return await prisma.post.findMany({
		where: {
			userId,
		},
	});
};

const get = async (userId: string) => {
	const posts = await prisma.post.findMany({
		include: {
			likedByUsers: {
				select: { id: true }, // Minimize the amount of data fetched
				where: { id: userId }, // Fetch only the current user's like
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
	return posts.map(post => ({
		...post,
		likedByUser: post.likedByUsers.length > 0,
	}));
};

const getById = async (postId: string): Promise<Post | null> => {
	return await prisma.post.findUnique({
		where: {
			id: postId,
		},
	});
};

const add = async (post: IAddPost): Promise<any> => {
	return await prisma.post.create({
		data: {
			title: post.title,
			contentUrl: post.contentUrl,
			contentType: post.contentType,
			userId: post.userId,
		},
	});
};

const remove = async (postId: string): Promise<Post | null> => {
	return await prisma.post.delete({
		where: {
			id: postId,
		},
	});
};

const toggleLike = async ({ postId, userId }: { postId: string; userId: string }) => {
	const post = await prisma.post.findUnique({
		where: { id: postId },
		include: {
			likedByUsers: {
				where: {
					id: userId,
				},
			},
		},
	});
	if (!post) throw new Error('Post not found');

	const alreadyLiked = post.likedByUsers.length > 0;

	if (alreadyLiked) {
		return await prisma.post.update({
			where: { id: postId },
			data: {
				likedByUsers: {
					disconnect: [{ id: userId }],
				},
			},
		});
	} else {
		return await prisma.post.update({
			where: { id: postId },
			data: {
				likedByUsers: {
					connect: [{ id: userId }],
				},
			},
		});
	}
};

export const postResolver = {
	get,
	getByUserId,
	getById,
	add,
	remove,
	toggleLike,
};
