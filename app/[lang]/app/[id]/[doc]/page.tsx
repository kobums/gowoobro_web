import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProject } from '../../../../api/projects';
import { getCurrentLegalDoc, getLegalDoc, LegalDocResponse } from '../../../../api/legaldocs';
import { getDictionary } from '../../../../get-dictionary';
import LegalDocBody from '../../../../components/LegalDocBody';
import { Page, Column, AppLink, DocTitle, Meta, OldNotice, History } from '../../../../components/LegalDocStyles';
import { Project } from '../../../../types/models';

// 약관·개인정보 처리방침 페이지.
//   /{lang}/app/{프로젝트 id}/{문서 종류}        지금 시행 중인 버전
//   /{lang}/app/{프로젝트 id}/{문서 종류}?v={id}  이전 버전
//
// 내용은 전부 DB(legaldoc_tb)에서 온다. 관리자 화면에서 문서를 등록하면 이 주소가
// 바로 열리므로 앱마다 페이지를 만들어 배포할 필요가 없다. 이 주소는 스토어 등록
// 정보와 앱 안 링크에 박히므로 바꾸면 안 된다.

type Params = Promise<{ lang: string; id: string; doc: string }>;
type SearchParams = Promise<{ v?: string | string[] }>;

// 백엔드와 같은 규칙. 어긋난 값은 API 를 부르지 않고 404 로 끝낸다.
const DOC_TYPE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const NUMERIC = /^[1-9]\d{0,15}$/;

interface Loaded extends LegalDocResponse {
  project: Project;
  isCurrent: boolean;
}

// generateMetadata 와 페이지가 같은 요청 안에서 한 번만 조회하도록 묶는다.
const load = cache(async (lang: string, id: string, doc: string, v: string): Promise<Loaded | null> => {
  if (!NUMERIC.test(id) || doc.length > 30 || !DOC_TYPE.test(doc)) return null;
  if (v && !NUMERIC.test(v)) return null;

  const projectId = Number(id);

  try {
    const [{ item: project }, current] = await Promise.all([
      getProject(projectId),
      getCurrentLegalDoc(projectId, doc, lang),
    ]);
    if (!project || !current.item) return null;

    if (!v || Number(v) === current.item.id) {
      return { ...current, project, isCurrent: true };
    }

    // ?v= 는 누구나 바꿔 넣을 수 있다. 이 주소의 프로젝트·문서 종류와 맞는 버전만 보여준다.
    const old = await getLegalDoc(Number(v));
    if (!old.item || old.item.project !== projectId || old.item.type !== doc) return null;

    return { ...old, project, isCurrent: false };
  } catch {
    return null;
  }
});

const firstParam = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v) || '';

const formatDate = (date: string, lang: string) => {
  const [y, m, d] = date.split('-').map(Number);
  if (!y || !m || !d) return date;
  // 시행일은 날짜일 뿐이라 시간대에 따라 하루 밀리지 않도록 UTC 로 고정한다.
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  }).format(new Date(Date.UTC(y, m - 1, d)));
};

export async function generateMetadata({ params, searchParams }: { params: Params; searchParams: SearchParams }): Promise<Metadata> {
  const { lang, id, doc } = await params;
  const data = await load(lang, id, doc, firstParam((await searchParams).v));
  if (!data?.item) return {};

  return {
    title: `${data.item.title} | ${data.project.title}`,
    // 이전 버전이 검색 결과에 현재 문서처럼 뜨지 않게 한다.
    robots: data.isCurrent ? undefined : { index: false },
  };
}

export default async function LegalDocPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { lang, id, doc } = await params;
  const data = await load(lang, id, doc, firstParam((await searchParams).v));
  if (!data?.item) notFound();

  const { item, project, isCurrent, versions = [] } = data;
  const t = (await getDictionary(lang)).legal;
  const base = `/${lang}/app/${project.id}/${doc}`;

  return (
    <Page lang={item.lang}>
      <Column>
        <AppLink href={`/${lang}/app/${project.id}`}>{project.title}</AppLink>
        <DocTitle>{item.title}</DocTitle>
        <Meta>
          {t.effective} {formatDate(item.effectivedate, lang)} · {t.version.replace('{version}', String(item.version))}
        </Meta>

        {!isCurrent && (
          <OldNotice>
            {t.old_notice}
            <a href={base}>{t.view_current}</a>
          </OldNotice>
        )}

        <LegalDocBody body={item.body} />

        {versions.length > 1 && (
          <History>
            <summary>{t.history}</summary>
            <ul>
              {versions.map((v, i) => (
                <li key={v.id}>
                  <a href={i === 0 ? base : `${base}?v=${v.id}`} aria-current={v.id === item.id ? 'page' : undefined}>
                    {t.version.replace('{version}', String(v.version))} · {formatDate(v.effectivedate, lang)}
                    {i === 0 && ` (${t.current})`}
                  </a>
                </li>
              ))}
            </ul>
          </History>
        )}
      </Column>
    </Page>
  );
}
