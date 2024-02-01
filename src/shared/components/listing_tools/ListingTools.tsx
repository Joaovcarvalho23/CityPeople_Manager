import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Paper, TextField, useTheme } from '@mui/material';
import React from 'react';

interface IListingToolsProps {
  searchText?: string
  showSearchInput?: boolean
  onChangeSearchText?: (newText: string) => void;
  
  newButtonText?: string
  showNewButton?: boolean
  onPressedNewButton?: () => void;
}

export const ListingTools: React.FC<IListingToolsProps> = ({ searchText = '', showSearchInput = false, onChangeSearchText, newButtonText= 'New', showNewButton= true, onPressedNewButton }) => {
  const theme = useTheme();

  return(
    <Box 
      height={theme.spacing(6)} //altura do Box
      marginX={1} //eh a margem do nosso elemento nas beiradas, pega uma certa distancia do eixo X (horizontal)
      padding={0.5} //eh um espaco interno. O input esta grudado no nosso Box. Com o padding, temos um certo espacamento
      paddingX={2} //faz com que seja aplicado apenas nas laterais, mesma coisa do marginX
      display="flex" //muda a forma que o layout se comporta na tela
      gap={1} //ele so funciona com o display flex, com o gap podemos dizer qual a distancia entre os objetos do display
      alignItems="center" //centraliza tudo
      component={Paper}
    >
      {showSearchInput && (
        <TextField 
          size='small' placeholder='Search...'
          value={searchText}
          onChange={(e) => onChangeSearchText?.(e.target.value)} //para o onChangeSearchText parar de dar erro, colocamos um '?.' no final 
        />
      )}

      <Box flex={1} display='flex' justifyContent='flex-start'>
        
        {showNewButton && (
          <Button
            color='success' variant='contained'
            disableElevation endIcon={<AddIcon/>}
            onClick={onPressedNewButton}  
          >
            {newButtonText}
          </Button>
        )}

      </Box>
    </Box>
  );
};