import * as React from 'react';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import {
  Chip,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  InputLabel,
  FormHelperText,
  Grid,
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
} from '@mui/material';
import { useMyFetch } from '@hooks/useApiHook';
import { EStatus, ITask } from '@api/types';
import { useTaskActions } from '@store';

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const formWrapper = {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '24px',
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const mytags = ['ui', 'high', 'low', 'bug'];

export default function TaskFormModal() {
  const { fetchData: creatTask } = useMyFetch({ url: '/api/tasks/create', method: 'POST' });
  const { fetchData: updateTask } = useMyFetch({ url: '/api/task/edit', method: 'POST' });
  const { state, addTask, editTask, openTaskForm } = useTaskActions();
  const { handleSubmit, control, getValues, setValue } = useFormContext<{
    action: 'add' | 'edit';
    task: ITask;
  }>();

  async function onSubmit(values: any) {
    if (getValues('action') === 'add') {
      await creatTask(values?.task).then(data => addTask(data));
    } else {
      await updateTask(values?.task).then(data => editTask(data));
    }
    openTaskForm(false);
  }

  function onError(errors: any) {}

  function submitText() {
    if (getValues('action') === 'add') {
      return 'create';
    } else {
      return 'update';
    }
  }

  function onCloseModal() {
    openTaskForm(false);
  }

  function onOpenModal() {
    openTaskForm(true);
    setValue('action', 'add');
  }

  return (
    <>
      <Button variant="contained" onClick={onOpenModal}>
        Add New Task
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={state.taskFormModal}
        onClose={onCloseModal}
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={state.taskFormModal}>
          <Box sx={boxStyle}>
            <Typography variant="h5" textTransform="capitalize" paddingBottom={4}>
              {getValues('action')} Task
            </Typography>

            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <Box sx={formWrapper}>
                <Controller
                  control={control}
                  name="task.title"
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      label="Title"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      helperText={error?.message}
                      error={!!error?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="task.status"
                  render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                    <FormControl fullWidth>
                      <InputLabel id="status-task-select-label">Status</InputLabel>
                      <Select
                        labelId="status-task-select-label"
                        id="status-task-select-id"
                        value={value}
                        label="Status"
                        onChange={onChange}>
                        {Object.values(EStatus).map((val, i) => (
                          <MenuItem key={`status-${i}`} value={val}>
                            {val}
                          </MenuItem>
                        ))}
                      </Select>
                      {!!error?.message && <FormHelperText>{error?.message}</FormHelperText>}
                    </FormControl>
                  )}
                />

                <Controller
                  control={control}
                  name="task.tags"
                  render={({ field: { onChange, value } }) => {
                    function handleChange(e: SelectChangeEvent<typeof value>) {
                      const val = e.target.value;
                      onChange(typeof val === 'string' ? val.split(',') : val);
                    }

                    return (
                      <FormControl fullWidth>
                        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                        <Select
                          labelId="task-tags"
                          id="task-tags"
                          multiple
                          value={value}
                          onChange={handleChange}
                          input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
                          renderValue={tags => (
                            <Box
                              sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 0.5,
                              }}>
                              {tags.map(tag => (
                                <Chip key={tag} label={tag} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}>
                          {mytags.map(tag => (
                            <MenuItem key={tag} value={tag}>
                              {tag}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    );
                  }}
                />

                <Controller
                  control={control}
                  name="task.description"
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      label="Description"
                      variant="outlined"
                      multiline={true}
                      minRows={3}
                      value={value}
                      onChange={onChange}
                      helperText={error?.message}
                      error={!!error?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="task"
                  render={({ formState: { isSubmitting, isValidating, isValid } }) => (
                    <Grid paddingTop={2} display="flex" justifyContent="space-between">
                      <Button variant="outlined" onClick={() => openTaskForm(false)}>
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={!isValid || isSubmitting || isValidating}>
                        {isSubmitting || isValidating ? 'Loading...' : submitText()}
                      </Button>
                    </Grid>
                  )}
                />
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
