'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Container, Typography } from '@mui/material';

import TaskFormModal from '@components/task-form';

import { taskResolver } from '@utils/yup-schema';

import { useTaskActions } from '@store';

function HeadTitle() {
  const { state } = useTaskActions();
  return (
    <Typography variant="h4" textAlign="center" textTransform="capitalize">
      {state.selectedStatus} Tasks
    </Typography>
  );
}

export default function TasksPage({ children }: { children: React.ReactNode }) {
  const methods = useForm({
    mode: 'all',
    resolver: taskResolver,
    defaultValues: {
      task: {
        title: '',
        description: '',
        status: 'todo',
        tags: [],
        created_date: new Date().toString(),
      },
      action: 'add',
    },
  });

  return (
    <FormProvider {...methods}>
      <Container maxWidth="lg">
        <Typography variant="h3" textAlign="center" paddingTop={2} paddingBottom={8}>
          Task Management
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom={4}
          paddingTop={2}>
          <HeadTitle />
          <TaskFormModal />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          marginBottom={4}>
          {children}
        </Box>
      </Container>
    </FormProvider>
  );
}
