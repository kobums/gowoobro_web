'use client';

import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

const Gate = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9fb;
`;

const Card = styled.div`
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const GateTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  letter-spacing: -0.02em;
`;

const GateTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.2rem 0.6rem;
  background-color: #f3f0ff;
  color: #7c3aed;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  width: fit-content;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  color: #1f2937;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    border-color: #a78bfa;
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 12px;
  background: #0f071e;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #6d28d9;
  }
`;

const ErrorMsg = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: #b91c1c;
  text-align: center;
`;

const SESSION_KEY = 'admin_auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      setAuthed(true);
    }
    setReady(true);
  }, []);

  if (!ready) return null;

  if (!authed) {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const correct = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
      if (pw === correct) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        setAuthed(true);
        setError(false);
      } else {
        setError(true);
        setPw('');
      }
    };

    return (
      <Gate>
        <Card>
          <div>
            <GateTag>Admin</GateTag>
            <GateTitle style={{ marginTop: '0.5rem' }}>관리자 로그인</GateTitle>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Input
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={e => { setPw(e.target.value); setError(false); }}
              autoFocus
            />
            <SubmitBtn type="submit">입장</SubmitBtn>
            {error && <ErrorMsg>비밀번호가 올바르지 않습니다.</ErrorMsg>}
          </form>
        </Card>
      </Gate>
    );
  }

  return <>{children}</>;
}
