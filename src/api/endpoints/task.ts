import { Response, Server } from 'miragejs';
import { AppSchema } from '../types';

export function routesForTasks(server: Server) {
  server.get(`/api/tasks`, (schema: AppSchema, request) => {
    const tasks = schema.all('task');
    return new Response(200, {}, tasks);
  });

  server.post('/api/tasks/create', (schema: AppSchema, request) => {
    const attrs = JSON.parse(request.requestBody);
    attrs.id = 'id-' + Date.now();

    schema.create('task', attrs);

    return new Response(200, {}, attrs);
  });

  server.post('/api/task/edit', (schema: AppSchema, request) => {
    const attrs = JSON.parse(request.requestBody);

    const findTask = schema.findBy('task', { id: attrs.id });

    findTask?.update(attrs);

    return new Response(200, {}, attrs);
  });

  server.delete('/api/task/delete/:id', (schema: AppSchema, request) => {
    const id = request.params.id;

    schema.find('task', id)?.destroy();

    return new Response(200, {}, id);
  });
}
