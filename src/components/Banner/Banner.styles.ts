import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100vh);
  width: calc(100vw);
`;

export const Image = styled.img`
  height: 100%;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  position: relative;
  bottom: 70%;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.span`
  color: #fff;
  font-size: 36px;
  text-transform: uppercase;
  font-family: soin_sans_neueroman, sans-serif;
`;

export const Subtitle = styled.span`
  color: #fff;
  font-family: soin_sans_neueroman, sans-serif;
  font-size: 26px;
`;
