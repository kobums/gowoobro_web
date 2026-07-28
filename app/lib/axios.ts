import axios, { AxiosError } from 'axios';

/**
 * 차단된 IP 는 백엔드가 403 + reason 으로 막는다. 그 사유를 꺼내 방문자에게
 * 보여주기 위한 헬퍼.
 *
 * 차단이 아니거나 사유가 비어 있으면 null 을 돌려준다 — 호출부는 그때 기존
 * 일반 오류 문구를 쓰면 된다.
 */
export const getBlockedReason = (error: unknown): string | null => {
  const response = (error as AxiosError<{ reason?: string }>)?.response;
  if (response?.status !== 403) return null;

  const reason = response.data?.reason?.trim();
  return reason ? reason : null;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://gowoobro.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
