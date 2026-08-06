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

/** 관리자 토큰이 인증 만료로 거부됐는지. 게이트를 다시 띄울지 판단에 쓴다. */
export const isUnauthorized = (error: unknown): boolean =>
  (error as AxiosError)?.response?.status === 401;

// 토큰 키는 여기에 둔다. api/auth.ts 가 이 파일을 import 하므로, 반대로
// import 하면 순환 참조가 된다.
export const ADMIN_TOKEN_KEY = 'admin_token'; // secret-scan: ok sessionStorage 키 이름이지 자격증명이 아니다

// SSR 은 같은 도커 네트워크의 백엔드로 직행한다(API_URL). 공인 도메인을 거치면
// 호스트를 한 바퀴 돌아 느리고, nginx 장애에 SSR 까지 같이 죽는다. 브라우저에서는
// 컨테이너 이름을 해석할 수 없으므로 공개 URL(NEXT_PUBLIC_API_URL)을 쓴다.
const baseURL =
  typeof window === 'undefined'
    ? process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'https://gowoobro.com/api'
    : process.env.NEXT_PUBLIC_API_URL || 'https://gowoobro.com/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 관리자 토큰이 있으면 모든 요청에 실어 보낸다. 공개 요청에 섞여 나가도
// 서버가 무시하므로 경로를 가리지 않는다.
api.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem(ADMIN_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// 토큰이 만료되거나 무효면 들고 있어봐야 소용없다. 지워서 다음 렌더에
// 로그인 화면이 다시 뜨게 한다.
api.interceptors.response.use(
  response => response,
  error => {
    if (isUnauthorized(error) && typeof window !== 'undefined') {
      sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    }
    return Promise.reject(error);
  },
);

export default api;
