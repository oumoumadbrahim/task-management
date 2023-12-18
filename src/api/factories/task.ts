import { Factory } from 'miragejs';
// import * as faker from "faker"
import { ITask } from '../types';
export const taskFactory = Factory.extend<ITask>({
  id(i) {
    return `${i}`;
  },
  title() {
    return '';
  },
  description() {
    return '';
  },
  status() {
    return 'todo';
  },
  tags() {
    return [];
  },
  created_date() {
    return Date.now().toString();
  },
});
