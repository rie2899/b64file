import config from '../site.config.json';

export const DEFAULT_SITE_URL: string = config.siteUrl;
export const BAIDU_TONGJI_ID: string = (config as { baiduTongjiId?: string }).baiduTongjiId ?? '';
export const FEEDBACK_EMAIL: string = (config as { feedbackEmail?: string }).feedbackEmail ?? '';
export const ICP_NUMBER: string = (config as { icpNumber?: string }).icpNumber ?? '';

export const POLICE_RECORD_NUMBER: string = (config as { policeRecordNumber?: string }).policeRecordNumber ?? '';

// beian.mps.gov.cn 的查询链接需要纯数字 code，直接从备案号里取（辽公网安备21010502000962号 → 21010502000962）
export const POLICE_RECORD_CODE: string = (POLICE_RECORD_NUMBER.match(/\d+/) ?? [''])[0];

export const POLICE_RECORD_URL: string = POLICE_RECORD_CODE
  ? `https://beian.mps.gov.cn/#/query/webSearch?code=${POLICE_RECORD_CODE}`
  : '';

/** 英文站地址，用于 zh/en 双向 hreflang */
export const EN_SITE_URL = 'https://b64file.com';
