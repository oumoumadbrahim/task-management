'use client';

import React from 'react';
import { Alert, Box, CircularProgress, Grid } from '@mui/material';

import Task from '@components/task';
import StatusTab from '@components/status-tab';

import { useMyFetch } from '@hooks/useApiHook';
import { useTaskActions } from '@store';

import { ITask } from '@api/types';
import server from '@api';

server();

export default function TasksPage() {
  //prettier-ignore
  const {state: { loading, error },fetchData} = useMyFetch<{ action: 'add'|'edit', tasks: ITask[] }>({ url: '/api/tasks', method: 'GET' });
  const { state, loadTasks } = useTaskActions();

  const filteredTasks = state?.tasks.filter(task => {
    if (state.selectedStatus !== 'all') {
      return task.status === state.selectedStatus;
    } else {
      return true;
    }
  });

  React.useEffect(() => {
    return () => {
      fetchData().then(data => {
        loadTasks(data.tasks);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function Error() {
    if (error) {
      return (
        <Alert severity="error" color="info">
          {error.message}
        </Alert>
      );
    }
    return null;
  }

  function Loading() {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      );
    }
    return null;
  }

  return (
    <>
      <StatusTab />

      <Grid container display="flex" direction="column" rowGap={1}>
        <Error />
        <Loading />

        {filteredTasks?.map(task => (
          <Task key={task.id} {...task} />
        ))}
      </Grid>
    </>
  );
}