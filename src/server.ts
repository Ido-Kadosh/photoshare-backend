import express from 'express';
import http from 'http';

import { createHandler } from 'graphql-http/lib/use/http';
import expressPlayground from 'graphql-playground-middleware-express';
import { schema } from './graphQL/schema';

const app = express();
const server = http.createServer(app);

app.all('/graphql', createHandler({ schema }));
// app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

const port = process.env.PORT || 3030;
server.listen(port, () => {
	console.log('Server is running on port: ' + port);
});
