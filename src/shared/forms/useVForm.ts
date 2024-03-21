import { FormHandles } from '@unform/core';
import { useCallback, useRef } from 'react';

export const useVForm = () => {
  const formRef = useRef<FormHandles>(null);
  const isSavingAndNew = useRef(false);
  const isSavingAndClose = useRef(false);


  //essas funções serão responsáveis pelo salvamento/execução de salvar formulário
  const saveHandle = useCallback(() => {
    isSavingAndClose.current = false;
    isSavingAndNew.current = false;
    formRef.current?.submitForm();
  }, []);


  const saveAndNewHandle = useCallback(() => {
    isSavingAndClose.current = false;
    isSavingAndNew.current = true;
    formRef.current?.submitForm();
  }, []);


  const saveAndCloseHandle = useCallback(() => {
    isSavingAndClose.current = true;
    isSavingAndNew.current = false;
    formRef.current?.submitForm();
  }, []);


  //essas funções serão responsáveis pelo salvamento/execução de salvar formulário
  const isSaveAndNewHandle = useCallback(() => {
    return isSavingAndNew.current;
  }, []);


  const isSaveAndCloseHandle = useCallback(() => {
    return isSavingAndClose.current;
  }, []);


  return{ formRef, save: saveHandle, saveAndClose: saveAndCloseHandle, saveAndNew: saveAndNewHandle, isSaveAndClose: isSaveAndCloseHandle, isSaveAndNew: isSaveAndNewHandle };

};