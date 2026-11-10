import api from '../lib/axios';
import { LegalDoc, LegalDocVersion, CreateResponse } from '../types/models';

const ENDPOINT = '/legaldocs';

export interface LegalDocResponse {
  /** 문서가 없거나 아직 시행 전이면 null */
  item: LegalDoc | null;
  /** 같은 문서의 시행된 버전들, 최신순 */
  versions?: LegalDocVersion[];
}

/** 지금 시행 중인 문서. 요청한 언어가 없으면 서버가 한국어 문서로 대신한다. (공개) */
export const getCurrentLegalDoc = async (project: number, type: string, lang: string) => {
  const response = await api.get<LegalDocResponse>(`${ENDPOINT}/current`, { params: { project, type, lang } });
  return response.data;
};

/** 특정 버전. 시행 전인 버전은 item 이 null 이다. (공개) */
export const getLegalDoc = async (id: number) => {
  const response = await api.get<LegalDocResponse>(`${ENDPOINT}/${id}`);
  return response.data;
};

/** 한 프로젝트의 모든 버전, 시행 전 포함. (관리자) */
export const getLegalDocs = async (project: number) => {
  const response = await api.get<{ items: LegalDoc[]; today: string }>(ENDPOINT, { params: { project } });
  return response.data;
};

export type LegalDocInput = Pick<LegalDoc, 'project' | 'type' | 'lang' | 'title' | 'body' | 'effectivedate'>;

/** 새 버전 등록. 버전 번호는 서버가 매긴다. (관리자) */
export const createLegalDoc = async (data: LegalDocInput) => {
  const response = await api.post<CreateResponse & { version: number }>(ENDPOINT, data);
  return response.data;
};

/** 시행 전인 버전만 고칠 수 있다. 이미 시행된 버전은 409. (관리자) */
export const updateLegalDoc = async (data: Pick<LegalDoc, 'id' | 'title' | 'body' | 'effectivedate'>) => {
  const response = await api.put(ENDPOINT, data);
  return response.data;
};

/** 시행 전인 버전만 지울 수 있다. (관리자) */
export const deleteLegalDoc = async (id: number) => {
  const response = await api.delete(ENDPOINT, { data: { id } });
  return response.data;
};
