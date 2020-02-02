import axios from 'axios';

export default ({ dispatch, getters }, client = axios) => {
  const userId = getters['users/selectedId'];
  const instance = client.create({
    headers: {
      currentUserId: userId,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      dispatch('client/resetErrors');
      dispatch('client/startFetching');
      return config;
    },
    error => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => {
      dispatch('client/finishFetching');
      return response;
    },
    (error) => {
      dispatch('client/raiseError', error.message);
      dispatch('client/finishFetching');

      if (error.response.status === 404) {
        dispatch('router/changeRoute', { name: 'NotFound' });
      }

      return Promise.reject(error);
    },
  );

  return instance;
};
