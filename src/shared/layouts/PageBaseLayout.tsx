import { Menu } from '@mui/icons-material';
import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { ReactNode } from 'react';
import { useDrawerContext } from '../contexts';

interface IPageBaseLayoutProps {
    children?: React.ReactNode
    tittle: string
    toolsBar?: ReactNode
}

export const PageBaseLayout: React.FC<IPageBaseLayoutProps> = ({ children, tittle, toolsBar }) => {
  const tema = useTheme();
  const smDown = useMediaQuery(tema.breakpoints.down('sm'));
  const mdDown = useMediaQuery(tema.breakpoints.down('md'));
  const { toggleDrawerOpen } = useDrawerContext();

  return(
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box padding={1} display="flex" alignItems="center" gap={1} height={tema.spacing(smDown ? 6 : mdDown ? 8 : 12)}>

        {smDown && (
          <IconButton onClick={ toggleDrawerOpen }>
            <Menu />
          </IconButton>
        )}

        <Typography 
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          variant={smDown ? 'h5' : mdDown? 'h4' : 'h3'}
        >
          {tittle}
        </Typography>
      </Box>

      {toolsBar && (
        <Box>
          {toolsBar}
        </Box>
      )}

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};