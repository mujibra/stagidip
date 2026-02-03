// const { default: axios } = require("axios");
import axios from 'axios';

const api = process.env.REACT_APP_API_URL_MOCKAPI;

const getAll = () => {
  return axios.get(`${api}/machine`);
};

const get = (id) => {
  return axios.get(`${api}/machine/${id}`);
};

const create = (data) => {
  return axios.post(`${api}/machine`, data);
};

const update = (id, data) => {
  return axios.put(`${api}/machine/${id}`, data);
};

const remove = (id) => {
  return axios.delete(`${api}/machine/${id}`);
};

const removeAll = () => {
  return axios.delete(`${api}/machine`);
};

const findByTitle = (title) => {
  return axios.get(`${api}/machine?title=${title}`);
};

const serviceMachine = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default serviceMachine;
