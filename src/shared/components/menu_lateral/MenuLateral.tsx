import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme, } from '@mui/material';
import React from 'react';
import Avatar from '@mui/material/Avatar';
import { useAppThemeContext, useDrawerContext,  } from '../../contexts';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { DarkMode, Home } from '@mui/icons-material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import GroupIcon from '@mui/icons-material/Group';

interface IListItemLinkProps {
  label: string;
  icon: string;
  to: string; //vai ser a rota do react router DOM para a tela que queremos navegar
  onClick: (() => void) | undefined; 
  /*
  essa função vai servir para quando tivermos com o menu temporário e clicarmos numa opção do menu, nós 
  vamos querer fechar o nosso menu lateral, pois ele é temporário e vai estar aberto, daí nós fechamos 
  ele e navegamos para outra rota. Por padrão, ele não fecha sozinho. Sendo assim, precisamso ter que 
  dizer para ele fechar o menu lateral. Para isso, configuramos o onClick
  */
} 

interface IMenuLateralProps {
    children: React.ReactNode
}

const validIcons: { [key: string]: React.ElementType } = {
  home: Home,
  location_city: LocationCityIcon,
  people: GroupIcon
};

const ListItemlink:React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) =>{

  const navegar = useNavigate();

  const resolvedPath = useResolvedPath(to);

  const match = useMatch({ path: resolvedPath.pathname, end: false  });

  const handleClick = () => {
    navegar(to);
    onClick?.(); //essa função é undefined? Se sim, não faz nada. Se não, executa
  }; //estamos fazendo isso pois queremos que, quando o usuário clique na opção de menu, ele navegue para uma outra tela. Para isso, usamos o react-router-dom. 

  const IconComponent = validIcons[icon];

  return(
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        {IconComponent && <IconComponent />}
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};


export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();

  return(
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">

          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://avatars.githubusercontent.com/u/62736535?s=400&u=b56a1e987788018eda6ff4e6f5e077c00f939bef&v=4" />
          </Box>

          <Divider />

          
          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map(drawerOption => (
                <ListItemlink
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  to={drawerOption.path}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>

          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <DarkMode/>
                </ListItemIcon>
                <ListItemText primary= "Change theme" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height='100vh' marginLeft={smDown? 0 : theme.spacing(28)}>
        { children }
      </Box>
    </>
    
  );
};