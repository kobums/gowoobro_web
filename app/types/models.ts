export interface Questions {
  id?: number;
  address: string;
  question: string;
  date?: string;
  extra?: Record<string, any>;
}

export interface Answers {
  id?: number;
  address: string;
  question: number;
  questionText?: string;
  answer: string;
  date?: string;
  extra?: Record<string, any>;
}

export interface Ipblock {
  id?: number;
  address: string;
  /** 차단 사유. 차단된 방문자에게 그대로 노출된다. */
  reason?: string;
  date?: string;
  extra?: Record<string, any>;
}

export type ProjectType = 'app' | 'web';

export interface Project {
  id: number;
  key: string;
  type: ProjectType;
  title: string;
  description: string;
  iconurl: string; // Path to icon in public folder
  url?: string;
  playstoreurl?: string;
  appstoreurl?: string;
  qrcodeurl?: string; // Placeholder for now, we might generate this dynamically or use a static image path
  date?: string;
  extra?: Record<string, any>;
}

/** 약관·개인정보 처리방침 등 법적 문서의 한 버전. 본문은 마크다운이다. */
export interface LegalDoc {
  id: number;
  /** 프로젝트 id */
  project: number;
  /** URL 에 쓰이는 문서 종류. terms, privacy 등 */
  type: string;
  lang: string;
  /** 서버가 매긴다. 등록할 때는 보내지 않는다. */
  version: number;
  title: string;
  body: string;
  /** 시행일 YYYY-MM-DD. 이 날부터 공개된다. */
  effectivedate: string;
  date?: string;
}

export interface LegalDocVersion {
  id: number;
  version: number;
  effectivedate: string;
}

// Pagination and other common types can be added here
export interface PagingParams {
  page?: number;
  pagesize?: number;
}

export interface ListResponse<T> {
  items: T[];
  total?: number;
}

export interface SingleResponse<T> {
  item: T;
}

export interface CreateResponse {
  id: number;
}

export interface ErrorResponse {
  code?: string;
  error?: string;
}
