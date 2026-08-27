import config from '../site.config.json';

export const DEFAULT_SITE_URL: string = config.siteUrl;
export const BAIDU_TONGJI_ID: string = (config as { baiduTongjiId?: string }).baiduTongjiId ?? '';
