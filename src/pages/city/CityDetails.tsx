import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageBaseLayout } from '../../shared/layouts';
import { DetailTools } from '../../shared/components';
import { CityService } from '../../shared/services/api/city/CityService';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { VTextField, VForm, IVFormErrors } from '../../shared/forms';
import { useVForm } from '../../shared/forms';
import * as yup from 'yup';


interface IFormData {
  name: string
}

const schemaFormValidator: yup.Schema<IFormData> = yup.object().shape({
  name: yup.string().required('The Field "Name" must be required').min(3, 'Field must have at least 3 characters')
});

export const CityDetails: React.FC = () => {
  const { formRef, save, saveAndExit, isSaveAndExit } = useVForm();

  const navigate = useNavigate(); 
  const {id = 'new'} = useParams<'id'>();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ name, setName ] = useState('');

  useEffect(() => {

    if(id !== 'new') {
      setIsLoading(true);

      CityService.getById(Number(id)).then((resultado) => {

        setIsLoading(false);
        if(resultado instanceof Error) {
          alert(resultado.message);
          navigate('/city');

        } else {
          setName(resultado.name);
          console.log(resultado);

          formRef.current?.setData(resultado);
        }
      });
    }
  }, [id]);


  const saveHandle = (data: IFormData) => {
    console.log(data);

    schemaFormValidator.validate(data, { abortEarly: false })
      .then((validatedData) => {
        
        setIsLoading(true);

        if(id === 'new'){
    
          CityService.create(validatedData)
            .then((resultado) => {
              setIsLoading(true);
    
              if(resultado instanceof Error){
                alert(resultado.message);
              } else{
                if(isSaveAndExit()){
    
                  navigate('/city');
    
                }else{
                  navigate(`/city/details/${resultado}`);
                }
              }
            });
    
        } else{
    
          CityService.updateById({id: Number(id), ...validatedData}, Number(id))
            .then((resultado) => {
              setIsLoading(true);
              
              if(resultado instanceof Error){
                alert(resultado.message);
    
              } else {
                if(isSaveAndExit()){
                  navigate('/city');
                }
              }
            });
        }
      })
      .catch((e: yup.ValidationError) => {
        const validationErros:  IVFormErrors = {};
        
        e.inner.forEach(error => {
          if(!error.path) return;

          validationErros[error.path] = error.message;
        });

        console.log(validationErros);
        formRef.current?.setErrors(validationErros);
      });


  };

  const deleteHandle = (id: number, fullName: string) => {
    if(confirm(`Do you really wants to delete user "${fullName}"?`)){
      CityService.deleteById(id)
        .then(resultado => {
          if(resultado instanceof Error) {
            alert(resultado.message);

          } else{
            alert('User has been removed successfuly!');
            navigate('/city');
          }
        });
    }
  };


  return(
    <PageBaseLayout tittle={id === 'new' ? 'New City' : name}
      toolsBar={
        <DetailTools 
          // showNewButton = {id !== 'new'}
          // newButtonText='New'
          showDeleteButton = {id !== 'new'}
          showSaveAndExitButton

          whenNewIsPressed={() => navigate('/city/details/new')}
          whenDeleteIsPressed={() => deleteHandle(Number(id), name) }
          whenBackIsPressed={() => navigate('/city')}
          whenSaveIsPressed={ save }
          whenSaveAndExitIsPressed={ saveAndExit }
        />
      }
    >

      {isLoading && (
        <LinearProgress variant='indeterminate'/>
      )}

      <VForm ref={formRef} onSubmit={saveHandle} placeholder={undefined}> 
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
              <Typography variant='h5'>City Information</Typography>
            </Grid>

            <Grid container item direction="row">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField label='Name' name='name' fullWidth disabled={isLoading}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
            </Grid>

          </Grid>
        
        </Box>
      </VForm>

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

