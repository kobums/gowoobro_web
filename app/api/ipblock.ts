import api from '../lib/axios';
import { Ipblock, ListResponse, SingleResponse, CreateResponse, PagingParams } from '../types/models';

const ENDPOINT = '/ipblock';

export const getIpblocks = async (params?: PagingParams & { address?: string; orderby?: string }) => {
  const response = await api.get<ListResponse<Ipblock>>(ENDPOINT, { params });
  return response.data;
};

export const getIpblock = async (id: number) => {
  const response = await api.get<SingleResponse<Ipblock>>(`${ENDPOINT}/${id}`);
  return response.data;
};

export const createIpblock = async (data: Ipblock) => {
  const response = await api.post<CreateResponse>(ENDPOINT, data);
  return response.data;
};

export const updateIpblock = async (data: Ipblock) => {
  const response = await api.put(ENDPOINT, data);
  return response.data;
};

export const deleteIpblock = async (id: number) => {
  const response = await api.delete(ENDPOINT, { data: { id } });
  return response.data;
};

export const countIpblocks = async (params?: { address?: string }) => {
  // The backend uses POST for count
  const response = await api.post<{ total: number }>(`${ENDPOINT}/count`, null, { params });
  return response.data;
};
