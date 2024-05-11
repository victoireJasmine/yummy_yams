
import axios, {
    Axios,
    AxiosError,
    AxiosResponse,
    AxiosRequestConfig,
  } from 'axios';
  import { Logger } from '../modules/Logger';
  import { NetworkError } from '../modules/Errors';
import { SessionCookie } from '../modules/session';


  
  const parameters = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 6000,
  };
  const onReqError = () => (err: Error | AxiosError) => {
    Logger.warn('Axios interceptor: request failure', err);
  
    throw err;
  };
  const onRespError = () => (err: Error | AxiosError) => {
    Logger.warn('Axios interceptor: response failure', err);
  
    const message = err.response?.data ?? err.message;
    throw new NetworkError(err, message);
  };
  const onReqSuccess = () => (config: AxiosRequestConfig) => {
    Logger.info('Axios interceptor: request configuration', config);
    const token = SessionCookie.get();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  };
  const onRespSuccess = () => (response: AxiosResponse) => {
    Logger.info('Axios interceptor: response successful', response);
    if (!response?.data) {
      return response;
    }
  
    return response;
  };
  
  const middleware = (instance: Axios): Axios => {
    instance.interceptors.request.use(onReqSuccess(), onReqError());
    instance.interceptors.response.use(onRespSuccess(), onRespError());
    return instance;
  };
  
  const apisFactory = () => ({
    yummy: middleware(
      axios.create({
        baseURL: import.meta.env.VITE_YUMMY_API,
        ...parameters,
        timeout: 60000,
      })
    ),
  
  });
  
  const apis: ReturnType<typeof apisFactory> = apisFactory();
  
  
  
  export { axios, apis };
  