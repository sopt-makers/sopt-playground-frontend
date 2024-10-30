import { useGetCoffeechatDetail } from '@/api/endpoint/coffeechat/getCoffeechatDetail';
import { Tag } from '@sopt-makers/ui';

interface CoffeechatContentsProps {
  memberId: string;
}

export default function CoffeechatContents({ memberId }: CoffeechatContentsProps) {
  const { data: openerProfile } = useGetCoffeechatDetail(memberId);

  return (
    <>
      {openerProfile && (
        <>
          <>{openerProfile.introduction}</>
          <p>제가 이야기 나누고 싶은 주제는</p>
          {openerProfile.topicTypeList.map((topicType) => {
            return (
              <Tag key={topicType} shape='pill' size='lg' type='solid' variant='default'>
                {topicType}
              </Tag>
            );
          })}
          <>{openerProfile.introduction}</>
          <p>제가 이야기 나누고 싶은 주제는</p>
          <Tag shape='pill' size='lg' type='solid' variant='default'>
            {openerProfile.meetingType}
          </Tag>
        </>
      )}
    </>
  );
}
