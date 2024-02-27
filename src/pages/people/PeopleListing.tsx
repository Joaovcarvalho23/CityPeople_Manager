import React, { useEffect, useMemo, useState } from 'react';
import { PageBaseLayout } from '../../shared/layouts';
import { ListingTools } from '../../shared/components';
import { useSearchParams } from 'react-router-dom';
import { IPeopleListing, PeopleService } from '../../shared/services/api/people/PeopleService';
import { UseDebounce } from '../../shared/hooks';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export const PeopleListing: React.FC = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = UseDebounce(); //ele vai executar o UseDebounce
  const [ rows, setRows ] = useState<IPeopleListing[]>([]);
  const [ totalCount, setTotalCount ] = useState(0);

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PeopleService.getAll(1, search).then((resultado) => {

        setIsLoading(false);

        if (resultado instanceof Error) {
          alert(resultado.message);
          return;
        }
        console.log(resultado);

        setTotalCount(resultado.totalCount);
        setRows(resultado.data);
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
    >

      <TableContainer 
        component={Paper} 
        variant='outlined' 
        sx={{ m: 1, width:'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Full Name</strong></TableCell>
              <TableCell><strong>E-Mail</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.fullName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>


    </PageBaseLayout>
  );
};
