import config from '../site.config.json';

export const DEFAULT_SITE_URL: string = config.siteUrl;
export const BAIDU_TONGJI_ID: string = (config as { baiduTongjiId?: string }).baiduTongjiId ?? '';
export const FEEDBACK_EMAIL: string = (config as { feedbackEmail?: string }).feedbackEmail ?? '';
export const ICP_NUMBER: string = (config as { icpNumber?: string }).icpNumber ?? '';
