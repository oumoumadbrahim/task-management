import * as React from 'react';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { useTaskActions } from '@store';
import { ITask } from '@api/types';

function samePageLinkNavigation(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

const links: Array<ITask['status'] | 'all'> = ['all', 'todo', 'in-progress', 'done'];

export default function StatusTab() {
  const { changeFilter } = useTaskActions();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (
      event.type !== 'click' ||
      (event.type === 'click' &&
        samePageLinkNavigation(event as React.MouseEvent<HTMLAnchorElement, MouseEvent>))
    ) {
      setValue(newValue);
      changeFilter(links[newValue]);
    }
  };

  function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (samePageLinkNavigation(e)) {
      e.preventDefault();
    }
  }

  return (
    <Box sx={{ width: '100%', paddingBottom: 6 }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tab tasks" centered>
        <Tab label="All" component="a" onClick={handleClick} />
        <Tab label="Todo" component="a" onClick={handleClick} />
        <Tab label="In Progress" component="a" onClick={handleClick} />
        <Tab label="Done" component="a" onClick={handleClick} />
      </Tabs>
    </Box>
  );
}
