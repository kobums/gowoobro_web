import api from '../lib/axios';

const ENDPOINT = '/upload';

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('upload', file);
  formData.append('name', 'upload');
  const response = await api.post<{ filename: string; original: string }>(`${ENDPOINT}/index`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};