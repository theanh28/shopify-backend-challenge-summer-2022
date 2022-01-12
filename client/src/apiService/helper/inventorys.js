import Axios from '../Axios';
import { API_URL_LIST } from '../constants';

export const apiGetInventorys = async (query) => {
  try {
    const { data } = await Axios.get(API_URL_LIST.INVENTORYS, {
      params: query,
    });
    return data;
  } catch (err) {
    return { error: 'Request fail' };
  }
};

export const apiGetInventorysCount = async (query) => {
  try {
    const url = `${API_URL_LIST.INVENTORYS}/count`;
    const { data } = await Axios.get(url, {
      params: query,
    });
    return data;
  } catch (err) {
    return { error: 'Request fail' };
  }
};

export const apiGetInventoryById = async (id) => {
  try {
    const url = `${API_URL_LIST.INVENTORYS}/${id}`;
    const { data } = await Axios.get(url);
    return data;
  } catch (err) {
    return { error: 'Request fail' };
  }
};

export const apiDeleteInventoryById = async (id) => {
  try {
    const url = `${API_URL_LIST.INVENTORYS}/${id}`;
    const { data } = await Axios.delete(url);
    return data;
  } catch (err) {
    return { error: 'Request fail' };
  }
};

export const apiPostInventory = async (postData) => {
  try {
    const url = `${API_URL_LIST.INVENTORYS}`;
    const { data } = await Axios.post(url, postData);
    return data;
  } catch (err) {
    return { error: 'Request fail' };
  }
};

export const apiPutInventoryById = async (id, putData) => {
  try {
    const url = `${API_URL_LIST.INVENTORYS}/${id}`;
    const { data } = await Axios.put(url, putData);
    return data;
  } catch (err) {
    return { error: 'Request fail' };
  }
};
