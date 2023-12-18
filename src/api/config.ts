import { createServer } from 'miragejs';
import { endpoints } from './endpoints';
import { models } from './models';
import { factories } from './factories';
import { localStorageHelper } from '@utils/local-storage';

export function startMirage() {
  const dbData = localStorageHelper?.get('miragedb');
  const server = createServer({
    models,
    factories,
    seeds(server) {
      if (dbData) {
        server.db.loadData(JSON.parse(dbData));
      }
    },
  });

  if (server.pretender?.handledRequest) {
    server.pretender.handledRequest = function (verb, path, request) {
      if (!['get', 'head'].includes(verb.toLowerCase())) {
        localStorageHelper.set('miragedb', JSON.stringify(server.db.dump()));
      }
    };
  }

  // logging
  server.logging = true;

  // external URLs
  server.post(`${process.env.RAYGUN_URL}/:any`, () => new Promise((_res: any) => {}));

  // internal URLs
  server.urlPrefix = process.env.API_URL ?? '';
  for (const namespace of Object.keys(endpoints)) {
    //@ts-ignore
    endpoints[namespace](server);
  }

  // Reset for everything else
  server.namespace = 'api';
  server.passthrough();
}
