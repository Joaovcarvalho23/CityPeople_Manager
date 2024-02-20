/* eslint-disable react/react-in-jsx-scope */
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { PeopleListing, Dashboard } from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/home-page',
        label: 'Home page'
      },
      {
        icon: 'people',
        path: '/people',
        label: 'People'
      }
    ]);
  },[]);

  return(
    <Routes>
      <Route path="/home-page" element={<Dashboard />} />
      {/* <Route path="/cities/details/:id" element={<CityListing />} /> */}
      <Route path="/people" element={<PeopleListing />} />
           
      <Route path="*" element={<Navigate to="/home-page"/>}/>
    </Routes>
  );

};