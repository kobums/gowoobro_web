'use server';

import { revalidatePath } from 'next/cache';

// 서버 액션은 누구나 POST 로 부를 수 있다(액션 ID 가 번들에 있다). 그래서
// 캐시 무효화는 관리자 토큰을 받아 백엔드에서 확인된 경우에만 한다.
// 확인은 관리자 전용 엔드포인트(GET /questions) 를 1건만 조회해 본다 —
// 백엔드가 토큰을 판정하므로 웹 서버에 JWT 시크릿을 둘 필요가 없다.
const apiBase = () =>
  (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://gowoobro.com/api').replace(/\/+$/, '');

const isAdminToken = async (token: string): Promise<boolean> => {
  if (!token || token.length > 4096) return false;

  try {
    const res = await fetch(`${apiBase()}/questions?page=1&pagesize=1`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    return res.ok;
  } catch {
    return false;
  }
};

export async function revalidateHomePage(token: string | null): Promise<boolean> {
  if (typeof token !== 'string' || !(await isAdminToken(token))) {
    return false;
  }

  revalidatePath('/[lang]', 'page');
  revalidatePath('/', 'page');
  return true;
}
