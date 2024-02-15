import axios from 'axios';
import { errorInterceptor, successInterceptor } from './interceptors';

const Api = axios.create({
  baseURL: 'http://localhost:3333'
});

Api.interceptors.response.use(
  (response) => successInterceptor(response),
  (response) => errorInterceptor(response)
);
export { Api };