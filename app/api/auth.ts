import api, { ADMIN_TOKEN_KEY } from '../lib/axios';

// 관리자 토큰은 sessionStorage 에 둔다. 탭을 닫으면 사라진다.
const TOKEN_KEY = ADMIN_TOKEN_KEY; // secret-scan: ok 키 이름 별칭이지 자격증명이 아니다

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(TOKEN_KEY);
};

export const clearToken = () => {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(TOKEN_KEY);
};

/**
 * 비밀번호를 서버로 보내 관리자 토큰을 받는다.
 *
 * 예전에는 브라우저가 NEXT_PUBLIC_ADMIN_PASSWORD 와 직접 비교했다. 그 방식은
 * 화면만 가릴 뿐 /api 는 URL 만 알면 누구나 호출할 수 있었고, 비밀번호도 번들에
 * 노출됐다. 이제 판정은 서버가 하고 브라우저는 토큰만 들고 있는다.
 */
export const login = async (password: string): Promise<boolean> => {
  try {
    const response = await api.post<{ code: string; token: string }>('/login', { password });
    const token = response.data?.token;
    if (!token) return false;

    sessionStorage.setItem(TOKEN_KEY, token);
    return true;
  } catch {
    return false;
  }
};
