import React, { useEffect, useMemo } from 'react';
import { PageBaseLayout } from '../../shared/layouts';
import { ListingTools } from '../../shared/components';
import { useSearchParams } from 'react-router-dom';
import { PeopleService } from '../../shared/services/api/people/PeopleService';

export const PeopleListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams?.get('search') || '';
  }, [searchParams]);

  // useEffect(() => {
  //   PeopleService
  // });

  return(
    <PageBaseLayout
      tittle='People List'
      toolsBar={
        <ListingTools 
          newButtonText='New'
          showSearchInput
          onChangeSearchText={text => setSearchParams({ search: text }, {replace: true})}
          searchText={ search } // o ?? faz praticamente a mesma coisa do ||
        />}
    >

    </PageBaseLayout>
  );
};