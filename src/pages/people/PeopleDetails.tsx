import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageBaseLayout } from '../../shared/layouts';
import { DetailTools } from '../../shared/components';
import { PeopleService } from '../../shared/services/api/people/PeopleService';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { Form } from '@unform/web';
import { VTextField } from '../../shared/forms';
import { FormHandles } from '@unform/core';

interface IFormData {
  fullName: string,
  email: string,
  cityId: number
}

export const PeopleDetails: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate(); 
  const {id = 'new'} = useParams<'id'>();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ name, setName ] = useState('');

  useEffect(() => {

    if(id !== 'new') {
      setIsLoading(true);

      PeopleService.getById(Number(id)).then((resultdo) => {

        setIsLoading(false);
        if(resultdo instanceof Error) {
          alert(resultdo.message);
          navigate('/people');

        } else {
          setName(resultdo.fullName);
          console.log(resultdo);

          formRef.current?.setData(resultdo);
        }
      });
    }
  }, [id]);


  const saveHandle = (data: IFormData) => {
    console.log(data);

    setIsLoading(true);

    if(id === 'new'){

      PeopleService.create(data)
        .then((resultado) => {
          setIsLoading(true);

          if(resultado instanceof Error){
            alert(resultado.message);
          } else{
            navigate(`/people/details/${resultado}`);
          }
        });

    } else{

      PeopleService.updateById({id: Number(id), ...data}, Number(id))
        .then((resultado) => {
          setIsLoading(true);
          
          if(resultado instanceof Error){
            alert(resultado.message);
          }
        });
    }
  };

  const deleteHandle = (id: number, fullName: string) => {
    if(confirm(`Do you really wants to delete user "${fullName}"?`)){
      PeopleService.deleteById(id)
        .then(resultado => {
          if(resultado instanceof Error) {
            alert(resultado.message);

          } else{
            alert('User has been removed successfuly!');
            navigate('/people');
          }
        });
    }
  };


  return(
    <PageBaseLayout tittle={id === 'new' ? 'New User' : name}
      toolsBar={
        <DetailTools 
          showNewButton = {id !== 'new'}
          newButtonText='New'
          showDeleteButton = {id !== 'new'}
          showSaveAndExitButton

          whenNewIsPressed={() => navigate('/people/details/new')}
          whenDeleteIsPressed={() => deleteHandle(Number(id), name) }
          whenBackIsPressed={() => navigate('/people')}
          whenSaveIsPressed={ () => formRef.current?.submitForm() } //esse submitForm permite que a gente consiga fazer o submit do formulário que está fora do nosso Form
          whenSaveAndExitIsPressed={ () => formRef.current?.submitForm() }
        />
      }
    >

      {isLoading && (
        <LinearProgress variant='indeterminate'/>
      )}

      {/* passamos o saveHandle dentro do onSubmit, pois quando alteramos o onSubmit do formulário, queremos que os dados que o unform vai estar entregando para nós, vão para o saveHandle.
      Dessa forma, podemos tratar toda a parte de salvar no banco de dados e fazer outras operações */}
      {/* nos permite pegar a referênca do nosso componente de formulário e deixar ela armazenada dentro desse formRef. Com isso, conseguimos dar um submit manual
      do formulário através do nosso componente da listing_tools */}

      <Form ref={formRef} onSubmit={saveHandle} placeholder={undefined}>
        {/* <Box margin={1} display="flex" flexDirection="column" component={Paper}> */}
        <Box margin={1} display="flex" flexDirection="column">
          
          <Grid container direction="column" spacing={1}>
            {/* <Grid container direction="column" padding={3}> */}

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate'/>
              </Grid>
            )}

            <Grid item>
              <Typography variant='h5'>User Informations</Typography>
            </Grid>

            <Grid container item direction="row">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField label='Full Name' name='fullName' fullWidth disabled={isLoading}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
            </Grid>
            
            <Grid container item direction="row">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField label='Email' name='email' fullWidth disabled={isLoading}/>
              </Grid>
            </Grid>
            
            <Grid container item direction="row">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField label='City' name='cityId' fullWidth disabled={isLoading}/>
              </Grid>
            </Grid>

          </Grid>
        
        </Box>
      </Form>

      {/* <Form ref={formRef} onSubmit={saveHandle} placeholder={undefined}>

        <VTextField name='fullName'/>
        <VTextField name='email'/>
        <VTextField name='cityId'/>

        {[1, 2].map((_, index) => (
          <>
            <VTextField name={`address[${index}].street`}/>
            <VTextField name={`address[${index}].number`}/>
            <VTextField name={`address[${index}].state`}/>
            <VTextField name={`address[${index}].city`}/>
            <VTextField name={`address[${index}].country`}/>
          
          </>
        ))}

        <button type='submit'>Submit</button>
      </Form> */}

    </PageBaseLayout>
  );
};

