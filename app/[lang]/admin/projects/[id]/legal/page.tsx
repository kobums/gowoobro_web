'use client';

import { use, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AxiosError } from 'axios';
import { getProject } from '../../../../../api/projects';
import { getLegalDocs, createLegalDoc, updateLegalDoc, deleteLegalDoc } from '../../../../../api/legaldocs';
import { LegalDoc, Project } from '../../../../../types/models';
import LegalDocBody from '../../../../../components/LegalDocBody';

// 프로젝트의 약관·개인정보 처리방침 관리.
//
// 여기서 문서를 등록하면 /{lang}/app/{id}/{종류} 페이지가 바로 생긴다.
// 이미 시행된 버전은 사용자가 동의한 내용이라 고치거나 지울 수 없고(서버가 409),
// 내용을 바꾸려면 그 버전을 불러와 새 버전으로 등록한다.

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: #1f2937;
`;

const BackLink = styled(Link)`
  color: #6b7280;
  text-decoration: none;
  font-size: 0.9rem;
  &:hover { color: #374151; text-decoration: underline; }
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: bold;
  color: #111827;
  margin: 1rem 0 0.25rem;
`;

const Hint = styled.p`
  margin: 0 0 2rem;
  font-size: 0.9rem;
  color: #6b7280;
`;

const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin: 2.5rem 0 1rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 1.25rem 1.5rem;
  margin-bottom: 1rem;
`;

const GroupHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 0.75rem;

  strong { font-size: 1rem; color: #111827; }
  a { font-size: 0.85rem; color: #2563eb; word-break: break-all; }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0;
  border-top: 1px solid #f3f4f6;
  font-size: 0.9rem;
`;

const Badge = styled.span<{ tone: 'live' | 'pending' | 'past' }>`
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ tone }) => (tone === 'live' ? '#dcfce7' : tone === 'pending' ? '#fef3c7' : '#f3f4f6')};
  color: ${({ tone }) => (tone === 'live' ? '#166534' : tone === 'pending' ? '#92400e' : '#6b7280')};
`;

const Spacer = styled.span`
  flex: 1;
