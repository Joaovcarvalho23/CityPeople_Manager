import axios from 'axios';
import { errorInterceptor, successInterceptor } from './interceptors';
import { Environment } from '../../../environment';

console.log(`Base URL: ${Environment.URL_BASE}`)

const Api = axios.create({
  baseURL: Environment.URL_BASE
});

Api.interceptors.response.use(
  (response) => successInterceptor(response),
  (error) => errorInterceptor(error)
);
export { Api };