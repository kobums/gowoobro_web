import api from '../lib/axios';
import { Project, ListResponse, SingleResponse, CreateResponse, PagingParams } from '../types/models';

const ENDPOINT = '/projects';

export const getProjects = async (params?: PagingParams & { address?: string; orderby?: string }) => {
  const response = await api.get<ListResponse<Project>>(ENDPOINT, { params });
  return response.data;
};

export const getProject = async (id: number) => {
  const response = await api.get<SingleResponse<Project>>(`${ENDPOINT}/${id}`);
  return response.data;
};

export const createProject = async (data: Project) => {
  const response = await api.post<CreateResponse>(ENDPOINT, data);
  return response.data;
};

export const updateProject = async (data: Project) => {
  const response = await api.put(ENDPOINT, data);
  return response.data;
};

export const deleteProject = async (id: number) => {
  const response = await api.delete(ENDPOINT, { data: { id } });
  return response.data;
};

export const countProjects = async (params?: { address?: string }) => {
// The backend uses POST for count
  const response = await api.post<{ total: number }>(`${ENDPOINT}/count`, null, { params });
  return response.data;
};
