import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Locations = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const ClassTypes = styled.div`
  display: flex;
  justify-content: center;
`;

const getCursor = ({ disabled }: any) => (disabled ? 'not-allowed' : 'pointer');
const getColor = ({ active }: any) => (active ? '#a71b52' : '#fff');
const getOpacity = ({ disabled }: any) => (disabled ? 0.4 : 1);
export const Button = styled.button<{ active: boolean; disabled: boolean }>`
  height: 30px;
  font-size: 16px;
  border: 1px solid ${getColor};
  text-transform: uppercase;
  font-family: soin_sans_neueroman, sans-serif;
  background: none;
  white-space: nowrap;
  cursor: ${getCursor};
  color: ${getColor};
  opacity: ${getOpacity};
`;
