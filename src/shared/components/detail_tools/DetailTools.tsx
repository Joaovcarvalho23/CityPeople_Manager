import { Box, Button, Divider, Paper, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';
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
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

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
          <Typography variant='button' whiteSpace="nowrap" overflow='hidden'>
            Save
          </Typography>

        </Button>
      )}

      {showLoadingSaveButton && (
        <Skeleton width={100} height={64}/>
      )}

      {(showNewButton && !showLoadingNewButton && !smDown) && (
        <Button
          color='success' variant='outlined'
          disableElevation endIcon={<AddIcon/>}
          onClick={whenNewIsPressed}
        >
          <Typography variant='button' whiteSpace="nowrap" overflow='hidden'>
            {newButtonText}
          </Typography>

        </Button>
      )}

      {(showLoadingNewButton && !smDown) && (
        <Skeleton width={100} height={64}/>
      )}


      {(showDeleteButton && !showLoadingDeleteButton) && (
        <Button
          color='success' variant='outlined'
          disableElevation endIcon={<DeleteIcon/>}
          onClick={whenDeleteIsPressed}
        >
          <Typography variant='button' whiteSpace="nowrap" overflow='hidden'>
            Delete
          </Typography>

        </Button>
      )}

      {showLoadingDeleteButton && (
        <Skeleton width={100} height={64}/>
      )}

      {(showSaveAndExitButton && !showLoadingSaveAndExitButton && !smDown && !mdDown) && (
        <Button
          color='success' variant='outlined'
          disableElevation endIcon={<ExitToAppIcon/>}
          onClick={whenSaveAndExitIsPressed}
        >
          <Typography variant='button' whiteSpace="nowrap" overflow='hidden'>
            Save and Exit
          </Typography>

        </Button>
      )}

      {(showLoadingSaveAndExitButton  && !smDown && !mdDown) && (
        <Skeleton width={100} height={64}/>
      )}
      
      {
        (   
          showBackButton && (showNewButton || showDeleteButton || showSaveButton || showSaveAndExitButton) && (
            <Divider variant='middle'/>
          )
        )
      }

      {(showBackButton && !showLoadingBackButton) && (
        <Button
          color='success' variant='outlined'
          disableElevation endIcon={<UndoIcon/>}
          onClick={whenBackIsPressed}
        >
          <Typography variant='button' whiteSpace="nowrap" overflow='hidden'>
            Back
          </Typography>

        </Button>
      )}

      {showLoadingBackButton && (
        <Skeleton width={100} height={64}/>
      )}

    </Box>
  );
};