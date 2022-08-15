import axios from "axios";
import { BASE_URL } from "../configs";

const URL = BASE_URL + "/commande";

export const addCommande = (data) => {
    return axios.post(`${URL}`, data);
};

export const getAllCommandes = () => {
    return axios.get(`${URL}`);
};

export const getCommande = (id) => {
    return axios.get(`${URL}/${id}`);
};

export const updateCommande = (id, data) => {
    return axios.put(`${URL}/${id}`, data);
};

export const deleteCommande = (id, idProduit, qte) => {
    return axios.delete(`${URL}/${id}/${idProduit}/${qte}`);
};
