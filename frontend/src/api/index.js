// @flow
import sync from "../utils/client";
import store from "../store";

const client = () => sync(store);

const API_URL = "/api/v1";
const API_FORMAT = "json";

function buildEndpoint(...params) {
  const url = [API_URL, ...params].filter(e => !!e).join("/");
  return [url, API_FORMAT].join(".");
}

async function handleRequest(method, url, params) {
  try {
    const response = await method(url, params);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

export const fetchEntities = (type, params = {}) =>
  handleRequest(client().get, buildEndpoint(type), { params });

export const fetchEntity = (type, id) =>
  handleRequest(client().get, buildEndpoint(type, id));

export const createEntity = (type, params = {}) =>
  handleRequest(client().post, buildEndpoint(type), params);

export const updateEntity = (type, id, params = {}) =>
  handleRequest(client().patch, buildEndpoint(type, id), params);

export const deleteEntity = (type, id) =>
  handleRequest(client().delete, buildEndpoint(type, id));
