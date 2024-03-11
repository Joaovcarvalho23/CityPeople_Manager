import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageBaseLayout } from '../../shared/layouts';
import { DetailTools } from '../../shared/components';

// type Test = 'id' | 'name' | 'description'

// const testing: Test = 'id';
// console.log(testing);

export const PeopleDetails: React.FC = () => {
  const navigate = useNavigate(); 
  const {id = 'new'} = useParams<'id'>();
  
  const handleSave = () => {
    console.log('Save');
  };

  const handleDelete = () => {
    console.log('Delete');
  };

  return(
    <PageBaseLayout tittle='User Details'
      toolsBar={
        <DetailTools 
          showNewButton = {id !== 'new'}
          newButtonText='New'
          showDeleteButton = {id !== 'new'}
          showSaveAndExitButton

          whenSaveIsPressed={ handleSave }
          whenSaveAndExitIsPressed={ handleSave }
          whenDeleteIsPressed={ handleDelete }
          whenBackIsPressed={() => navigate('/people')}
          whenNewIsPressed={() => navigate('/people/details/new')}
        />
      }
    >

      <p>People Details {id}</p>
    </PageBaseLayout>
  );
};

