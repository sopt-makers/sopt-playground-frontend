/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    ChannelIO?: IChannelIO;
    ChannelIOInitialized?: boolean;
  }
}

interface IChannelIO {
  c?: (...args: any) => void;
  q?: [methodName: string, ...args: any[]][];
  (...args: any): void;
}

interface BootOption {
  appearance?: string;
  customLauncherSelector?: string;
  hideChannelButtonOnBoot?: boolean;
  hidePopup?: boolean;
  language?: string;
  memberHash?: string;
  memberId?: string;
  mobileMessengerMode?: string;
  pluginKey: string;
  profile?: Profile;
  trackDefaultEvent?: boolean;
  trackUtmSource?: boolean;
  unsubscribe?: boolean;
  unsubscribeEmail?: boolean;
  unsubscribeTexting?: boolean;
  zIndex?: number;
}

interface Callback {
  (error: Error | null, user: CallbackUser | null): void;
}

interface CallbackUser {
  alert: number;
  avatarUrl: string;
  id: string;
  language: string;
  memberId: string;
  name?: string;
  profile?: Profile | null;
  tags?: string[] | null;
  unsubscribeEmail: boolean;
  unsubscribeTexting: boolean;
}

interface UpdateUserInfo {
  language?: string;
  profile?: Profile | null;
  profileOnce?: Profile;
  tags?: string[] | null;
  unsubscribeEmail?: boolean;
  unsubscribeTexting?: boolean;
}

interface Profile {
  [key: string]: string | number | boolean | null;
}

interface FollowUpProfile {
  name?: string | null;
  mobileNumber?: string | null;
  email?: string | null;
}

interface EventProperty {
  [key: string]: string | number | boolean | null;
}

type Appearance = 'light' | 'dark' | 'system' | null;

class ChannelService {
  constructor() {
    this.loadScript();
  }

  loadScript() {
    (function () {
      const w = window;
      if (w.ChannelIO) {
        return w.console.error('ChannelIO script included twice.');
      }
      // eslint-disable-next-line no-var
      var ch: IChannelIO = function () {
        // eslint-disable-next-line prefer-rest-params
        ch.c?.(arguments);
      };
      ch.q = [];
      ch.c = function (args) {
        ch.q?.push(args);
      };
      w.ChannelIO = ch;
      function l() {
        if (w.ChannelIOInitialized) {
          return;
        }
        w.ChannelIOInitialized = true;
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
        const x = document.getElementsByTagName('script')[0];
        if (x.parentNode) {
          x.parentNode.insertBefore(s, x);
        }
      }
      if (document.readyState === 'complete') {
        l();
      } else {
        w.addEventListener('DOMContentLoaded', l);
        w.addEventListener('load', l);
      }
    })();
  }

  boot(option: BootOption, callback?: Callback) {
    window.ChannelIO?.('boot', option, callback);
  }

  shutdown() {
    window.ChannelIO?.('shutdown');
  }

  showMessenger() {
    window.ChannelIO?.('showMessenger');
  }

  hideMessenger() {
    window.ChannelIO?.('hideMessenger');
  }

  openChat(chatId?: string | number, message?: string) {
    window.ChannelIO?.('openChat', chatId, message);
  }

  track(eventName: string, eventProperty?: EventProperty) {
    window.ChannelIO?.('track', eventName, eventProperty);
  }

  onShowMessenger(callback: () => void) {
    window.ChannelIO?.('onShowMessenger', callback);
  }

  onHideMessenger(callback: () => void) {
    window.ChannelIO?.('onHideMessenger', callback);
  }

  onBadgeChanged(callback: (alert: number) => void) {
    window.ChannelIO?.('onBadgeChanged', callback);
  }

  onChatCreated(callback: () => void) {
    window.ChannelIO?.('onChatCreated', callback);
  }

  onFollowUpChanged(callback: (profile: FollowUpProfile) => void) {
    window.ChannelIO?.('onFollowUpChanged', callback);
  }

  onUrlClicked(callback: (url: string) => void) {
    window.ChannelIO?.('onUrlClicked', callback);
  }

  clearCallbacks() {
    window.ChannelIO?.('clearCallbacks');
  }

  updateUser(userInfo: UpdateUserInfo, callback?: Callback) {
    window.ChannelIO?.('updateUser', userInfo, callback);
  }

  addTags(tags: string[], callback?: Callback) {
    window.ChannelIO?.('addTags', tags, callback);
  }

  removeTags(tags: string[], callback?: Callback) {
    window.ChannelIO?.('removeTags', tags, callback);
  }

  setPage(page: string) {
    window.ChannelIO?.('setPage', page);
  }

  resetPage() {
    window.ChannelIO?.('resetPage');
  }

  showChannelButton() {
    window.ChannelIO?.('showChannelButton');
  }

  hideChannelButton() {
    window.ChannelIO?.('hideChannelButton');
  }

  setAppearance(appearance: Appearance) {
    window.ChannelIO?.('setAppearance', appearance);
  }
}

export default ChannelService;
