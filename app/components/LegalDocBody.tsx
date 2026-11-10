'use client';

import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// 약관 본문(마크다운)을 그린다. 공개 페이지와 관리자 미리보기가 같이 쓴다.
//
// globals.css 의 tailwind base 가 제목·목록 스타일을 전부 지우므로 여기서 다시 준다.
// react-markdown 은 본문에 섞인 HTML 을 실행하지 않고 글자로 내보낸다.
const Article = styled.div`
  color: #1f2937;
  font-size: 1rem;
  line-height: 1.8;
  word-break: keep-all;
  overflow-wrap: anywhere;

  h1, h2, h3, h4 {
    color: #0f071e;
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: -0.01em;
  }
  h1 { font-size: 1.5rem; margin: 2.5rem 0 1rem; }
  h2 { font-size: 1.25rem; margin: 2.5rem 0 0.75rem; }
  h3 { font-size: 1.0625rem; margin: 1.75rem 0 0.5rem; }
  h4 { font-size: 1rem; margin: 1.5rem 0 0.5rem; }

  > :first-of-type { margin-top: 0; }

  p { margin: 0 0 1rem; }

  ul, ol { margin: 0 0 1rem; padding-left: 1.5rem; }
  ul { list-style: disc; }
  ol { list-style: decimal; }
  li { margin: 0.25rem 0; }
  li > ul, li > ol { margin: 0.25rem 0; }

  a { color: #6d28d9; text-decoration: underline; text-underline-offset: 2px; }
  strong { font-weight: 700; }

  hr { border: 0; border-top: 1px solid #e5e7eb; margin: 2rem 0; }

  blockquote {
    margin: 0 0 1rem;
    padding: 0.25rem 0 0.25rem 1rem;
    border-left: 3px solid #a78bfa;
    color: #4b5563;
  }

  code {
    background: #f3f0ff;
    border-radius: 4px;
    padding: 0.1rem 0.35rem;
    font-size: 0.9em;
  }
`;

// 수집 항목 표처럼 열이 많은 표는 휴대폰 폭을 넘는다. 표만 가로로 스크롤시킨다.
const TableScroll = styled.div`
  overflow-x: auto;
  margin: 0 0 1.25rem;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9375rem;
    line-height: 1.6;
  }
  th, td {
    border: 1px solid #e5e7eb;
    padding: 0.6rem 0.75rem;
    text-align: left;
    vertical-align: top;
    min-width: 6rem;
  }
  th { background: #f9f9fb; font-weight: 600; color: #0f071e; }
`;

export default function LegalDocBody({ body }: { body: string }) {
  return (
    <Article>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ children }) => (
            <TableScroll>
              <table>{children}</table>
            </TableScroll>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </Article>
  );
}
