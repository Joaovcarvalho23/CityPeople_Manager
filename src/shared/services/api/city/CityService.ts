import { Environment } from '../../../environment';
import { Api } from '../config_axios';


export interface ICityListing {
    id: number;
    fullName: string;
    cityId: number; //representa o relacionamento entre cidade e pessoa
    email: string
} //pessoas que vão ser retornadas para a listagem de pessoas

export interface ICityDetails {
    id: number;
    fullName: string;
    cityId: number;
    email: string
} //detalhes da pessoa na nossa tela de detalhe sobre ela

type TCityTotalCount = {
    data: ICityListing[];
    totalCount: number;
}


/*------------------------------------------------------- método que consulta por um Id específico passado como parâmetro------------------------------------------------------*/


const getById = async (id: number): Promise<ICityDetails | Error> => {
  try {
    const { data } = await Api.get(`/city/${id}`);

    if(data)
      return data;

    return new Error('error when get by id');

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message  || 'error when get by id');
  }
};


/*------------------------------------------------------- método que consulta a lista que retorna todos os usuários------------------------------------------------------------------*/


const getAll = async (page = 1, filter = ''): Promise<TCityTotalCount | Error> => {
  try {
    const { data, headers } = await Api.get(`/city?_page=${page}&_limit=${Environment.ROW_LIMIT}`);

    const filteredData = data.filter((person: ICityListing) => {
      return person.fullName.toLowerCase().includes(filter.toLowerCase());
    }); //filtrando para o campo de busca

    const totalCount = Number(headers['x-total-count']);
    // const totalCount = Number(headers['x-total-count'] || Environment.ROW_LIMIT);

    return {
      data: filteredData, //retorna a busca filtrada
      totalCount: totalCount //retorna o total de elementos no array
    };

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'error when listing records');
  }
};


/*------------------------------------------------------- método de criar um novo usuário ----------------------------------------------------------------------------*/


const create = async (information: Omit<ICityDetails, 'id'>): Promise<number | Error> => { //O Omit serve para que o atributo 'id' não seja exibido. Não faz sentido exibir o Id enquanto criamos
  /*
    será number ou error pois normalmente quando cadastramos um novo registro no banco de dados, a resposta vai ser sempre o Id do registro que foi criado.
*/
  try {
    const { data } = await Api.post<ICityDetails>('/city', information); //o json-server sempre vai retornar uma pessoa inteira. Quando passamos o <IPeopleDetails>, nós conseguimos dizer qual é o tipo do dado que ele está retornando no post.

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

    await Api.delete(`/city/${id}`);
            
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message  || 'error when delete user by id');
  }
};


/*------------------------------------------------------- método de atualizar um  usuário pelo Id ----------------------------------------------------------------------------*/


const updateById = async (information: ICityDetails, id: number): Promise<void | Error> => {
  try {

    await Api.put(`/city/${id}`, information);
        
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message  || 'error when update user by id');
  }
};


/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export const CityService = {
  getById,
  getAll,
  create,
  deleteById,
  updateById
};