import { Model } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';
import { ITask } from '../types';

const TaskModel: ModelDefinition<ITask> = Model.extend({});

export const models = {
  task: TaskModel,
};
