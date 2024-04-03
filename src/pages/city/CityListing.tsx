import React, { useEffect, useMemo, useState } from 'react';
import { PageBaseLayout } from '../../shared/layouts';
import { ListingTools } from '../../shared/components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ICityListing, CityService } from '../../shared/services/api/city/CityService';
import { UseDebounce } from '../../shared/hooks';
import { IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { Environment } from '../../shared/environment';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

export const CityListing: React.FC = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = UseDebounce();
  const [ rows, setRows ] = useState<ICityListing[]>([]);
  const [ totalCount, setTotalCount ] = useState(0);
  const navigate = useNavigate();

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get('page') || '1');
  }, [searchParams]);

  const deleteHandle = (id: number, name: string) => {
    if(confirm(`Do you really wants to delete city: "${name}"?`)){
      CityService.deleteById(id)
        .then(resultado => {
          if(resultado instanceof Error) {
            alert(resultado.message);

          } else{
            setRows(oldRows => {
              return [
                ...oldRows.filter(oldRow => oldRow.id !== id),
              ];
            });
            alert('City has been removed successfuly!');
          }
        });
    }
  };


  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CityService.getAll(page, search).then((resultado) => {
        setIsLoading(false);
      
        if (resultado instanceof Error) {
          alert(resultado.message);
          return;
        }
      
        console.log(resultado);
        setTotalCount(resultado.totalCount);
        setRows(resultado.data);
      });
      
    });

  }, [search, page]);

  return (
    <PageBaseLayout
      tittle='City List'
      toolsBar={
        <ListingTools
          newButtonText='New'
          onPressedNewButton={() => navigate('/city/details/new')}
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
              <TableCell><strong>City`s Name</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <IconButton size='small' onClick={() => navigate(`/city/details/${row.id}`)}>
                    <DriveFileRenameOutlineTwoToneIcon/>
                  </IconButton>
                  <IconButton size='small' onClick={() => deleteHandle(row.id, row.name)}>
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
