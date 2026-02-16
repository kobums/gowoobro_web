import api from '../lib/axios';
import { Questions, ListResponse, SingleResponse, CreateResponse, PagingParams } from '../types/models';

const ENDPOINT = '/questions';

export const getQuestions = async (params?: PagingParams & { address?: string; question?: string; orderby?: string }) => {
  const response = await api.get<ListResponse<Questions>>(ENDPOINT, { params });
  return response.data;
};

export const getQuestion = async (id: number) => {
  const response = await api.get<SingleResponse<Questions>>(`${ENDPOINT}/${id}`);
  return response.data;
};

export const createQuestion = async (data: Questions) => {
  const response = await api.post<CreateResponse>(ENDPOINT, data);
  return response.data;
};

export const updateQuestion = async (data: Questions) => {
  const response = await api.put(ENDPOINT, data);
  return response.data;
};

export const deleteQuestion = async (id: number) => {
  const response = await api.delete(ENDPOINT, { data: { id } });
  return response.data;
};

export const countQuestions = async (params?: { address?: string; question?: string }) => {
  // The backend uses POST for count according to router.go
  const response = await api.post<{ total: number }>(`${ENDPOINT}/count`, null, { params });
  return response.data;
};
