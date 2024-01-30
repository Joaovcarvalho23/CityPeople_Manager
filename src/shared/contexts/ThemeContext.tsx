import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { DarkTheme, LightTheme } from '../themes';
import { Box, ThemeProvider } from '@mui/material';

interface IThemeContext {
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContext);

export const useAppThemeContext = () =>{ //o useAppThemeContext vai retornar as propriedades do IThemeContext
  return useContext(ThemeContext);
};

interface IAppThemeProviderProps {
    children: React.ReactNode
}

// export const AppThemeProvider: React.FC = ({ children }) => { Do react 17 para o 18, o children não pode mais ser feito dessa forma, devemos fazer do método abaixo!!!
// foi criada uma interface IAppThemeProviderProps, para ser passada como parâmetro do React.FC, para deixar o código mais legível e manter o padrão.
export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {

  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => { //o useCallback tem a capacidade de armazenar funções dentro dele. Passamos dois parâmetros: uma função e um array de dependências. A função será armazenada dentro da memória. E o array de dependências vai nos dizer onde essa função precisa ser atualizada na memória
    setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
  }, []);

  const theme = useMemo(() => {

    if (themeName === 'light') return LightTheme;
    return DarkTheme;

  }, [themeName]); //o useMemo serve para armazenar valores
    //toda vez que o nome do tema for alterado na linha do 'const [themeName, setThemeName] = useState<'light' | 'dark'>('light');', esta função vai ser executada e o novo valor vai estar dentro do 'theme', uma hora pode ser LightTheme e depois DarkTheme
    
  return(
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
          { children }
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};