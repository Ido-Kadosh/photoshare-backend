import { PrismaClient } from '@prisma/client';

interface IResult {
	[key: string]: any;
}

const prismaClientSingleton = () => {
	const prisma = new PrismaClient();

	function convertObjectDatesToUnix(obj: any): any {
		if (obj instanceof Date) {
			// Direct Date object conversion
			return Math.floor(obj.getTime() / 1000);
		} else if (Array.isArray(obj)) {
			// Recursively process each item in the array
			return obj.map(convertObjectDatesToUnix);
		} else if (obj !== null && typeof obj === 'object') {
			// Recursively process each property if the item is an object
			const result: IResult = {};
			for (const [key, value] of Object.entries(obj)) {
				result[key] = convertObjectDatesToUnix(value);
			}
			return result;
		}
		// Return the original value if none of the above conditions are met
		return obj;
	}

	return prisma.$extends({
		query: {
			$allModels: {
				async $allOperations({ args, model, operation, query }) {
					const response = await query(args);
					return convertObjectDatesToUnix(response);
				},
			},
		},
	});
};

declare global {
	var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
