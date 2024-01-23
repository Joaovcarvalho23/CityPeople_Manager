/* eslint-disable react/react-in-jsx-scope */
import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppThemeContext } from '../shared/contexts';

export const RotasDoApp = () => {
  const { toggleTheme } = useAppThemeContext();
  return(
    <Routes>
      <Route 
        path="/pagina-inicial" 
        element={<Button variant="contained" color="primary" onClick={toggleTheme}>Toggle Theme!</Button>}/>
           
      <Route path="*" element={<Navigate to="/pagina-inicial"/>}/>
    </Routes>
  );

};