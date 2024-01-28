/* eslint-disable react/react-in-jsx-scope */
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard } from '../pages';

export const RotasDoApp = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página Inicial'
      },
      {
        icon: 'star',
        path: '/cidades',
        label: 'Cidades'
      }
    ]);
  },[]);

  return(
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
           
      <Route path="*" element={<Navigate to="/pagina-inicial"/>}/>
    </Routes>
  );

};