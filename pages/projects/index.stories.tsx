import { ComponentMeta, ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import ProjectPage from '.';
const fixture = {
  projects: [
    {
      id: 1,
      name: '큐링',
      generation: null,
      category: '앱잼',
      service_type: ['앱'],
      summary: 'QR코드를 활용한 모임 관리 앱',
      thumbnail_image: 'https://google.com',
      links: [{ project_id: 1, title: 'Pinterest', url: 'https://pinterest.com', id: 1 }],
    },
    {
      id: 2,
      name: '프로젝트 이름',
      generation: null,
      category: '앱잼',
      service_type: ['웹'],
      summary: '한줄 소개',
      thumbnail_image:
        'https://s3.ap-northeast-2.amazonaws.com/cdkserverstack-soptcoreassetsdev5ae82816-3tgwjm4ug18b/e8dbf6a8-f7d5-4f42-8489-3254e90587ff-main.jpeg',
      links: [{ project_id: 2, title: 'website', url: 'https://zigzag.kr', id: 2 }],
    },
    {
      id: 3,
      name: '플레이그라운드',
      generation: null,
      category: '앱잼',
      service_type: ['웹', '앱'],
      summary: '메이커스가 만든 솝트를 위한 아카이빙 서비스',
      thumbnail_image:
        'https://s3.ap-northeast-2.amazonaws.com/cdkserverstack-soptcoreassetsdev5ae82816-3tgwjm4ug18b/8e6a1c56-3925-4635-8e5a-14a10750f0ab-14618671_674790_3331.jpeg',
      links: [
        { project_id: 3, title: 'googlePlay', url: 'https://google.com', id: 3 },
        { project_id: 3, title: 'website', url: 'https://zigzag.kr', id: 4 },
        { project_id: 3, title: 'appStore', url: 'https://google.com', id: 5 },
      ],
    },
  ],
};

export default {
  parameters: {
    msw: {
      handlers: {
        projects: [
          rest.get('http://api.sopt-playground.ga:4000/api/v1/projects', (_req, res, ctx) => res(ctx.json(fixture))),
        ],
      },
    },
  },
} as ComponentMeta<typeof ProjectPage>;

const Template: ComponentStory<typeof ProjectPage> = (args) => <ProjectPage {...args} />;

export const Default = Template.bind({});
Default.storyName = '기본';
