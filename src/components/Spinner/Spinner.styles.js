import styled, { keyframes } from 'styled-components';
import hexToRgba from 'hex-to-rgba';

const rotateKeyframe = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: cetner;
`;

export const Wrapper = styled.div`
  position: relative;
`;

const getBorder = (thick, opaque) => {
  const baseColor = '#fff';
  const color = opaque ? hexToRgba(baseColor, 0.35) : baseColor;
  const thickness = thick ? 5 : 1;
  return `${thickness}px solid ${color}`;
};

export const Spinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: cetner;
  position: relative;
  text-indent: -9999em;
  border-top: ${({ thick }) => getBorder(thick, true)};
  border-right: ${({ thick }) => getBorder(thick, true)};
  border-bottom: ${({ thick }) => getBorder(thick, true)};
  border-left: ${({ thick }) => getBorder(thick, false)};
  transform: translateZ(0);
  animation: ${rotateKeyframe} 0.5s infinite linear;

  &,
  &::after {
    border-radius: 50%;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
  }
`;
