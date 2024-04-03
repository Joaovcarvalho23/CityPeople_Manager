import { Environment } from '../../../environment';
import { Api } from '../config_axios';


export interface ICityListing {
    id: number;
    name: string;
}

export interface ICityDetails {
  id: number;
  name: string;
} 

type TCityTotalCount = {
    data: ICityListing[];
    totalCount: number;
}


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


const getAll = async (page = 1, filter = ''): Promise<TCityTotalCount | Error> => {
  try {
    const { data, headers } = await Api.get(`/city?_page=${page}&_limit=${Environment.ROW_LIMIT}`);

    const filteredData = data.filter((citySelected: ICityListing) => {
      return citySelected.name.toLowerCase().includes(filter.toLowerCase());
    });

    const totalCount = Number(headers['x-total-count']);

    return {
      data: filteredData,
      totalCount: totalCount
    };

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'error when listing records');
  }
};


const create = async (information: Omit<ICityDetails, 'id'>): Promise<number | Error> => {

  try {
    const { data } = await Api.post<ICityDetails>('/city', information);

    if(data)
      return data.id;

    return new Error('error when creating register');

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || 'error when creating register');
  }
};


const deleteById = async (id: number): Promise<void | Error> => {
  try {

    await Api.delete(`/city/${id}`);
            
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message  || 'error when delete city by id');
  }
};


const updateById = async (information: ICityDetails, id: number): Promise<void | Error> => {
  try {

    await Api.put(`/city/${id}`, information);
        
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message  || 'error when update city by id');
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