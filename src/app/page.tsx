'use client';

import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" textAlign="center" paddingTop={2} paddingBottom={8}>
        Welcome To Task Management
      </Typography>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginBottom={4}
        paddingTop={2}>
        <Button variant="contained" href="/tasks">
          Enter
        </Button>
        <ArrowForward color="primary" />
      </Box>
    </Container>
  );
}
