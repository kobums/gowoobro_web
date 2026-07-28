import api from '../lib/axios';
import { Ipblock, ListResponse, SingleResponse, PagingParams } from '../types/models';

// ipblock 은 접근이 차단된 IP 목록이다. 차단 IP 는 DB 에 직접 넣고, 백엔드는 조회
// 엔드포인트만 노출한다 — 그래서 create/update/delete 함수는 없다.
const ENDPOINT = '/ipblock';

export const getIpblocks = async (params?: PagingParams & { address?: string; orderby?: string }) => {
  const response = await api.get<ListResponse<Ipblock>>(ENDPOINT, { params });
  return response.data;
};

export const getIpblock = async (id: number) => {
  const response = await api.get<SingleResponse<Ipblock>>(`${ENDPOINT}/${id}`);
  return response.data;
};

export const countIpblocks = async (params?: { address?: string }) => {
  // The backend uses POST for count
  const response = await api.post<{ total: number }>(`${ENDPOINT}/count`, null, { params });
  return response.data;
};
