import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  width: 890px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

export const Graphic = styled.div`
  padding-top: 120px;
`;

export const ExtraSpace = styled.div`
  height: 300px;
`;

export const Visualisations = styled.div`
  display: inline-block;
  position: fixed;
  top: 120px;
  z-index: 1;
  margin-left: 0;
`;

export const Title = styled.text`
  font-size: 120px;
  text-anchor: middle;
`;

export const Subtitle = styled.text`
  font-size: 80px;
  text-anchor: middle;
`;

const delay = ({ property, startValue, endValue, time, reverse }: Props) => {
  const keyframe = keyframes`
    0% {
      ${property}: ${reverse ? endValue : startValue};
    }

    100% {
      ${property}: ${reverse ? startValue : endValue};
    }
  `;
  return css`
    animation: ${keyframe} ${time}s forwards;
  `;
};

export const VisGroup = styled.g`
  ${({ activeIndex, startIndex }) =>
    activeIndex < startIndex
      ? delay({
          property: 'visibility',
          startValue: 'visible',
          endValue: 'hidden',
          time: '0.7',
        })
      : ''}
`;
