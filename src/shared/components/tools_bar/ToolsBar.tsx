import { Box, Button, Paper, TextField, useTheme } from '@mui/material';
import React from 'react';

export const ToolsBar: React.FC = () => {
  const theme = useTheme();

  return(
    <Box height={theme.spacing(7)} marginX={1} padding={1} paddingX={2} display="flex" gap={1} alignItems="center" component={Paper}>
      <TextField />

      <Button>New</Button>
    </Box>
  );
};