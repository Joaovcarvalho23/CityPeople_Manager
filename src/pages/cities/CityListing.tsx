import React, { useMemo } from 'react';
import { PageBaseLayout } from '../../shared/layouts';
import { ListingTools } from '../../shared/components';
import { useSearchParams } from 'react-router-dom';

export const CityListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams?.get('search') || '';
  }, [searchParams]);

  return(
    <PageBaseLayout
      tittle='City List'
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