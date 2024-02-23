import { useCallback, useRef } from 'react';

export const UseDebounce = (delay = 300, notDelayInFirstTime = true) => {
  const debouncing = useRef<NodeJS.Timeout>();
  const isFirstTime = useRef(notDelayInFirstTime);

  const debounce = useCallback((func: () => void) => { //elarecebe uma arrow function como parâmetro de entrada, que retorna void. Essa função é a que o setTimeout vai ter que executar

    //o useRef vai começar como true. Porém quando executamos uma primeira vez a função, vamos querer que ele fique falso. Executa uma primeira vez e depois não executa mais, porque daí passa a funcionar a ideia de timeOut
    if (isFirstTime.current){ //se for true, entra na condição
      isFirstTime.current = false;
      func();
      
    } else{

      if(debouncing.current)
        clearTimeout(debouncing.current); //se já existir um timeout cadastrado, nós limpamos esse debouncing e criamos um novo logo em seguida, que vai esperar mais 3 milisegundos
    }
    
    debouncing.current = setTimeout(() => func(), delay);

  }, [delay]); //array de dependencia

  return {debounce};
};