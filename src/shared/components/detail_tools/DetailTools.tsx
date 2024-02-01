import { Box, Button, Divider, Paper, useTheme } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';

export const DetailTools: React.FC = () => {
  const theme = useTheme();

  return(
    <Box 
      height={theme.spacing(6)}
      marginX={1} 
      padding={0.5}
      paddingX={2}
      display="flex"
      gap={1}
      alignItems="center"
      component={Paper}
    >
      <Button
        color='success' variant='contained'
        disableElevation endIcon={<SaveIcon/>}
      >
        Save
      </Button>
      <Button
        color='success' variant='outlined'
        disableElevation endIcon={<AddIcon/>}
      >
        New
      </Button>
      <Button
        color='success' variant='outlined'
        disableElevation endIcon={<ExitToAppIcon/>}
      >
        Save and Exit
      </Button>
      <Button
        color='success' variant='outlined'
        disableElevation endIcon={<DeleteIcon/>}
      >
        Delete
      </Button>

      <Divider variant='middle'/>

      <Button
        color='success' variant='outlined'
        disableElevation endIcon={<UndoIcon/>}
      >
        Back
      </Button>
    </Box>
  );
};