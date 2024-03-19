import { Post, User } from '@prisma/client';
import { IAddPost } from '../schema/postSchema';

const posts: Post[] = [
	{
		id: '123123',
		title: 'first post',
		contentUrl: 'https://picsum.photos/480/585 ',
		contentType: 'IMG',
		createdAt: new Date(),
		userId: '123123',
		commentCount: 12,
		tags: ['11'],
	},
];

const getByUser = async (user: User) => {
	return posts.filter(post => post.userId === user.id);
};

const get = async () => {
	return posts;
};

const getById = async (postId: string): Promise<Post | undefined> => {
	return posts.find(post => post.id === postId);
};

const add = async (post: IAddPost): Promise<Post> => {
	const newPost: Post = { ...post, id: posts.length + 1 + '', createdAt: new Date() } as Post;
	posts.push(newPost);
	return newPost;
};

// const remove = async (postId: string): Promise<Post | undefined> => {};

export const postResolver = {
	get,
	getByUser,
	getById,
	add,
	// remove,
};
