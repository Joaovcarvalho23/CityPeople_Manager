/* eslint-disable react/react-in-jsx-scope */
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { PeopleListing, Dashboard, PeopleDetails, CityDetails } from '../pages';
import { CityListing } from '../pages/city/CityListing';

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
      },
      {
        icon: 'city_icon',
        path: '/city',
        label: 'Cities'
      }
    ]);
  },[]);

  return(
    <Routes>
      <Route path="/home-page" element={<Dashboard />} />
      <Route path="/people/details/:id" element={<PeopleDetails />} />
      <Route path="/people" element={<PeopleListing />} />

      <Route path="/city/details/:id" element={<CityDetails />} />
      <Route path="/city" element={<CityListing />} />
           
      <Route path="*" element={<Navigate to="/home-page"/>}/>
    </Routes>
  );

};