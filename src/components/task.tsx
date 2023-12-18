import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Typography,
  Button,
  Chip,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

import AlertDialog from '@components/alert-dialog';

import { useMyFetch } from '@hooks/useApiHook';

import { ITask, ETag, TStatus } from '@api/types';
import { useTaskActions } from '@store';

const tagsColors: Record<ETag, string> = {
  [ETag.ui]: 'primary',
  [ETag.high]: 'error',
  [ETag.low]: 'info',
  [ETag.bug]: 'error',
  [ETag.medium]: 'secondary',
  [ETag.feature]: 'success',
};

const statusColors: { [Key in TStatus]: string } = {
  todo: '#ffb74d',
  'in-progress': '#4fc3f7',
  done: '#81c784',
};

export default function Task(task: ITask) {
  const { state, fetchData } = useMyFetch({ url: `/api/task/delete/${task.id}`, method: 'DELETE' });
  const { deleteTask, openTaskForm } = useTaskActions();
  const { setValue } = useFormContext<{ action: 'add' | 'edit'; task: ITask }>();
  const [openAlert, setOpenAlert] = React.useState(false);

  const d = new Date(task.created_date);

  function onDeleteTask() {
    setOpenAlert(false);
    fetchData().then(id => deleteTask(id));
  }

  async function onEdit() {
    await setValue('task', task);
    await setValue('action', 'edit');
    openTaskForm(true);
  }

  return (
    <>
      <AlertDialog
        isOpen={openAlert}
        title="Delete"
        body="Are you sure!!"
        onAgree={onDeleteTask}
        handleClose={setOpenAlert}
      />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h5" component="div" marginRight={3}>
            {task.title}
          </Typography>
          <Chip
            label={task.status}
            style={{
              textTransform: 'capitalize',
              color: 'white',
              backgroundColor: statusColors[task.status],
              borderRadius: 8,
            }}
            variant="filled"
          />
        </AccordionSummary>

        <AccordionDetails>
          <Grid display="flex" columnGap={1} paddingBottom={1}>
            {task.tags.map((tag, i) => (
              <Chip
                key={`tag-${i}`}
                label={tag}
                variant="outlined"
                style={{ padding: 4 }}
                size="small"
                color={tagsColors[tag] as never}
              />
            ))}
          </Grid>
          <Typography variant="subtitle1" fontWeight={200}>
            {task.description}
          </Typography>
          <Typography variant="caption" color="grey">
            {`${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`}
          </Typography>
        </AccordionDetails>

        <AccordionActions>
          <Button size="small" onClick={onEdit}>
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            disabled={state.loading}
            onClick={() => setOpenAlert(true)}>
            {state.loading ? '...Loading' : 'Delete'}
          </Button>
        </AccordionActions>
      </Accordion>
    </>
  );
}
