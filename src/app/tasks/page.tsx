'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Alert, Box, Button, CircularProgress, Grid, Typography } from '@mui/material';

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
  const { state, loadTasks, openTaskForm } = useTaskActions();
  const { setValue } = useFormContext<{
    action: 'add' | 'edit';
    task: ITask;
  }>();

  const filteredTasks = state?.tasks.filter(task => {
    if (state.selectedStatus !== 'all') {
      return task.status === state.selectedStatus;
    } else {
      return true;
    }
  });

  function onOpenModal() {
    openTaskForm(true);
    setValue('action', 'add');
  }

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

  function Tasks() {
    if (filteredTasks.length > 0) {
      return filteredTasks?.map(task => <Task key={task.id} {...task} />);
    } else if (!loading) {
      return (
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography variant="h3" textAlign="center" paddingTop={2} paddingBottom={2}>
            No Task!
          </Typography>
          <Button
            variant="outlined"
            size="small"
            style={{ alignSelf: 'center' }}
            onClick={onOpenModal}>
            Add New Task
          </Button>
        </Box>
      );
    }
  }

  return (
    <>
      <StatusTab />
      <Grid container display="flex" direction="column" rowGap={1}>
        <Error />
        <Loading />
        <Tasks />
      </Grid>
    </>
  );
}
