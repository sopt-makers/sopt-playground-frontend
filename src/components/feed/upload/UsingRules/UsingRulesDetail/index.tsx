import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import { BottomSheet } from '@/components/common/BottomSheet';
import Divider from '@/components/common/Divider/Divider';
import Modal from '@/components/common/Modal';
import Responsive from '@/components/common/Responsive';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface UsingRulesDetailProps {
  isOpen?: boolean;
  onClose: () => void;
}

export default function UsingRulesDetail({ isOpen = false, onClose }: UsingRulesDetailProps) {
  return (
    <>
      <Responsive only='desktop'>
        <Modal isOpen={isOpen} onClose={onClose} hideCloseButton className='rules-detail'>
          <ModalContents>
            <Overflow>
              <Title>커뮤니티 이용규칙</Title>
              <Detail>
                <CommunityRules />
              </Detail>
            </Overflow>
          </ModalContents>
        </Modal>
      </Responsive>
      <Responsive only='mobile'>
        <BottomSheet header={<Title>커뮤니티 이용규칙</Title>} isOpen={isOpen} onClose={onClose}>
          <Overflow>
            <Detail>
              <CommunityRules />
            </Detail>
          </Overflow>
        </BottomSheet>
      </Responsive>
    </>
  );
}

const CommunityRules = () => {
  return (
    <div>
      <p>
        플레이그라운드는 건전하고 기분 좋은 소통을 지향합니다. 서비스 내 모든 커뮤니티는 커뮤니티 이용규칙에 의해
        운영되므로, 이용자는 커뮤니티 이용 전 반드시 모든 내용을 숙지하여야 합니다.
      </p>
      <br />
      <p>
        방송통신심의위원회의 정보통신에 관한 심의규정, 현행 법률, SOPT 회칙 및 커뮤니티 이용규칙을 위반하거나, 사회 통념
        및 관련 법령을 기준으로 타 이용자에게 악영향을 끼치는 경우, 게시물이 삭제되고 서비스 이용이 제한될 수 있습니다.
        더불어 서비스에 게시한 게시물로 파생되는 문제에 대해서 해당 게시물을 게시한 본인에게 책임을 물을 수 있습니다.
        특히 타인을 비난하거나 저격하는 글을 작성하는 등 커뮤니티 이용규칙을 위반할 경우, 익명 작성자를 식별하여
        공론화하는 등 엄격한 조치가 취해질 수 있습니다.
      </p>
      <br />
      <p>
        커뮤니티 이용규칙은 불법 행위, 각종 차별 및 혐오, 사회적 갈등 조장, 타인의 권리 침해, 다른 이용자에게 불쾌감을
        주는 행위, 커뮤니티 유출 행위, 시스템 장애를 유발하는 비정상 행위 등 커뮤니티 분위기 형성과 운영에 악영향을
        미치는 행위들을 제한하기 위해 지속적으로 개정됩니다.
      </p>
      <br />
      <p>
        서비스 이용 중 서비스 이용 약관 및 커뮤니티 이용규칙에 어긋난다고 판단되는 게시물 작성, 1:1 쪽지, 게시판 개설,
        악용 행위를 발견하셨을 경우, 원활하고 신속한 처리를 위해 해당 게시물의 신고 버튼을 눌러 신고해주시기 바랍니다.
        신고 시 게시물 처리 및 시스템 운영을 위해 최소한의 로그가 수집 및 보관될 수 있습니다.
      </p>
      <br />
      <h3> {'<주요 위반사항 예시>'} </h3>
      <p>
        타인에 대한 비난 및 저격 행위, 생명 경시 행위, 가족 및 고인 모독 행위, 성적 도의관념에 반하는 행위, 비정상적
        서비스 이용과 같이 중대한 커뮤니티 이용규칙 및 현행 법률 위반 행위, 노출 및 음란물 게시 행위, 범죄 및 불법 행위,
        계정 판매 및 대리 게시 행위, 홍보/판매 행위 등
      </p>
      <br />
      <br />
      <Divider />
      <br />
      <br />
      <SubTitle>금지 행위</SubTitle>
      <p>
        이용자 보호 및 원활한 서비스 제공을 위해 다음에 해당하는 게시물 작성, 1:1 쪽지, 악용 행위를 금지하고 있습니다.
        본 커뮤니티 이용규칙은 방송통신심의위원회의 정보통신에 관한 심의규정 등을 기반으로 합니다.
      </p>
      <br />
      <h3>저격 등 논쟁을 일으키는 행위 금지</h3>
      <ListWrapper>
        <List>특정인을 저격하거나 비난하는 게시글 및 댓글을 작성하는 행위</List>
        <List>특정 프로덕트 및 단체를 저격하거나 비난하는 게시글 및 댓글을 작성하는 행위</List>
        <List>거짓된 정보로 행사신청, 팀빌딩 과정에서 이득을 취하는 행위</List>
        <List>기타 위와 비슷하게 저격하거나 논란을 일으킬 수 있는 일체의 행위</List>
      </ListWrapper>
      <br />
      <h3>일반 금지 행위</h3>
      <ListWrapper>
        <List>국제 평화, 국제 질서 및 국가 간의 우의를 현저히 해할 우려가 있는 행위</List>
        <List>인종차별·테러 등 국제 평화 및 국제질서를 현저히 해할 우려가 있는 행위</List>
        <List>외국의 국기·국장 등을 모독함으로써 국익에 반하거나 국가 간의 우의를 현저히 해할 우려가 있는 행위</List>
        <List>
          그 밖에 외국의 정치·종교·문화·사회에 대한 비방·비하·멸시 등 국가 간의 우의를 현저히 해할 우려가 있는 행위
        </List>
      </ListWrapper>
      <br />
      <h3>헌법에 위배되거나 국가의 존립을 해하는 행위</h3>
      <ListWrapper>
        <List>국가의 존립·안전이나 자유민주적 기본질서를 현저히 위태롭게 할 우려가 있는 행위</List>
        <List>헌법을 부정하거나 국가기관을 마비시킬 우려가 현저한 행위</List>
        <List>법령에 따라 분류된 비밀 등 국가기밀을 누설하는 행위</List>
        <List>「국가보안법」에서 금지하는 행위를 수행하는 행위</List>
        <List>헌법에 반하여 역사적 사실을 현저히 왜곡하는 행위</List>
      </ListWrapper>
      <br />
      <h3>범죄 기타 법령에 위반되는 행위</h3>
      <ListWrapper>
        <List>범죄를 목적으로 하거나 예비·음모·교사·방조할 우려가 현저한 행위</List>
        <List>
          범죄의 수단이나 방법 또는 범죄에 이르는 과정이나 결과를 구체적으로 묘사하여 범죄를 조장할 우려가 있는 행위
        </List>
        <List>범죄, 범죄인 또는 범죄단체 등을 미화하여 범죄를 정당하다고 보이게 할 우려가 있는 행위</List>
        <List>그 밖에 범죄 및 법령에 위반되는 위법행위를 조장하여 건전한 법질서를 현저히 해할 우려가 있는 행위</List>
      </ListWrapper>
      <br />
      <h3>
        사회통념상 일반인의 성욕을 자극하여 성적 흥분을 유발하고 정상적인 성적 수치심을 해하여 성적 도의관념에 반하는
        행위
      </h3>
      <ListWrapper>
        <List>신체 부위 또는 성적 행위를 노골적으로 표현 또는 묘사하는 행위</List>
        <List>
          자극적이고 혐오스런 성적표현 및 남녀 신체에 관한 은어 및 비속어를 사용하여 성행위를 구체적으로 묘사하는 행위
        </List>
        <List>성폭력행위를 노골적으로 묘사하는 행위</List>
        <List>성행위와 관련된 신음소리 등을 극히 자극적으로 묘사하는 행위</List>
        <List>신체의 일부 또는 도구를 이용한 유사성교행위를 노골적으로 묘사하는 행위</List>
        <List>자위행위 및 전희를 구체적으로 묘사하는 행위</List>
        <List>
          수간, 시간, 혼음, 근친상간, 가학성·피학성 음란증, 관음증 등 비정상적인 행위를 구체적으로 묘사한 행위
        </List>
        <List>아동 또는 청소년을 성적 유희의 대상으로 직접적이고 구체적으로 묘사한 행위</List>
        <List>불건전한 모임, 대화, 통화 등 온·오프라인 만남 행위</List>
        <List>유흥 관련 정보 공유, 매매·알선 행위 등 불법 행위</List>
        <List>그 밖에 일반인의 성적 수치심을 현저히 해할 우려가 있는 행위</List>
      </ListWrapper>
      <br />
      <h3>폭력성·잔혹성·혐오성 등이 심각한 행위</h3>
      <ListWrapper>
        <List>
          장애인, 노인, 임산부, 아동 등 사회적인 약자 또는 부모, 스승 등에 대한 살상, 폭행, 협박, 학대행위 등을
          구체적으로 묘사하는 행위
        </List>
        <List>오물, 신체 분비물 등을 구체적·사실적으로 묘사하여 혐오감을 불러일으키는 행위</List>
        <List>수술 장면 등 의료행위를 지나치게 상세히 표현하여 혐오감을 불러일으키는 행위</List>
        <List>
          흉기 그 밖의 위험한 물건 등을 사용하여 과도하게 신체 또는 시체를 손상하는 등 생명을 경시하는 잔혹한 행위
        </List>
        <List>동물에 대한 학대, 사체, 포식 등을 구체적으로 표현하여 잔혹감 또는 혐오감을 주는 행위</List>
        <List>과도한 욕설 등 저속한 언어 등을 사용하여 혐오감 또는 불쾌감을 주는 행위</List>
        <List>
          그 밖에 사람 또는 동물 등에 대한 육체적·정신적 고통 등을 사실적·구체적으로 표현하여 잔혹 또는 혐오감을 주는
          행위
        </List>
      </ListWrapper>
      <br />
      <h3>사회통합 및 사회질서를 저해하는 행위</h3>
      <ListWrapper>
        <List>고인에 대한 별명, 농담, 밈(Meme), 자료, 특수문자, 이모티콘 등 비난, 희화적 표현 등 고인 모독 행위</List>
        <List>도박 등 사행심을 조장하는 행위</List>
        <List>현금, 수표, 증권, 신용 상품 등을 대출, 거래하는 행위</List>
        <List>미신숭배 등 비과학적인 생활태도를 조장하거나 정당화하는 행위</List>
        <List>특정 종교, 종파 또는 종교의식을 비방, 왜곡하거나 교리를 설파 및 전도, 포교하는 행위</List>
        <List>장애인, 노약자 등 사회적인 소외계층을 비하하는 행위</List>
        <List>학교교육 등 교육을 왜곡하여 현저히 교육기풍을 해하는 행위</List>
        <List>
          합리적 이유없이 성별, 종교, 장애, 나이, 사회적 신분, 출신, 인종, 지역, 직업 등을 차별하거나 이에 대한 편견을
          조장하는 행위
        </List>
        <List>자살을 목적으로 하거나 이를 미화, 방조 또는 권유하여 자살 충동을 일으킬 우려가 있는 행위</List>
        <List>
          정당한 사유 없이 정보통신시스템, 데이터 또는 프로그램 등을 훼손·멸실·변경·위조하거나 그 운용을 방해하는 내용의
          행위
        </List>
        <List>
          「청소년 보호법」에 따른 청소년유해매체물로서 상대방의 연령 확인, 표시의무 등 법령에 따른 의무를 이행하지
          아니하고 영리를 목적으로 제공하는 내용의 행위
        </List>
        <List>성매매를 알선, 유도, 조장, 방조하는 행위</List>
        <List>분란 및 갈등을 유도하거나 조장하는 행위</List>
        <List>그 밖에 사회적 혼란을 현저히 야기할 우려가 있는 행위</List>
      </ListWrapper>
      <br />
      <h3>타인의 권리를 침해하는 행위</h3>
      <ListWrapper>
        <List>다른 이용자에게 불쾌감이나 불편함을 주는 행위</List>
        <List>개인정보 유포 등 사생활의 비밀과 자유를 침해할 우려가 현저한 행위</List>
        <List>정당한 권한 없이 타인의 사진, 영상 등을 게재하여 타인의 인격권을 현저히 침해하는 행위</List>
        <List>
          사람을 비방할 목적으로 공공연하게 타인을 모욕하거나 사실 또는 거짓의 사실을 드러내어 타인의 명예를 훼손하는
          행위
        </List>
        <List>
          공포심이나 불안감을 유발하는 부호·문언·음향·화상 또는 영상을 반복적으로 상대방에게 도달하도록 하는 행위
        </List>
        <List>
          정당한 권한없이 타인의 상표 또는 저작물 등을 사용, 실시 또는 매개하는 등 특허권, 상표권, 디자인권, 저작권 등
          지적재산권을 침해하는 행위
        </List>
        <List>내용·결말을 발설하거나, 혐오를 불러일으키거나, 속이거나, 놀라게 하는 행위</List>
        <List>그 밖에 정당한 권한없이 타인의 권리를 침해하는 행위</List>
      </ListWrapper>
      <br />
      <h3>자살예방법에 반하는 자살 및 자해 유발정보 유통 행위</h3>
      <ListWrapper>
        <List>자살 및 자해 동반자 모집 정보</List>
        <List>자살 및 자해에 대한 구체적인 방법을 제시하는 정보</List>
        <List>자살 및 자해를 실행하거나 유도하는 내용을 담은 문서, 사진 또는 동영상 등의 정보</List>
        <List>자살위해물건의 판매 또는 활용에 관한 정보</List>
        <List>기타 명백히 자살 및 자해 유발을 목적으로 하는 정보</List>
      </ListWrapper>
      <br />
      <h3>의료법·약사법·관세법·전파법·외국환거래법 등 법률에 반하는 거래 불가능 품목 거래 행위</h3>
      <ListWrapper>
        <List>주류, 담배, 마약류</List>
        <List>안경, 콘택트렌즈, 의약품, 헌혈증, 건강기능식품, 의료기기</List>
        <List>이미테이션 제품, 저작물 복사본</List>
        <List>청소년유해매체물</List>
        <List>2,000불 이상의 달러/외화</List>
        <List>암표 등 수익 목적의 재판매 행위</List>
        <List>그 외 관련법에 의해 거래가 금지되거나, 온라인을 통해 거래가 금지된 물품</List>
      </ListWrapper>
      <br />
      <h3>악용/오용 행위</h3>
      <ListWrapper>
        <List>익명을 이용한 여론 조작 행위</List>
        <List>신고, 공감, 스크랩 유도 및 악용 행위</List>
        <List>내용 없는 외부 링크 게시, 외부 서비스 이용 강제·유도 등 서비스 이탈 유도 행위</List>
        <List>동일하거나 유사한 문자 및 문구를 하나의 게시물에 반복적으로 입력하는 행위</List>
        <List>동일하거나 유사한 주제의 게시물을 하나 이상의 커뮤니티에 반복적으로 게시하는 행위</List>
        <List>다수의 이용자가 동일하거나 유사한 주제의 게시물을 집단으로 게시하는 행위</List>
        <List>이용자에게 혼란을 주기 위한 목적으로 거짓·허위 정보를 포함한 게시물을 작성하는 행위</List>
        <List>게시판/커뮤니티의 주제에 어울리지 않거나 내부 규칙에 어긋나는 게시물 작성 행위</List>
        <List>각 서비스의 운영 목적 및 성격에 부합하지 않는 게시물 작성 행위</List>
        <List>회사 또는 이에 준하는 자격을 사칭하여 권한을 행사하거나 어떠한 정보를 발설하는 행위</List>
      </ListWrapper>
      <br />
      <h3>비정상적 시스템 이용 행위</h3>
      <ListWrapper>
        <List>오류를 발생시키는 특수문자 및 제목 및 내용이 없는 게시물 작성 행위</List>
        <List>커뮤니티 유출, 시스템 해킹, 게시물 크롤링 등 서비스에 악영향을 주는 행위</List>
        <List>SOPT의 회원이 아닌 이용자가 게시물을 작성하는 행위</List>
        <List>위에 언급된 행위를 간접적으로 또는 유추 가능하도록 행하는 행위</List>
        <List>위에 언급된를 파일, 이미지, 동영상으로 첨부하는 행위</List>
        <List>본인 또는 타인이 행한 금지행위를 인용하는 행위</List>
        <List>타인으로 하여금 위 행위를 행하도록 간접적으로 돕거나 독려하는 행위</List>
        <List>기타 위 행위와 비슷한 목적을 달성하기 위한 행위 일체</List>
      </ListWrapper>
      <br />
      <h3>정치·사회 관련 금지 행위</h3>
      <ListWrapper>
        <List>언론·시민단체 등 관련 단체 옹호, 추천, 반대, 비하 행위</List>
        <List>특정 정당·후보에 대한 지지, 비방, 투표 독려 행위</List>
        <List>다른 이용자를 특정 정치 단체 관련자 및 특정 이념 옹호자로 몰아가는 행위</List>
        <List>다양한 의견을 배척하고 여론을 하나로 수렴하는 행위</List>
        <List>다른 이용자나 게시물에 대한 욕설, 비난, 비꼬는 행위</List>
        <List>기타 정치·사회 관련 갈등을 조장할 수 있는 행위 일체</List>
      </ListWrapper>
      <br />
      <h3>시사·이슈 외 게시판 금지 행위</h3>
      <ListWrapper>
        <List>
          국가기관(정부·공무원), 정치 관련 단체(정치인·정당·시민단체), 언론, 시민단체에 대한 언급 혹은 이와 관련한 행위
        </List>
        <List>정책·외교 또는 정치·정파에 대한 의견, 주장 및 이념, 가치관을 드러내는 행위</List>
        <List>성별, 종교, 인종, 출신, 지역, 직업, 이념 등 사회적 이슈에 대한 언급 혹은 이와 관련한 행위</List>
        <List>위와 같은 내용으로 유추될 수 있는 비유, 은어 사용 행위</List>
      </ListWrapper>
      <br />
      <h3>사전 동의 없는 영리적 홍보 및 판매 관련 금지 행위</h3>
      <ListWrapper>
        <List>
          커뮤니티 이용규칙이 적용되는 서비스 및 기능과 동일하거나 유사한 서비스 및 기능에 대한 직·간접적 홍보
        </List>
        <List>
          바이럴을 목적으로 대외활동, 대리 게시 요청, 계정 공유 등을 통해 여러 게시판에 다발적으로 게시되는 동일한
          주제에 대한 홍보
        </List>
        <List>신용카드, 보험, 의료 광고, 다단계 등 어울리지 않는 대상에 대한 홍보</List>
        <List>성인, 도박, 베팅 사이트 홍보</List>
        <List>계정 판매/공유/양도</List>
      </ListWrapper>
      <br />
      <Divider />
      <br />
      <br />
      <h3>허위사실 유포 및 명예훼손 게시물에 대한 게시 중단 요청</h3>
      <p>
        게시물로 인해 저작권 침해, 명예훼손, 기타 권리 침해를 당했다고 판단되실 경우, 추가적인 권리 침해를 방지하기 위해
        채널톡 문의채널에서 해당 게시물에 대한 게시 중단 요청을 할 수 있습니다. 이후 담당자의 확인을 통해 게시물이
        삭제될 수 있습니다.
      </p>
      <br />
      <h3>전기통신사업법에 따른 불법촬영물 유통 금지</h3>
      <p>
        불법촬영물 등 유해정보를 게재할 경우 전기통신사업법에 따라 게시물 삭제 조치 및 회원 자격이 영구적으로 해지되며,
        관련 법률에 따라 처벌받을 수 있습니다. 불법촬영물, 허위영상물, 아동·청소년 성착취물 등 불법촬영물 등으로
        의심되는 게시물을 발견하셨을 경우, 채널톡 문의채널로 신고해주시기 바랍니다.
      </p>
      <br />
      <h3>기타</h3>
      <p>
        커뮤니티 담당자는 이용자가 커뮤니티 운영 시스템, 금지 행위, 게시물 작성·수정·삭제 규칙 등 커뮤니티 이용규칙을
        숙지하지 않아 발생하는 피해에 대하여 담당자의 고의 또는 중대한 과실이 없는 한 어떠한 책임도 지지 않습니다.
      </p>
      <br />
      <h3>게시물의 저작권과 책임</h3>
      <p>
        회원이 플레이그라운드 커뮤니티에 게시한 게시물의 저작권은 게시자 본인에게 있으며, 서비스에 게시된 정보나 의견은
        담당자의 입장과는 무관합니다.
      </p>
      <p>서비스에 게시한 게시물로 파생되는 문제에 대해서는 전적으로 해당 게시물을 게시한 본인에게 책임이 있습니다.</p>
      <p>
        담당자는 회원이 서비스 내에 게시한 게시물이 타인의 저작권, 프로그램 저작권 등을 침해하더라도 이에 대한
        민∙형사상의 책임을 부담하지 않으며, 만일 이를 이유로 담당자가 타인으로부터 손해배상청구 등 이의 제기를 받은 경우
        해당 회원은 그로 인해 발생한 모든 손해를 부하여야 합니다.
      </p>
      <p>
        타인의 얼굴이 들어간 사진, 내용 등 타 이용자에게 게시글 삭제 혹은 사진삭제를 요청받은 경우, 게시글 작성자의 동의
        없이 게시글이 수정되거나 삭제될 수 있습니다.
      </p>
      <br />
      <h3>게시물의 관리 및 보존</h3>
      <p>
        담당자는 회원이 게시한 서비스 내의 모든 내용물이 게시판 운영원칙에 위배된다고 판단할 경우 해당 게시자에게 사전
        또는 사후 통보 없이 삭제할 수 있으며, 더불어 해당 회원에게는 그 경중에 따라 합당한 제재를 가할 수 있습니다.
      </p>
      <p>
        담당자는 필요에 의해 게시판의 추가 생성과 삭제를 임의로 할 수 있으며, 또한 채널에 저장된 자료에 대해 게재기간
        또는 저장기간을 정할 수 있고, 이를 변경할 수 있습니다.
      </p>
      <p>
        담당자는 필요에 따라 회원이 게시한 게시물을 사전 통지 없이 편집, 이동할 수 있으며, 회원이 해지하거나 적법한
        사유로 해지된 경우 해당 회원이 게시하였던 게시물을 삭제할 수 있습니다.
      </p>
    </div>
  );
};

const SubTitle = styled.h2`
  margin-bottom: 5px;
`;

const ListWrapper = styled.ul`
  padding: 5px 0 0 15px;
  width: 100%;
`;

const List = styled.li`
  list-style-type: initial;
`;

const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 8px 0;
  max-width: 358px;
  max-height: 496px;
`;

const Title = styled.h2`
  padding: 0 8px;
  ${colors.gray10};
  ${textStyles.SUIT_20_B};

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0 16px;
  }
`;

const Detail = styled.div`
  margin-top: 12px;
  padding: 0 8px;
  ${colors.gray10};
  ${fonts.BODY_13_L};
`;

const Overflow = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
`;
