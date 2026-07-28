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
