/* eslint-disable react/react-in-jsx-scope */
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { CityListing, Dashboard } from '../pages';

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
        icon: 'location_city',
        path: '/cities',
        label: 'Cities'
      }
    ]);
  },[]);

  return(
    <Routes>
      <Route path="/home-page" element={<Dashboard />} />
      {/* <Route path="/cities/details/:id" element={<CityListing />} /> */}
      <Route path="/cities" element={<CityListing />} />
           
      <Route path="*" element={<Navigate to="/home-page"/>}/>
    </Routes>
  );

};