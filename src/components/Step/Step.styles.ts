import styled from 'styled-components';

const getOpacity = ({
  isActive
}: any) => (isActive ? 1 : 0.1);

export const Step = styled.section`
  margin-bottom: 200px;
  font-family: soin_sans_neueroman, sans-serif;
  font-size: 16px;
  line-height: 23px;
  color: #fff;
  opacity: ${getOpacity};
`;

export const Title = styled.div`
  font-family: soin_sans_neueroman, sans-serif;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 2px;
  color: #fff;
  line-height: 1.2em;
`;
