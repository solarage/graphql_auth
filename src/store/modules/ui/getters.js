import { getter as G } from '@/lib/utils';

export default {
  isLoading: G('loading'),
  getSettings: G('settings.mode'),
  getLoginSettings: G('settings.mode.login'),

  getLogoutBtnTitle: G('settings.mode.login.logoutBtnTitle')
};