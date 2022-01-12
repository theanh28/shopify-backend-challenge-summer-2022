import Axios from '../Axios';
import { API_URL_LIST } from '../constants';

export const apiGetWarehouses = async (query) => {
  try {
    const { data } = await Axios.get(API_URL_LIST.WAREHOUSES, {
      params: query,
    });
    return data;
  } catch (err) {
    return { error: 'Request fail' };
  }
};

export const apiGetWarehousesCount = async (query) => {
  try {
    const url = `${API_URL_LIST.WAREHOUSES}/count`;
    const { data } = await Axios.get(url, {
      params: query,
    });
    return data;
  } catch (err) {
    return { error: 'Request fail' };
  }
};

export const apiGetWarehouseById = async (id) => {
  try {
    const url = `${API_URL_LIST.WAREHOUSES}/${id}`;
    const { data } = await Axios.get(url);
    return data;
  } catch (err) {
    return { error: 'Request fail' };
  }
};

export const apiDeleteWarehouseById = async (id) => {
  try {
    const url = `${API_URL_LIST.WAREHOUSES}/${id}`;
    const { data } = await Axios.delete(url);
    return data;
  } catch (err) {
    return { error: 'Request fail' };
  }
};

export const apiPostWarehouse = async (postData) => {
  try {
    const url = `${API_URL_LIST.WAREHOUSES}`;
    const { data } = await Axios.post(url, postData);
    return data;
  } catch (err) {
    return { error: 'Request fail' };
  }
};

export const apiPutWarehouseById = async (id, putData) => {
  try {
    const url = `${API_URL_LIST.WAREHOUSES}/${id}`;
    const { data } = await Axios.put(url, putData);
    return data;
  } catch (err) {
    return { error: 'Request fail' };
  }
};
