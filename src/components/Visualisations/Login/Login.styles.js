// @flow

import styled from 'styled-components';

const getOpacity = ({ visible }) => visible ? 1 : 0;

export const Container = styled.div`
  opacity: ${getOpacity};
  transition: opacity 600ms;
`;
