import { Environment } from '../../../environment';
import { Api } from '../config_axios';


interface IPeopleListing {
    id: number;
    fullName: string;
    cityId: number; //representa o relacionamento entre cidade e pessoa
    email: string
} //pessoas que vão ser retornadas para a listagem de pessoas

interface IPeopleDetails {
    id: number;
    fullName: string;
    cityId: number;
    email: string
} //detalhes da pessoa na nossa tela de detalhe sobre ela

type TTotalCountPeople = {
    data: IPeopleListing[];
    totalCount: number;
}


/*------------------------------------------------------- método que consulta por um Id específico passado como parâmetro------------------------------------------------------*/


const getById = async (id: number): Promise<IPeopleDetails | Error> => {
  try {
    const { data } = await Api.get(`/people/${id}`);

    if(data)
      return data;

    return new Error('error when get by id');

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message  || 'error when get by id');
  }
};


/*------------------------------------------------------- método que consulta a lista que retorna todos os usuários------------------------------------------------------------------*/


const getAll = async (page = 1, filter = ''): Promise<TTotalCountPeople | Error> => {

  try {
    const relativeURL = `/people?_page=${page}&_limit=${Environment.ROW_LIMIT}&fullName_like=${filter}`;//aqui é feita a paginação dos dados
    const { data, headers } = await Api.get(relativeURL); //aqui é feito a consulta em si | lista de pessoas cadastradas no banco de dados
    /*
    O Slice adiciona os atributos _start e _end, e um header 'x-total-count' é incluído na resposta. Ou seja, toda resposta paginada,
    uma listagem, ela trás consigo um 'total-count', que é a quantidade total de registros no banco de dados
    */

    if(data){
      return{
        data, totalCount: Number(headers['x-total-count'] || Environment.ROW_LIMIT) // o totalCount é do tipo number, mas o headers é do tipo String. Dessa forma, temos que converter o headers para que ele seja um number
        // o "|| Environment.ROW_LIMIT" serve para que, caso o Number seja 'undefined', ele não retorne um NaN
      };
    }

    return new Error('error when listing records');

  } catch (error) {

    console.error(error);
    return new Error((error as {message: string}).message  || 'error when listing records');//estamos dizendo que esse error é um objeto que tem o atributo 'mensagem'. Se o backend não retornar uma mensagem de erro, ele retorna o 'error when listing records'
  }
};


/*------------------------------------------------------- método de criar um novo usuário ----------------------------------------------------------------------------*/


const create = async (information: Omit<IPeopleDetails, 'id'>): Promise<number | Error> => { //O Omit serve para que o atributo 'id' não seja exibido. Não faz sentido exibir o Id enquanto criamos
  /*
    será number ou error pois normalmente quando cadastramos um novo registro no banco de dados, a resposta vai ser sempre o Id do registro que foi criado.
*/
  try {
    const { data } = await Api.post<IPeopleDetails>('/people', information); //o json-server sempre vai retornar uma pessoa inteira. Quando passamos o <IPeopleDetails>, nós conseguimos dizer qual é o tipo do dado que ele está retornando no post.

    if(data)
      return data.id; //a resposta que vamos dar para quem chamou o create será apenas o Id. Não precisamos devolver todos os dados para ele.

    return new Error('error when creating user');

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'error when creating user');
  }
};


/*------------------------------------------------------- método de excluir um usuário pelo Id ----------------------------------------------------------------------------*/


const deleteById = async (id: number): Promise<void | Error> => {
  try {

    await Api.delete(`/people/${id}`);
            
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message  || 'error when delete user by id');
  }
};


/*------------------------------------------------------- método de atualizar um  usuário pelo Id ----------------------------------------------------------------------------*/


const updateById = async (information: IPeopleDetails, id: number): Promise<void | Error> => {
  try {

    await Api.put(`/people/${id}`, information);
        
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message  || 'error when update user by id');
  }
};


/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export const PeopleService = {
  getById,
  getAll,
  create,
  deleteById,
  updateById
};