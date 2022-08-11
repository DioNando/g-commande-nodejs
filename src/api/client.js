import axios from "axios";
import { BASE_URL } from "../configs";

const URL = BASE_URL + "/note";

export const addClient = (data) => {
    return axios.post(`${URL}`, data);
};

export const getAllClients = () => {
    return axios.get(`${URL}`);
};

export const getClient = (id) => {
    return axios.get(`${URL}/${id}`);
};

export const updateClient = (id, data) => {
    return axios.put(`${URL}/${id}`, data);
};

export const deleteClient = (id) => {
    return axios.delete(`${URL}/${id}`);
};