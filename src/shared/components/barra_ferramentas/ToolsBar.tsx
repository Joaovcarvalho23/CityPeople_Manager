import { Box, Button, TextField } from '@mui/material';
import React from 'react';

export const ToolsBar: React.FC = () => {
  return(
    <Box>
      <TextField />

      <Button>New</Button>
    </Box>
  );
};