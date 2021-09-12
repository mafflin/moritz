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

      dispatch('client/raiseError', message);
      dispatch('client/finishFetching');

      if (status === 404) {
        dispatch('router/changeRoute', { name: 'NotFound' });
      }

      return Promise.reject(error);
    },
  );

  return instance;
};
