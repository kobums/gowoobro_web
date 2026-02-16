export interface Questions {
  id?: number;
  address: string;
  question: string;
  date?: string;
  extra?: Record<string, any>;
}

export interface Ipblock {
  id?: number;
  address: string;
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
