import cors from 'cors';
import express from 'express';
import { createHandler } from 'graphql-http/lib/use/http';
import expressPlayground from 'graphql-playground-middleware-express';
import http from 'http';
import path from 'path';
import { schema } from './graphQL/schema';
import { getPresignedUrl } from './S3';

if (!process.env.BUCKET_REGION || !process.env.ACCESS_KEY || !process.env.SECRET_ACCESS_KEY) {
	console.error('Critical environment variables are missing. Shutting down...');
	process.exit(1);
}

const app = express();
const server = http.createServer(app);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.resolve('public')));
} else {
	const corsOptions = {
		origin: [
			'http://127.0.0.1:3000',
			'http://localhost:3000',
			'http://127.0.0.1:5173',
			'http://localhost:5173',
			'http://127.0.0.1:5174',
			'http://localhost:5174',
		],
		credentials: true,
	};
	app.use(cors(corsOptions));
}

app.all('/graphql', createHandler({ schema }));
app.get('/generate-presigned-url', getPresignedUrl);
app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

const port = process.env.PORT || 3030;
server.listen(port, () => {
	console.log('Server is running on port: ' + port);
});
