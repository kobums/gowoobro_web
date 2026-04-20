import api from '../lib/axios';
import { Answers, ListResponse, SingleResponse, CreateResponse, PagingParams } from '../types/models';

const ENDPOINT = '/answers';

export const getAnswers = async (params?: PagingParams & { address?: string; question?: string; orderby?: string }) => {
  const response = await api.get<ListResponse<Answers>>(ENDPOINT, { params });
  return response.data;
};

export const getAnswer = async (id: number) => {
  const response = await api.get<SingleResponse<Answers>>(`${ENDPOINT}/${id}`);
  return response.data;
};

export const createAnswer = async (data: Answers) => {
  const response = await api.post<CreateResponse>(ENDPOINT, data);
  return response.data;
};

export const updateAnswer = async (data: Answers) => {
  const response = await api.put(ENDPOINT, data);
  return response.data;
};

export const deleteAnswer = async (id: number) => {
  const response = await api.delete(ENDPOINT, { data: { id } });
  return response.data;
};

export const countAnswers = async (params?: { address?: string; question?: string }) => {
  const response = await api.post<{ total: number }>(`${ENDPOINT}/count`, null, { params });
  return response.data;
};
