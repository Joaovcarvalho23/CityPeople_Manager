import { Box, Button, Divider, Paper, Skeleton, useTheme } from '@mui/material';
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

  showLoadingNewButton?: boolean
  showLoadingBackButton?: boolean
  showLoadingSaveButton?: boolean
  showLoadingDeleteButton?: boolean
  showLoadingSaveAndExitButton?: boolean

  whenNewIsPressed?: () => void;
  whenBackIsPressed?: () => void;
  whenSaveIsPressed?: () => void;
  whenDeleteIsPressed?: () => void;
  whenSaveAndExitIsPressed?: () => void;
}

export const DetailTools: React.FC<IDetailToolsProps> = ({ 
  newButtonText= 'New', showNewButton = true, showBackButton = true,
  showDeleteButton = true, showSaveButton = true,
  showSaveAndExitButton = false,

  showLoadingNewButton = false, showLoadingBackButton = false,
  showLoadingDeleteButton = false, showLoadingSaveButton = false,
  showLoadingSaveAndExitButton = false,

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
      {(showSaveButton && !showLoadingSaveButton) && (
        <Button
          color='success' variant='contained'
          disableElevation endIcon={<SaveIcon/>}
          onClick={whenSaveIsPressed}
        >
        Save
        </Button>
      )}

      {showLoadingSaveButton && (
        <Skeleton width={100} height={64}/>
      )}

      {(showNewButton && !showLoadingNewButton) && (
        <Button
          color='success' variant='outlined'
          disableElevation endIcon={<AddIcon/>}
          onClick={whenNewIsPressed}
        >
          {newButtonText}
        </Button>
      )}

      {showLoadingNewButton && (
        <Skeleton width={100} height={64}/>
      )}


      {(showDeleteButton && !showLoadingDeleteButton) && (
        <Button
          color='success' variant='outlined'
          disableElevation endIcon={<DeleteIcon/>}
          onClick={whenDeleteIsPressed}
        >
        Delete
        </Button>
      )}

      {showLoadingDeleteButton && (
        <Skeleton width={100} height={64}/>
      )}

      {(showSaveAndExitButton && !showLoadingSaveAndExitButton) && (
        <Button
          color='success' variant='outlined'
          disableElevation endIcon={<ExitToAppIcon/>}
          onClick={whenSaveAndExitIsPressed}
        >
        Save and Exit
        </Button>
      )}

      {showLoadingSaveAndExitButton && (
        <Skeleton width={100} height={64}/>
      )}
      
      <Divider variant='middle'/>

      {(showBackButton && !showLoadingBackButton) && (
        <Button
          color='success' variant='outlined'
          disableElevation endIcon={<UndoIcon/>}
          onClick={whenBackIsPressed}
        >
        Back
        </Button>
      )}

      {showLoadingBackButton && (
        <Skeleton width={100} height={64}/>
      )}

    </Box>
  );
};