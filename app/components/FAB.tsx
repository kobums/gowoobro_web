'use client';

import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getAnswers } from '../api/answers';
import { getBlockedReason } from '../lib/axios';
import { Answers } from '../types/models';

// --- Styled Components ---

const FABWrapper = styled.div`
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 100;

  @media (max-width: 640px) {
    right: 1rem;
    bottom: 1rem;
  }
`;

const FABButton = styled(motion.button)`
  width: 56px;
  height: 56px;
  border-radius: 999px;
  border: none;
  background-color: #0f071e;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 4px 10px -5px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #6d28d9;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 640px) {
    width: 48px;
    height: 48px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const NotificationDot = styled(motion.span)`
  position: absolute;
  top: -2px;
  right: -2px;
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: #ef4444;
  border: 2px solid white;
  pointer-events: none;
`;

const Tooltip = styled(motion.div)`
  position: fixed;
  right: 1.5rem;
  bottom: calc(1.5rem + 56px + 14px);
  background: #0f071e;
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.5;
  padding: 0.6rem 0.9rem;
  border-radius: 12px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 200;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    right: 20px;
    border: 6px solid transparent;
    border-top-color: #0f071e;
  }

  @media (max-width: 640px) {
    right: 1rem;
    bottom: calc(1rem + 48px + 14px);
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 101;
`;

const Panel = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-radius: 24px 24px 0 0;
  z-index: 102;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (min-width: 768px) {
    left: auto;
    top: 0;
    bottom: 0;
    width: 420px;
    border-radius: 24px 0 0 24px;
    max-height: 100vh;
  }
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #f3f4f6;
  flex-shrink: 0;
`;

const PanelTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const TitleTag = styled.div`
  display: flex;
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

const TitleText = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  letter-spacing: -0.02em;
`;

const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: white;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #111827;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const PanelBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem 1rem;
  color: #9ca3af;
  text-align: center;

  svg {
    width: 40px;
    height: 40px;
    color: #d1d5db;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const QACard = styled(motion.div)`
  background: #f9f9fb;
  border-radius: 16px;
  padding: 1rem 1.25rem;
  border: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const QuestionRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const CardTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
`;

const Label = styled.span<{ type: 'question' | 'answer' | 'pending' }>`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${props =>
    props.type === 'question' ? '#7c3aed' :
    props.type === 'pending' ? '#9ca3af' : '#059669'};
`;

const QuestionText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #1f2937;
  font-weight: 500;
  line-height: 1.5;
`;

const AnswerText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #374151;
  line-height: 1.6;
`;

const PendingBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: #9ca3af;
  font-style: italic;
`;

const Divider = styled.div`
  height: 1px;
  background: #e5e7eb;
`;

const DateText = styled.span`
  font-size: 0.7rem;
  color: #9ca3af;
  margin-top: 0.25rem;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 0.4rem;
  justify-content: center;
  padding: 2rem;

  span {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: #a78bfa;
    animation: bounce 1.2s infinite;

    &:nth-of-type(2) { animation-delay: 0.2s; }
    &:nth-of-type(3) { animation-delay: 0.4s; }
  }

  @keyframes bounce {
    0%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-8px); }
  }
`;

// --- Helpers ---

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr.replace(' ', 'T'));
    return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

// --- Component ---

const STORAGE_KEY = 'fab_seen_answer_count';

export default function FAB() {
  const [open, setOpen] = useState(false);
  const [ip, setIp] = useState<string>('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        setIp(data.ip);
      } catch {
        // silent fail
      }
    };
    fetchIp();
  }, []);

  useEffect(() => {
    const show = setTimeout(() => setShowTooltip(true), 800);
    const hide = setTimeout(() => setShowTooltip(false), 5800);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['answers', ip],
    queryFn: () => getAnswers({ address: ip }),
    enabled: !!ip,
    refetchInterval: 60_000,
  });

  // 차단된 IP 면 조회가 403 으로 막힌다. 백엔드가 준 사유를 그대로 보여준다.
  const blockedReason = getBlockedReason(error);

  const items: Answers[] = data?.items ?? [];

  // 답변 있는 항목 수가 마지막으로 확인한 수보다 많으면 알림 표시
  useEffect(() => {
    if (!data) return;
    const answeredCount = items.filter(item => !!item.answer).length;
    const seenCount = parseInt(localStorage.getItem(STORAGE_KEY) ?? '0', 10);
    setHasUnread(answeredCount > seenCount);
  }, [data]);

  const handleOpen = () => {
    setOpen(true);
    const answeredCount = items.filter(item => !!item.answer).length;
    localStorage.setItem(STORAGE_KEY, String(answeredCount));
    setHasUnread(false);
  };

  return (
    <>
      <FABWrapper>
        <FABButton
          onClick={handleOpen}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-label="내 Q&A 보기"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </FABButton>
        <AnimatePresence>
          {hasUnread && (
            <NotificationDot
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 400 }}
            />
          )}
        </AnimatePresence>
      </FABWrapper>
      <AnimatePresence>
        {showTooltip && (
          <Tooltip
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
          >
            여기서 질문에 대한 답변을 확인할 수 있어요 💬
          </Tooltip>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <Panel
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            >
              <PanelHeader>
                <PanelTitle>
                  <TitleTag>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}>
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    My Q&A
                  </TitleTag>
                  <TitleText>질문 & 답변</TitleText>
                </PanelTitle>
                <CloseButton onClick={() => setOpen(false)} aria-label="닫기">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </CloseButton>
              </PanelHeader>

              <PanelBody>
                {isLoading ? (
                  <LoadingDots>
                    <span /><span /><span />
                  </LoadingDots>
                ) : blockedReason ? (
                  <EmptyState>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                    </svg>
                    <p>{blockedReason}</p>
                  </EmptyState>
                ) : items.length === 0 ? (
                  <EmptyState>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <p>아직 등록된 질문이 없습니다.<br />궁금한 것을 질문해보세요!</p>
                  </EmptyState>
                ) : (
                  items.map((item, i) => (
                    <QACard
                      key={item.id ?? i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <CardTopRow>
                        <Label type="question">질문</Label>
                        {item.date && <DateText>{formatDate(item.date)}</DateText>}
                      </CardTopRow>
                      <QuestionText>{item.questionText}</QuestionText>

                      <Divider />

                      {item.answer ? (
                        <QuestionRow>
                          <Label type="answer">답변</Label>
                          <AnswerText>{item.answer}</AnswerText>
                        </QuestionRow>
                      ) : (
                        <PendingBadge>
                          <Label type="pending">답변 대기중</Label>
                        </PendingBadge>
                      )}
                    </QACard>
                  ))
                )}
              </PanelBody>
            </Panel>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
