import React, { useEffect, useMemo, useState } from 'react';
import { PageBaseLayout } from '../../shared/layouts';
import { ListingTools } from '../../shared/components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IPeopleListing, PeopleService } from '../../shared/services/api/people/PeopleService';
import { UseDebounce } from '../../shared/hooks';
import { IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { Environment } from '../../shared/environment';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

export const PeopleListing: React.FC = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = UseDebounce(); //ele vai executar o UseDebounce
  const [ rows, setRows ] = useState<IPeopleListing[]>([]);
  const [ totalCount, setTotalCount ] = useState(0);
  const navigate = useNavigate();

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get('page') || '1');
  }, [searchParams]);

  const deleteHandle = (id: number, fullName: string) => {
    if(confirm(`Do you really wants to delete user "${fullName}"?`)){
      PeopleService.deleteById(id)
        .then(resultado => {
          if(resultado instanceof Error) {
            alert(resultado.message);

          } else{           //lógica para remover registro da nossa listagem atual
            setRows(oldRows => { //oldRows é o nosso state atual
              return [
                ...oldRows.filter(oldRow => oldRow.id !== id),
                /*
                no filter vamos passar uma função para filtrar um registro para nós.
                Aqui estamos retornando um novo state com todas as linhas do state anterior, mas vamos retornar todas as linhas que o id é diferente do id que estamos apagando 
                */
              ];
            });
            alert('User has been removed successfuly!');
          }
        });
    }
  };


  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PeopleService.getAll(page, search).then((resultado) => {
        setIsLoading(false);
      
        if (resultado instanceof Error) {
          alert(resultado.message);
          return; // Adiciona um retorno explícito em caso de erro
        }
      
        console.log(resultado);
        setTotalCount(resultado.totalCount);
        setRows(resultado.data);
      });
      
    }); //este corpo executa a consulta ao banco de dados

  }, [search, page]);

  return (
    <PageBaseLayout
      tittle='People List'
      toolsBar={
        <ListingTools
          newButtonText='New'
          onPressedNewButton={() => navigate('/people/details/new')}
          showSearchInput
          onChangeSearchText={(text) => setSearchParams({ search: text, page: '1' }, { replace: true })}
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
                <TableCell>
                  <IconButton size='small' onClick={() => navigate(`/people/details/${row.id}`)}>
                    <DriveFileRenameOutlineTwoToneIcon/>
                  </IconButton>
                  <IconButton size='small' onClick={() => deleteHandle(row.id, row.fullName)}>
                    <DeleteTwoToneIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.SEARCH_INPUT}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}><LinearProgress variant='indeterminate'/></TableCell>
              </TableRow>
            )}
          </TableFooter>
          
        </Table>
      </TableContainer>

      <Stack spacing={2}>
        <Pagination page={page} count={Math.ceil(totalCount / Environment.ROW_LIMIT)} variant="outlined" color="primary"
          onChange={(e, newPage) => setSearchParams({ search, page: newPage.toString() }, { replace: true })}
        />
      </Stack>

    </PageBaseLayout>
  );
};
