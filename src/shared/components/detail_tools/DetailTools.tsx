import { Box, Button, Divider, Paper, useTheme } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';

interface IDetailToolsProps {
  newButtonText?: string
  showNewButton?: boolean
  showBackButton?: boolean
  showSaveButton?: boolean
  showDeleteButton?: boolean
  showSaveAndExitButton?: boolean

  whenNewIsPressed?: () => void;
  whenBackIsPressed?: () => void;
  whenSaveIsPressed?: () => void;
  whenDeleteIsPressed?: () => void;
  whenSaveAndExitIsPressed?: () => void;
}

export const DetailTools: React.FC<IDetailToolsProps> = ({ 
  newButtonText= 'New', showNewButton = true, showBackButton = true, showDeleteButton = true, showSaveButton = true, showSaveAndExitButton = false,

  whenNewIsPressed, whenBackIsPressed, whenSaveIsPressed, whenDeleteIsPressed, whenSaveAndExitIsPressed

}) => {
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
      {showSaveButton && (
        <Button
          color='success' variant='contained'
          disableElevation endIcon={<SaveIcon/>}
          onClick={whenSaveIsPressed}
        >
        Save
        </Button>
      )}

      {showNewButton && (
        <Button
          color='success' variant='outlined'
          disableElevation endIcon={<AddIcon/>}
          onClick={whenNewIsPressed}
        >
          {newButtonText}
        </Button>
      )}


      {showDeleteButton && (
        <Button
          color='success' variant='outlined'
          disableElevation endIcon={<DeleteIcon/>}
          onClick={whenDeleteIsPressed}
        >
        Delete
        </Button>
      )}

      {showSaveAndExitButton && (
        <Button
          color='success' variant='outlined'
          disableElevation endIcon={<ExitToAppIcon/>}
          onClick={whenSaveAndExitIsPressed}
        >
        Save and Exit
        </Button>
      )}
      
      <Divider variant='middle'/>

      {showBackButton && (
        <Button
          color='success' variant='outlined'
          disableElevation endIcon={<UndoIcon/>}
          onClick={whenBackIsPressed}
        >
        Back
        </Button>
      )}

    </Box>
  );
};