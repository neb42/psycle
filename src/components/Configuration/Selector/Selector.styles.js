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

const getTooltipCSS = ({ hasTooltip }) => hasTooltip ? css`
  /*== start of code for tooltips ==*/
  position: relative;

  /*== common styles for both parts of tool tip ==*/
  &::before,
  &::after {
    left: 50%;
    opacity: 0;
    position: absolute;
    z-index: -100;
  }

  &:hover::before,
  &:focus::before,
  &:hover::after,
  &:focus::after {
    opacity: 1;
    transform: scale(1) translateY(0);
    z-index: 100; 
  }

  /*== pointer tip ==*/
  &::before {
    border-style: solid;
    border-width: 1em 0.75em 0 0.75em;
    border-color: #3E474F transparent transparent transparent;
    bottom: 100%;
    content: "";
    margin-left: -0.5em;
    transition: all .65s cubic-bezier(.84,-0.18,.31,1.26), opacity .65s .5s;
    transform:  scale(.6) translateY(-90%);
  } 

  &:hover::before,
  &:focus::before {
    transition: all .65s cubic-bezier(.84,-0.18,.31,1.26) .2s;
  }


  /*== speech bubble ==*/
  &::after {
    background: #3E474F;
    border-radius: .25em;
    bottom: 180%;
    color: #EDEFF0;
    content: attr(data-tip);
    margin-left: -8.75em;
    padding: 1em;
    transition: all .65s cubic-bezier(.84,-0.18,.31,1.26) .2s;
    transform:  scale(.6) translateY(50%);  
    width: 17.5em;
  }

  &:hover::after,
  &:focus::after  {
    transition: all .65s cubic-bezier(.84,-0.18,.31,1.26);
  }

  @media (max-width: 760px) {
    &::after { 
      font-size: .75em;
      margin-left: -5em;
      width: 10em; 
    }
  }
` : '';
const getCursor = ({ disabled }) => disabled ? 'not-allowed' : 'pointer';
const getColor = ({ active }) => active ? '#a71b52' : '#fff';
const getOpacity = ({ disabled }) => disabled ? 0.4 : 1;
export const Button = styled.button`
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
  ${getTooltipCSS}
`;