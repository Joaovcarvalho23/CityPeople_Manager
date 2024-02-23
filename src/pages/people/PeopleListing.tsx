import React, { useEffect, useMemo } from 'react';
import { PageBaseLayout } from '../../shared/layouts';
import { ListingTools } from '../../shared/components';
import { useSearchParams } from 'react-router-dom';
import { PeopleService } from '../../shared/services/api/people/PeopleService';
import { UseDebounce } from '../../shared/hooks';

export const PeopleListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = UseDebounce(3000, false); //ele vai executar o UseDebounce

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  useEffect(() => {

    debounce(() => {
      PeopleService.getAll(1, search).then((resultado) => {
        if (resultado instanceof Error) {
          alert(resultado.message);
          return;
        }
        console.log(resultado);
      });
    }); //este corpo executa a consulta ao banco de dados

  }, [search]);

  return (
    <PageBaseLayout
      tittle='People List'
      toolsBar={
        <ListingTools
          newButtonText='New'
          showSearchInput
          onChangeSearchText={(text) => setSearchParams({ search: text }, { replace: true })}
          searchText={search}
        />
      }
    ></PageBaseLayout>
  );
};
