import { useEffect } from 'react';

import { getMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { CHANNEL_TALK_PLUGIN_KEY } from '@/constants/env';
import ChannelService from '@/utils/channelService';

export const useChannelService = () => {
  useEffect(() => {
    const channelTalk = new ChannelService();

    async function bootChannelTalk() {
      const pluginKey = CHANNEL_TALK_PLUGIN_KEY;
      try {
        const user = await getMemberOfMe.request();
        channelTalk.boot({
          pluginKey,
          memberId: String(user.id),
          profile: {
            name: user.name,
            avatarUrl: user.profileImage ?? null,
          },
        });
      } catch (_error) {
        channelTalk.boot({
          pluginKey,
        });
      }
    }
    bootChannelTalk();

    return () => {
      channelTalk.shutdown();
    };
  }, []);
};
