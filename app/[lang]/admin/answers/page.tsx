'use client';

import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';
import { getQuestions } from '../../../api/questions';
import { getAnswers, createAnswer, updateAnswer } from '../../../api/answers';
import { Questions, Answers } from '../../../types/models';

// --- Styled Components ---

const Page = styled.div`
  min-height: 100vh;
  background: #f9f9fb;
  padding: 2rem 1rem;
`;

const Inner = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.6rem;
  background-color: #f3f0ff;
  color: #7c3aed;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  width: fit-content;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  letter-spacing: -0.02em;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FilterBtn = styled.button<{ active: boolean }>`
  padding: 0.4rem 1rem;
  border-radius: 999px;
  border: 1px solid ${p => p.active ? '#7c3aed' : '#e5e7eb'};
  background: ${p => p.active ? '#f3f0ff' : 'white'};
  color: ${p => p.active ? '#7c3aed' : '#6b7280'};
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
`;

const Card = styled.div<{ answered: boolean }>`
  background: white;
  border-radius: 20px;
  border: 1.5px solid ${p => p.answered ? '#d1fae5' : '#f3f4f6'};
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  transition: border-color 0.2s;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const IpBadge = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  color: #9ca3af;
  font-family: monospace;
`;

const DateBadge = styled.span`
  font-size: 0.72rem;
  color: #d1d5db;
`;

const StatusBadge = styled.span<{ answered: boolean }>`
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: ${p => p.answered ? '#d1fae5' : '#fef3c7'};
  color: ${p => p.answered ? '#059669' : '#d97706'};
`;

const QuestionText = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
  line-height: 1.6;
`;

const Divider = styled.div`
  height: 1px;
  background: #f3f4f6;
`;

const AnswerArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.9rem;
  font-family: inherit;
  color: #1f2937;
  resize: vertical;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
  line-height: 1.6;

  &:focus {
    border-color: #a78bfa;
  }
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const SaveBtn = styled.button`
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 10px;
  background: #0f071e;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #6d28d9;
  }

  &:disabled {
    background: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

const SavedMsg = styled.span`
  font-size: 0.8rem;
  color: #059669;
  font-weight: 500;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #9ca3af;
  font-size: 0.9rem;
`;

const LoadingRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Skeleton = styled.div`
  background: white;
  border-radius: 20px;
  border: 1.5px solid #f3f4f6;
  padding: 1.25rem 1.5rem;
  height: 120px;
  background: linear-gradient(90deg, #f3f4f6 25%, #f9fafb 50%, #f3f4f6 75%);
  background-size: 800px 100%;
  animation: shimmer 1.5s infinite ease-in-out;

  @keyframes shimmer {
    0% { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
`;

// --- Types ---

type Filter = 'all' | 'pending' | 'answered';

interface QAItem {
  question: Questions;
  answer: Answers | null;
}

// --- Helpers ---

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr.replace(' ', 'T')).toLocaleDateString('ko-KR', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  } catch { return dateStr; }
}

// --- Component ---

export default function AnswersAdminPage() {
  const [items, setItems] = useState<QAItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const [saving, setSaving] = useState<Record<number, boolean>>({});
  const [saved, setSaved] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [qRes, aRes] = await Promise.all([
          getQuestions({ pagesize: 100, page: 1, orderby: 'id desc' }),
          getAnswers({ pagesize: 100, page: 1 }),
        ]);

        const answerMap = new Map<number, Answers>();
        (aRes.items ?? []).forEach(a => answerMap.set(a.question, a));

        const merged: QAItem[] = (qRes.items ?? []).map(q => ({
          question: q,
          answer: q.id !== undefined ? (answerMap.get(q.id) ?? null) : null,
        }));

        setItems(merged);

        const initialDrafts: Record<number, string> = {};
        merged.forEach(({ question, answer }) => {
          if (question.id !== undefined) {
            initialDrafts[question.id] = answer?.answer ?? '';
          }
        });
        setDrafts(initialDrafts);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleSave = async (item: QAItem) => {
    const qid = item.question.id!;
    const text = (drafts[qid] ?? '').trim();
    if (!text) return;

    setSaving(prev => ({ ...prev, [qid]: true }));
    try {
      if (item.answer) {
        await updateAnswer({ ...item.answer, answer: text });
        setItems(prev => prev.map(i =>
          i.question.id === qid ? { ...i, answer: { ...i.answer!, answer: text } } : i
        ));
      } else {
        const res = await createAnswer({
          address: item.question.address,
          question: qid,
          answer: text,
        });
        const newAnswer: Answers = {
          id: res.id,
          address: item.question.address,
          question: qid,
          answer: text,
        };
        setItems(prev => prev.map(i =>
          i.question.id === qid ? { ...i, answer: newAnswer } : i
        ));
      }
      setSaved(prev => ({ ...prev, [qid]: true }));
      setTimeout(() => setSaved(prev => ({ ...prev, [qid]: false })), 2000);
    } finally {
      setSaving(prev => ({ ...prev, [qid]: false }));
    }
  };

  const filtered = items.filter(({ answer }) => {
    if (filter === 'pending') return !answer?.answer;
    if (filter === 'answered') return !!answer?.answer;
    return true;
  });

  const pendingCount = items.filter(i => !i.answer?.answer).length;
  const answeredCount = items.filter(i => !!i.answer?.answer).length;

  return (
    <Page>
      <Inner>
        <PageHeader>
          <Tag>Admin</Tag>
          <Title>질문 답변 관리</Title>
        </PageHeader>

        <FilterRow>
          <FilterBtn active={filter === 'all'} onClick={() => setFilter('all')}>
            전체 {items.length}
          </FilterBtn>
          <FilterBtn active={filter === 'pending'} onClick={() => setFilter('pending')}>
            대기중 {pendingCount}
          </FilterBtn>
          <FilterBtn active={filter === 'answered'} onClick={() => setFilter('answered')}>
            완료 {answeredCount}
          </FilterBtn>
        </FilterRow>

        {loading ? (
          <LoadingRow>
            {[1, 2, 3].map(i => <Skeleton key={i} />)}
          </LoadingRow>
        ) : filtered.length === 0 ? (
          <EmptyState>질문이 없습니다.</EmptyState>
        ) : (
          filtered.map(({ question, answer }) => {
            const qid = question.id!;
            const draft = drafts[qid] ?? '';
            const isAnswered = !!answer?.answer;
            const isDirty = draft !== (answer?.answer ?? '');

            return (
              <Card key={qid} answered={isAnswered}>
                <CardMeta>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <IpBadge>{question.address}</IpBadge>
                    <DateBadge>{formatDate(question.date)}</DateBadge>
                  </div>
                  <StatusBadge answered={isAnswered}>
                    {isAnswered ? '답변완료' : '대기중'}
                  </StatusBadge>
                </CardMeta>

                <QuestionText>{question.question}</QuestionText>

                <Divider />

                <AnswerArea
                  placeholder="답변을 입력하세요..."
                  value={draft}
                  onChange={e => setDrafts(prev => ({ ...prev, [qid]: e.target.value }))}
                />

                <CardFooter>
                  {saved[qid] && <SavedMsg>저장되었습니다 ✓</SavedMsg>}
                  <SaveBtn
                    onClick={() => handleSave({ question, answer })}
                    disabled={saving[qid] || !isDirty || !draft.trim()}
                  >
                    {saving[qid] ? '저장중...' : isAnswered ? '수정' : '답변 등록'}
                  </SaveBtn>
                </CardFooter>
              </Card>
            );
          })
        )}
      </Inner>
    </Page>
  );
}
