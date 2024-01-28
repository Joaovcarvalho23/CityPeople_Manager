import { Menu } from '@mui/icons-material';
import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { useDrawerContext } from '../contexts';

interface ILayoutBaseDaPaginaProps {
    children: React.ReactNode
    titulo: string
}

export const LayoutBaseDaPagina: React.FC<ILayoutBaseDaPaginaProps> = ({ children, titulo }) => {
  const tema = useTheme();
  const smDown = useMediaQuery(tema.breakpoints.down('sm'));
  const { toggleDrawerOpen } = useDrawerContext();

  return(
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box padding={1} display="flex" alignItems="center" height={tema.spacing(12)}>

        {smDown && (
          <IconButton onClick={ toggleDrawerOpen }>
            <Menu />
          </IconButton>
        )}

        <Typography variant='h5'>
          {titulo}
        </Typography>
      </Box>

      <Box>
        Barra de ferramentas
      </Box>

      <Box>
        {children}
      </Box>
    </Box>
  );
};