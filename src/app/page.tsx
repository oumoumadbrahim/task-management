'use client';

import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

import server from '@api';

server();

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh">
        <Typography variant="h3" textAlign="center" paddingTop={2} paddingBottom={8}>
          Welcome
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="/tasks"
          endIcon={<ArrowForward color="inherit" />}>
          Enter
        </Button>
      </Box>
    </Container>
  );
}
