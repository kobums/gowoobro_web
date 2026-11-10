'use client';

import styled from '@emotion/styled';

// 약관 페이지는 앱 안 웹뷰와 스토어 심사에서 열린다. 사이트 헤더·푸터 없이
// 본문만 읽히도록 좁은 한 단으로 둔다.
export const Page = styled.main`
  min-height: 100vh;
  background: #ffffff;
  padding: 3rem 1.25rem 5rem;
`;

export const Column = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

export const AppLink = styled.a`
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6d28d9;
  text-decoration: none;

  &:hover { text-decoration: underline; }
`;

export const DocTitle = styled.h1`
  margin: 0.5rem 0 0.75rem;
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: #0f071e;
`;

export const Meta = styled.p`
  margin: 0 0 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #6b7280;
`;

export const OldNotice = styled.p`
  margin: 0 0 2rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  background: #f3f0ff;
  font-size: 0.875rem;
  color: #4b5563;

  a { color: #6d28d9; font-weight: 600; margin-left: 0.5rem; }
`;

export const History = styled.details`
  margin-top: 3.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #4b5563;

  summary {
    cursor: pointer;
    font-weight: 600;
    color: #1f2937;
    width: fit-content;
  }

  ul { margin: 0.75rem 0 0; padding: 0; list-style: none; }
  li { padding: 0.3rem 0; }
  a { color: #6d28d9; }
  a[aria-current='page'] { color: #1f2937; font-weight: 600; text-decoration: none; }
`;
