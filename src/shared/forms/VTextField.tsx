import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';
import React, { useEffect, useState } from 'react';

/*
É só uma forma que a gente consiga diferenciar o que é componente personalizado do Unform dos componentes normais.
Esse componente vai encapsular o componente do TextField em uma camada de Unform, permitindo que a gente consiga trabalhar com formulário.
*/

type TVTextFieldProps = TextFieldProps & { //esse type vai precisar ter outras propriedades além do name que o useField() está pedindo. Também estamos atribuindo todas as propriedades do TextField do Material UI para o nosso type.
  name: string;
}  


export const VTextField: React.FC<TVTextFieldProps> = ({ name, ...rest }) => { //o ...rest serve para dizer que o resto das propriedades do TextFieldProps vem parar aqui dentro.

  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
  /*
  O fieldName serve para identificar o componente VTextField de forma única dentro do contexto do unForm.
  O registerField serve para integrar esse campo conforme, para que a gente consiga resgatar os dados dentro desse campo, de forma bem performática.
  O defaultValue valor padrão do TextField caso tenha sido previamente informado.
  O error vai ser quando a gente dá um submit no formulário, daí ele pega esse dado e vai realizar algum tipo de validação nele. Caso tenha algo errado, ele vai repassar um erro no textfield
  */

  const [ value, setValue ] = useState(defaultValue || '');


  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value, //o getValue vai pegar o valor 'value' que está dentro do useState e vai jogar lá no nosso console.log
      setValue: (_, newValue) => setValue(newValue), //altera o valor do state local. Vai setar no nosso state um novo valor que o setValue consegue receber.
    });
  }, [registerField, fieldName, value]);

  return(
    <TextField 
      {...rest}

      error={!!error} //o primeiro '!' vai dizer que undefined é true, e o segundo '!' vai dizer que é false. Ou seja, se for undefined não temos error
      helperText={error}
      
      defaultValue={defaultValue}
      onKeyDown={() => error ? clearError() : undefined} //se não temos erro nesse input, não tem pra que executar o clearError().

      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
};