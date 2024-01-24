import { BrowserRouter } from 'react-router-dom';
import { RotasDoApp } from './routes';
import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import { MenuLateral } from './shared/components';

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>

        <BrowserRouter>

          <MenuLateral>
            <RotasDoApp />
          </MenuLateral>
        
        </BrowserRouter>

      </DrawerProvider>
    </AppThemeProvider>
  );
};