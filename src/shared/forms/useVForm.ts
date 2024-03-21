import { FormHandles } from '@unform/core';
import { useCallback, useRef } from 'react';

export const useVForm = () => {
  const formRef = useRef<FormHandles>(null);
  const isSavingAndNew = useRef(false);
  const isSavingAndExit = useRef(false);


  //essas funções serão responsáveis pelo salvamento/execução de salvar formulário
  const saveHandle = useCallback(() => {
    isSavingAndExit.current = false; //não queremos fechar a tela
    isSavingAndNew.current = false; //não queremos navegar para a tela de 'New'
    formRef.current?.submitForm(); //quando nós damos o submitForm, o VForm do PeopleDetails.tsx executa o onSubmit, passando os dados do formulário para o saveHandle do PeopleDetails.tsx
  }, []);


  const saveAndNewHandle = useCallback(() => {
    isSavingAndExit.current = false;
    isSavingAndNew.current = true;
    formRef.current?.submitForm();
  }, []);


  const saveAndExitHandle = useCallback(() => {
    isSavingAndExit.current = true;
    isSavingAndNew.current = false;
    formRef.current?.submitForm();
  }, []);


  //essas funções serão responsáveis pelo salvamento/execução de salvar formulário
  const isSaveAndNewHandle = useCallback(() => {
    return isSavingAndNew.current;
  }, []);


  const isSaveAndExitHandle = useCallback(() => {
    return isSavingAndExit.current;
  }, []);


  return{ formRef, save: saveHandle, saveAndExit: saveAndExitHandle, saveAndNew: saveAndNewHandle, isSaveAndExit: isSaveAndExitHandle, isSaveAndNew: isSaveAndNewHandle };

};