import axios from 'axios';

export default ({ dispatch }, client = axios) => {
  const instance = client.create();

  instance.interceptors.request.use(
    (config) => {
      dispatch('client/resetErrors');
      dispatch('client/startFetching');
      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => {
      dispatch('client/finishFetching');
      return response;
    },
    (error) => {
      const { data, status } = error.response || {};
      const message = data
        ? Object.keys(data).map((key) => `${key}: ${data[key]}`).join('\n')
        : error.message;

      dispatch('client/finishFetching');

      switch (status) {
        case 401:
          window.location.assign('/');
          break;
        case 404:
          window.location.assign('/404');
          break;
        default:
          dispatch('client/raiseError', message);
          break;
      }

      return Promise.reject(error);
    },
  );

  return instance;
};
