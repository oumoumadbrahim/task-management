import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TStatus } from '@api/types';

export const taskResolver = yupResolver(
  Yup.object({
    action: Yup.mixed().oneOf(['add', 'edit']),
    task: Yup.object({
      id: Yup.string(),
      title: Yup.string().min(3, 'min characters 3').required('required'),
      description: Yup.string().required('required'),
      status: Yup.mixed<TStatus>().oneOf(['todo', 'in-progress', 'done']),
      tags: Yup.array().of(Yup.string().nonNullable()),
      created_date: Yup.string(),
    }),
  }),
);
