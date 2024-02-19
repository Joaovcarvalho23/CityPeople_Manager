import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerOption {
  path: string;
  label: string;
  icon: string;
}

interface IDrawerContextData {
    isDrawerOpen: boolean;
    drawerOptions: IDrawerOption[];
    toggleDrawerOpen: () => void;
    setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}


const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () =>{ //o useAppThemeContext vai retornar as propriedades do IThemeContext
  return useContext(DrawerContext);
};

interface IAppThemeProviderProps {
    children: React.ReactNode
}

// export const AppThemeProvider: React.FC = ({ children }) => { Do react 17 para o 18, o children não pode mais ser feito dessa forma, devemos fazer do método abaixo!!!
// foi criada uma interface IAppThemeProviderProps, para ser passada como parâmetro do React.FC, para deixar o código mais legível e manter o padrão.
export const DrawerProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {

  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawerOpen = useCallback(() => { //o useCallback tem a capacidade de armazenar funções dentro dele. Passamos dois parâmetros: uma função e um array de dependências. A função será armazenada dentro da memória. E o array de dependências vai nos dizer onde essa função precisa ser atualizada na memória
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen); //o valor atual é falso (menu fechado). Se pegarmos o valor atual e negarmos, ele será true (menu aberto)
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => { 
    setDrawerOptions(newDrawerOptions);
  }, []);

    
  return(
    <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions }}>
      { children }
    </DrawerContext.Provider>
  );
};