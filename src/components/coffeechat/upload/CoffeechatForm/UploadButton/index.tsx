// import styled from '@emotion/styled';
// import { IconPlus } from '@sopt-makers/icons';
// import { Button } from '@sopt-makers/ui';
// import { useFormContext } from 'react-hook-form';

// import { CoffeechatFormContent } from '@/components/coffeechat/upload/CoffeechatForm/types';
// import Responsive from '@/components/common/Responsive';

// interface UploadButtonProps {
//   onSubmit: (data: CoffeechatFormContent) => void;
// }

// export default function UploadButton({ onSubmit }: UploadButtonProps) {
//   const { handleSubmit, getValues } = useFormContext();

//   const submitCoffeechat = () => {
//     console.log('Asdf');
//     onSubmit({
//       memberInfo: {
//         career: getValues('memberInfo.career') ? getValues('memberInfo.career')[0] : null,
//         introduction: getValues('memberInfo.introduction'),
//       },
//       coffeeChatInfo: {
//         sections: getValues('coffeeChatInfo.sections'),
//         bio: getValues('coffeeChatInfo.bio'),
//         topicTypes: getValues('coffeeChatInfo.topicTypes'),
//         topic: getValues('coffeeChatInfo.topic'),
//         meetingType: getValues('coffeeChatInfo.meetingType'),
//         guideline: getValues('coffeeChatInfo.guideline'),
//       },
//     });
//   };

//   return (
//     <div onClick={handleSubmit(submitCoffeechat)}>
//       <Responsive only='desktop'>
//         <Button size='md' LeftIcon={IconPlus} type='button'>
//           커피챗 오픈하기
//         </Button>
//       </Responsive>
//       <Responsive only='mobile'>
//         <MobileButton size='lg' LeftIcon={IconPlus} type='button'>
//           커피챗 오픈하기
//         </MobileButton>
//       </Responsive>
//     </div>
//   );
// }

// const MobileButton = styled(Button)`
//   width: 100%;
// `;

import styled from '@emotion/styled';
import { IconPlus } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';

import Responsive from '@/components/common/Responsive';

export default function UploadButton() {
  return (
    <div>
      <Responsive only='desktop'>
        <Button size='md' LeftIcon={IconPlus} type='submit'>
          커피챗 오픈하기
        </Button>
      </Responsive>
      <Responsive only='mobile'>
        <MobileButton size='lg' LeftIcon={IconPlus} type='submit'>
          커피챗 오픈하기
        </MobileButton>
      </Responsive>
    </div>
  );
}

const MobileButton = styled(Button)`
  width: 100%;
`;
