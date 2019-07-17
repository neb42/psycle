// @flow

import styled from 'styled-components';

export const Container = styled.form`
  & input {
    color: #fff !important;
  }

  & input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    color: #fff !important;
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: #fff;
  }
`;

export const SpinnerWrapper = styled.div`
  margin-top: 20px;
`;
