import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageBaseLayout } from '../../shared/layouts';
import { DetailTools } from '../../shared/components';
import { PeopleService } from '../../shared/services/api/people/PeopleService';
import { LinearProgress } from '@mui/material';
import { Form } from '@unform/web';
import { VTextField } from '../../shared/forms';

// type Test = 'id' | 'name' | 'description'

// const testing: Test = 'id';
// console.log(testing);

export const PeopleDetails: React.FC = () => {
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
        }
      });
    }
  }, [id]);


  const saveHandle = () => {
    console.log('Save');
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
          whenSaveIsPressed={ saveHandle }
          whenSaveAndExitIsPressed={ saveHandle }
        />
      }
    >
      {isLoading && (
        <LinearProgress variant='indeterminate'/>
      )}

      <Form onSubmit={(data) => console.log(data)} placeholder={undefined}>
        <VTextField name='fullName' 
          
        />

        <button type='submit'>Submit</button>
      </Form>

    </PageBaseLayout>
  );
};

