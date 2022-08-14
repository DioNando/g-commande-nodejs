import axios from "axios";
import { BASE_URL } from "../configs";

const URL = BASE_URL + "/produit";

export const addProduit = (data) => {
    return axios.post(`${URL}`, data);
};

export const getAllProduits = () => {
    return axios.get(`${URL}`);
};

export const getProduit = (id) => {
    return axios.get(`${URL}/${id}`);
};

export const updateProduit = (id, data) => {
    return axios.put(`${URL}/${id}`, data);
};

export const deleteProduit = (id) => {
    return axios.delete(`${URL}/${id}`);
};
