import { Registry } from 'miragejs';
import Schema from 'miragejs/orm/schema';

import { models } from './models';
import { factories } from './factories';

export type TStatus = 'todo' | 'in-progress' | 'done';
export enum EStatus {
  todo = 'todo',
  'in-progress' = 'in-progress',
  done = 'done',
}
export type TTag = 'high' | 'medium' | 'low' | 'bug' | 'feature' | 'ui';
export enum ETag {
  ui = 'ui',
  high = 'high',
  low = 'low',
  bug = 'bug',
  medium = 'medium',
  feature = 'feature',
}

export interface ITask {
  id: string;
  title: string;
  status: TStatus;
  tags: TTag[];
  description: string;
  created_date: string;
}

type AppRegistry = Registry<typeof models, typeof factories>;
export type AppSchema = Schema<AppRegistry>;