`;

const Button = styled.button`
  padding: 0.4rem 0.9rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  font-size: 0.85rem;
  cursor: pointer;
  &:hover { background: #f3f4f6; }
  &:disabled { opacity: 0.5; cursor: default; }
`;

const DangerButton = styled(Button)`
  color: #ef4444;
  border-color: #fca5a5;
  &:hover { background: #fef2f2; }
`;

const PrimaryButton = styled(Button)`
  padding: 0.7rem 1.5rem;
  background: #2563eb;
  border-color: #2563eb;
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  &:hover { background: #1d4ed8; }
`;

const Fields = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;

  input, select, textarea {
    padding: 0.6rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 0.95rem;
    font-weight: 400;
    color: #1f2937;
    background: white;
  }
  input:focus, select:focus, textarea:focus { outline: none; border-color: #2563eb; }
  input:disabled, select:disabled { background: #f3f4f6; color: #6b7280; }

  small { font-weight: 400; color: #6b7280; }
`;

const Editor = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 900px) { grid-template-columns: 1fr; }

  textarea {
    min-height: 480px;
    resize: vertical;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.875rem;
    line-height: 1.6;
  }
`;

const Preview = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 1rem 1.25rem;
  min-height: 480px;
  max-height: 520px;
  overflow-y: auto;
  background: white;
`;

const Message = styled.p<{ error?: boolean }>`
  margin: 0;
  font-size: 0.9rem;
  color: ${({ error }) => (error ? '#b91c1c' : '#166534')};
`;

// 자주 쓰는 종류. 종류 값은 그대로 URL 이 된다.
const PRESETS: Record<string, Record<string, string>> = {
  terms: { ko: '이용약관', en: 'Terms of Service' },
  privacy: { ko: '개인정보 처리방침', en: 'Privacy Policy' },
};
const CUSTOM = '__custom__';
const TYPE_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

interface FormState {
  /** 있으면 시행 전 버전을 고치는 중, 없으면 새 버전 등록 */
  id?: number;
  type: string;
  lang: string;
  title: string;
  body: string;
  effectivedate: string;
}

const emptyForm = (today: string): FormState => ({
  type: 'privacy', lang: 'ko', title: PRESETS.privacy.ko, body: '', effectivedate: today,
});

const errorMessage = (error: unknown) =>
  (error as AxiosError<{ message?: string }>)?.response?.data?.message || '요청에 실패했습니다.';

export default function ProjectLegalPage({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = use(params);
  const projectId = Number(id);

  const [project, setProject] = useState<Project | null>(null);
  const [docs, setDocs] = useState<LegalDoc[]>([]);
  const [today, setToday] = useState('');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(emptyForm(''));
  const [customType, setCustomType] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);

  const reload = useCallback(async () => {
    const data = await getLegalDocs(projectId);
    setDocs(data.items || []);
    setToday(data.today);
    return data.today;
  }, [projectId]);

  useEffect(() => {
    (async () => {
      try {
        const [{ item }, serverToday] = await Promise.all([getProject(projectId), reload()]);
        setProject(item);
        setForm(emptyForm(serverToday));
      } catch (error) {
        setMessage({ text: errorMessage(error), error: true });
      } finally {
        setLoading(false);
      }
    })();
  }, [projectId, reload]);

  // (종류, 언어)별로 묶는다. 서버가 버전 내림차순으로 준다.
  const groups = useMemo(() => {
    const map = new Map<string, LegalDoc[]>();
    for (const doc of docs) {
      const key = `${doc.type}/${doc.lang}`;
      map.set(key, [...(map.get(key) || []), doc]);
    }
    return [...map.values()];
  }, [docs]);

  const isPending = (doc: LegalDoc) => doc.effectivedate > today;

  const startNewVersion = (doc: LegalDoc) => {
    setCustomType(!PRESETS[doc.type]);
    setForm({ type: doc.type, lang: doc.lang, title: doc.title, body: doc.body, effectivedate: today });
    setMessage(null);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const startEdit = (doc: LegalDoc) => {
    setCustomType(!PRESETS[doc.type]);
    setForm({ id: doc.id, type: doc.type, lang: doc.lang, title: doc.title, body: doc.body, effectivedate: doc.effectivedate });
    setMessage(null);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleDelete = async (doc: LegalDoc) => {
    if (!confirm(`${doc.title} v${doc.version} (시행 전) 을 삭제할까요?`)) return;
    try {
      await deleteLegalDoc(doc.id);
      if (form.id === doc.id) setForm(emptyForm(today));
      await reload();
    } catch (error) {
      setMessage({ text: errorMessage(error), error: true });
    }
  };

  const handleTypeSelect = (value: string) => {
    if (value === CUSTOM) {
      setCustomType(true);
      setForm(f => ({ ...f, type: '', title: '' }));
      return;
    }
    setCustomType(false);
    setForm(f => ({ ...f, type: value, title: PRESETS[value][f.lang] || PRESETS[value].ko }));
  };

  const handleLangSelect = (value: string) => {
    setForm(f => {
      // 제목이 기본값 그대로면 언어에 맞춰 같이 바꾼다. 직접 고친 제목은 건드리지 않는다.
      const preset = PRESETS[f.type];
      const untouched = preset && Object.values(preset).includes(f.title);
      return { ...f, lang: value, title: untouched ? preset[value] || f.title : f.title };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const type = form.type.trim().toLowerCase();
    if (!TYPE_PATTERN.test(type) || type.length > 30) {
      setMessage({ text: '종류는 영문 소문자·숫자·하이픈만 쓸 수 있습니다 (예: location-terms).', error: true });
      return;
    }
    if (!form.title.trim() || !form.body.trim() || !form.effectivedate) {
      setMessage({ text: '제목, 시행일, 본문을 모두 입력하세요.', error: true });
      return;
    }

    const publishesNow = form.effectivedate <= today;
    if (publishesNow && !confirm('시행일이 오늘 이전이라 등록 즉시 공개되고, 공개된 뒤에는 수정·삭제할 수 없습니다. 계속할까요?')) {
      return;
    }

    setSaving(true);
    try {
      if (form.id) {
        await updateLegalDoc({ id: form.id, title: form.title, body: form.body, effectivedate: form.effectivedate });
        setMessage({ text: '수정했습니다.' });
      } else {
        const res = await createLegalDoc({
          project: projectId, type, lang: form.lang, title: form.title, body: form.body, effectivedate: form.effectivedate,
        });
        setMessage({ text: `버전 ${res.version} 을 등록했습니다.` });
      }
      setForm(emptyForm(await reload()));
      setCustomType(false);
    } catch (error) {
      setMessage({ text: errorMessage(error), error: true });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Container>Loading...</Container>;
  if (!project) return <Container>Project not found</Container>;

  const editing = !!form.id;

  return (
    <Container>
      <BackLink href="/admin/projects">← Back to Projects</BackLink>
      <Title>{project.title} — 약관 관리</Title>
      <Hint>
        문서를 등록하면 /{lang}/app/{project.id}/종류 주소로 바로 공개됩니다. 이 주소를 스토어 등록 정보와 앱 안 링크에 쓰세요.
      </Hint>

      {groups.length === 0 && <Card>아직 등록된 문서가 없습니다. 아래에서 첫 버전을 등록하세요.</Card>}

      {groups.map(group => {
        const head = group[0];
        const live = group.find(doc => !isPending(doc));
        const path = `/${head.lang}/app/${projectId}/${head.type}`;

        return (
          <Card key={`${head.type}/${head.lang}`}>
            <GroupHead>
              <strong>{head.type} · {head.lang}</strong>
              {live ? (
                <a href={path} target="_blank" rel="noreferrer">{path}</a>
              ) : (
                <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>시행된 버전이 없어 아직 비공개</span>
              )}
            </GroupHead>

            {group.map(doc => (
              <Row key={doc.id}>
                <span>v{doc.version}</span>
                <span>{doc.title}</span>
                <span>시행 {doc.effectivedate}</span>
                {isPending(doc) ? (
                  <Badge tone="pending">시행 전</Badge>
                ) : doc.id === live?.id ? (
                  <Badge tone="live">현재</Badge>
                ) : (
                  <Badge tone="past">이전</Badge>
                )}
                <Spacer />
                {isPending(doc) && (
                  <>
                    <Button type="button" onClick={() => startEdit(doc)}>수정</Button>
                    <DangerButton type="button" onClick={() => handleDelete(doc)}>삭제</DangerButton>
                  </>
                )}
                {doc.id === head.id && (
                  <Button type="button" onClick={() => startNewVersion(doc)}>이 내용으로 새 버전</Button>
                )}
              </Row>
            ))}
          </Card>
        );
      })}

      <SectionTitle>{editing ? '시행 전 버전 수정' : '새 버전 등록'}</SectionTitle>
      <Card as="form" onSubmit={handleSubmit}>
        <Fields>
          <Field>
            종류
            <select
              value={customType ? CUSTOM : form.type}
              onChange={e => handleTypeSelect(e.target.value)}
              disabled={editing}
            >
              <option value="terms">terms (이용약관)</option>
              <option value="privacy">privacy (개인정보 처리방침)</option>
              <option value={CUSTOM}>직접 입력</option>
            </select>
          </Field>
          {customType && (
            <Field>
              종류 값 (URL 에 쓰임)
              <input
                value={form.type}
                onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                placeholder="location-terms"
                disabled={editing}
              />
            </Field>
          )}
          <Field>
            언어
            <select value={form.lang} onChange={e => handleLangSelect(e.target.value)} disabled={editing}>
              <option value="ko">ko</option>
              <option value="en">en</option>
            </select>
          </Field>
          <Field>
            제목
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} maxLength={100} />
          </Field>
          <Field>
            시행일
            <input
              type="date"
              value={form.effectivedate}
              onChange={e => setForm(f => ({ ...f, effectivedate: e.target.value }))}
            />
            <small>이 날부터 공개됩니다. 미래 날짜면 그때까지 수정할 수 있습니다.</small>
          </Field>
        </Fields>

        <Editor>
          <Field>
            본문 (마크다운)
            <textarea value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} />
          </Field>
          <Field as="div">
            미리보기
            <Preview>
              <LegalDocBody body={form.body} />
            </Preview>
          </Field>
        </Editor>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <PrimaryButton type="submit" disabled={saving}>
            {saving ? '저장 중…' : editing ? '수정 저장' : '새 버전 등록'}
          </PrimaryButton>
          {editing && (
            <Button type="button" onClick={() => { setForm(emptyForm(today)); setCustomType(false); }}>
              수정 취소
            </Button>
          )}
          {message && <Message error={message.error}>{message.text}</Message>}
        </div>
      </Card>
    </Container>
  );
}
