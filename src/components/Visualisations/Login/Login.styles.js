// @flow

import styled from 'styled-components';

const getOpacity = ({ visible }) => visible ? 1 : 0;

export const Container = styled.div`
  opacity: ${getOpacity};
  transition: opacity 600ms;

  & input {
    color: #fff !important;
  }

  & input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active  {
      color: #fff !important;
      transition: background-color 5000s ease-in-out 0s;
  }
`;

export const SpinnerWrapper = styled.div`
  margin-top: 20px;
`;