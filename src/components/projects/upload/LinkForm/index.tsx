import styled from '@emotion/styled';
import { FC } from 'react';
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import FormItem from '@/components/common/form/FormItem';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Text from '@/components/common/Text';
import { DEFAULT_LINK } from '@/components/projects/upload/LinkForm/constants';
import useMediaQuery from '@/hooks/useMediaQuery';
import { ProjectUploadForm } from '@/pages/projects/upload/legacy';
import IconTrash from '@/public/icons/icon-trash.svg';
import { colors } from '@sopt-makers/colors';
import { MOBILE_MAX_WIDTH, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const LINK_TITLES = ['website', 'googlePlay', 'appStore', 'github', 'instagram', 'media'] as const;

const LinkForm: FC = () => {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ProjectUploadForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });
  const links = useWatch({
    name: 'links',
    control,
  });
  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);

  const onEdit = (index: number) => {
    setValue(`links.${index}.isEdit`, true);
  };
  const onAppend = () => {
    append(DEFAULT_LINK);
  };
  const onComplete = (index: number) => {
    setValue(`links.${index}.isEdit`, false);
  };
  const onRemove = (index: number) => {
    if (!links) {
      return;
    }
    setValue(
      'links',
      links.filter((_, linkIndex) => linkIndex !== index),
    );
  };

  return (
    <>
      {!isMobile ? (
        <StyledUl>
          {fields.map((field, index) => (
            <StyledLi key={field.id}>
              <StyledSelect placeholder='선택' {...register(`links.${index}.linkTitle`)}>
                {LINK_TITLES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </StyledSelect>
              <Controller
                control={control}
                name={`links.${index}.linkUrl`}
                render={({ field: { value, onChange, ...props } }) => (
                  <FormItem errorMessage={errors?.links?.[index]?.linkUrl?.message}>
                    <StyledInput
                      error={!!errors?.links?.[index]?.linkUrl}
                      placeholder='https://'
                      value={value}
                      onChange={onChange}
                      {...props}
                      onBlur={() => {
                        if (value && !/^https?:\/\//i.test(value)) {
                          onChange('https://' + value);
                        }
                      }}
                    />
                  </FormItem>
                )}
              />
              <IconDeleteWrapper>
                <IconTrash onClick={() => remove(index)} />
              </IconDeleteWrapper>
            </StyledLi>
          ))}
          <StyledButton type='button' onClick={() => append(DEFAULT_LINK)}>
            + 추가
          </StyledButton>
        </StyledUl>
      ) : (
        <MobileUl>
          {links?.map((link, index) => (
            <StyledLi key={index}>
              {!link.isEdit ? (
                <MobileLinkItem onClick={() => onEdit(index)}>
                  <Text typography='SUIT_12_M' color={colors.gray100}>
                    {link.linkTitle}
                  </Text>
                  <Text typography='SUIT_12_M' color={colors.gray100}>
                    {link.linkUrl}
                  </Text>
                </MobileLinkItem>
              ) : (
                <MobileLinkApplyForm>
                  <MobileLinkSelect>
                    <MobileSelect placeholder='선택' {...register(`links.${index}.linkTitle`)}>
                      {LINK_TITLES.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </MobileSelect>
                    <Controller
                      control={control}
                      name={`links.${index}.linkUrl`}
                      render={({ field: { value, onChange, ...props } }) => (
                        <FormItem errorMessage={errors?.links?.[index]?.linkUrl?.message}>
                          <MobileLink
                            error={!!errors?.links?.[index]?.linkUrl}
                            placeholder='https://'
                            value={value}
                            onChange={onChange}
                            {...props}
                            onBlur={() => {
                              if (value && !/^https?:\/\//i.test(value)) {
                                onChange('https://' + value);
                              }
                            }}
                            type='url'
                          />
                        </FormItem>
                      )}
                    />
                  </MobileLinkSelect>
                  <MobileApplyFormFooter>
                    <IconTrash onClick={() => onRemove(index)} />
                    <MobileCompleteButton type='button' onClick={() => onComplete(index)}>
                      완료
                    </MobileCompleteButton>
                  </MobileApplyFormFooter>
                </MobileLinkApplyForm>
              )}
            </StyledLi>
          ))}
          <MobileAddButton type='button' onClick={onAppend}>
            추가하기
          </MobileAddButton>
        </MobileUl>
      )}
    </>
  );
};

export default LinkForm;

const StyledUl = styled.ul``;
const StyledLi = styled.li`
  display: flex;
  gap: 10px;

  &:not(:first-of-type) {
    margin-top: 10px;
  }
  @media ${MOBILE_MEDIA_QUERY} {
    display: block;
  }
`;

const StyledSelect = styled(Select)`
  align-self: flex-start;
  width: 200px;
`;

const StyledInput = styled(Input)`
  width: 365px;
`;

const IconDeleteWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 14px 0 4px;
  cursor: pointer;
  width: 42px;
  height: 42px;
`;

const StyledButton = styled.button`
  align-self: start;
  margin: 8px 0 0 20px;
  cursor: pointer;
  color: ${colors.gray100};

  ${textStyles.SUIT_16_M};
`;

// for mobile
const MobileUl = styled.ul``;
const MobileLinkItem = styled.div`
  display: flex;
  gap: 19px;
  border-radius: 6px;
  background-color: ${colors.black40};
  padding: 15px 20px;
`;

const MobileLinkApplyForm = styled.div`
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 12px;
`;

const MobileLinkSelect = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  height: 42px;
`;

const MobileSelect = styled(Select)`
  ${textStyles.SUIT_14_M};

  align-self: flex-start;
  border: 1px solid ${colors.black40};
  width: 135px;
`;

const MobileLink = styled(Input)`
  ${textStyles.SUIT_14_M};

  & > input {
    border: 1px solid ${colors.black40};
  }
`;

const MobileApplyFormFooter = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 15px;
`;

const MobileCompleteButton = styled.button`
  border-radius: 4px;
  background-color: ${colors.black40};
  padding: 6.5px 30px;
  color: ${colors.gray100};

  ${textStyles.SUIT_14_M};
`;

const MobileAddButton = styled.button`
  margin-top: 12px;
  border: 1px solid ${colors.black40};
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 14px 20px;
  width: 100%;
`;
