import axios from 'axios';
import { errorInterceptor, successInterceptor } from './interceptors';
import { Environment } from '../../../environment';

const Api = axios.create({
  baseURL: Environment.URL_BASE
});

Api.interceptors.response.use(
  (response) => successInterceptor(response),
  (error) => errorInterceptor(error)
);
export { Api };