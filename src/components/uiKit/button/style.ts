import styled from 'styled-components';
import { Button } from 'antd';

interface StyledButtonProps {
  width?: string;
  padding?: string;
  fontSize?: string;
}

const StyledButton = styled(Button)<StyledButtonProps>`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  background: transparent !important;
  cursor: pointer;
  position: relative;
  width: ${(props) => (props.width ? props.width : '100%')};
  padding: ${(props) => (props.padding ? props.padding : '1rem')};
  line-height: 1.5rem;
  font-weight: 600;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '1rem')};
  border-radius: 16px;
  cursor: pointer;

  &.ant-btn {
    background: var(--pure-white) !important;
    color: var(--Mokh-Font3);
    padding: 0.5rem 1rem !important;
    border-radius: 1rem;
    &:disabled {
      background: rgba(41, 175, 189, 0.5) !important;
      cursor: no-drop;
    }
  }

  &.ant-btn-text {
    background: var(--pure-white);
    padding: 1rem;
    border: 1px solid var(--gray2);
    color: var(--Medium-Slate-Blue);
    &:disabled {
      background: rgba(41, 175, 189, 0.5) !important;
      cursor: no-drop;
    }
  }

  &.ant-btn-dashed {
    background: var(--pure-white);
    padding: 0.5rem 1rem !important;
    border: 0;
    border: 1px solid var(--gray2);
    &:disabled {
      background: rgba(41, 175, 189, 0.5) !important;
      cursor: no-drop;
    }
  }

  &.ant-btn-primary {
    background: var(--primary) !important;
    color: var(--pure-white) !important;
    border: 1px solid var(--gray2) !important;
    padding: 0.5rem 1rem !important;
    &:disabled {
      background: rgba(41, 175, 189, 0.5) !important;
      cursor: no-drop;
    }
  }

  &.ant-btn-link {
    color: var(--Mokh-Blue) !important;
  }

  span {
    z-index: 3;
    position: relative;
    padding: 0 !important;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto !important;
    bottom: auto !important;
    width: 0;
    height: 0;
    z-index: 1;
    border: none !important;
    transition: 0.6s all;
    background: rgb(100 100 100 / 10%);
    opacity: 1;
    box-shadow: none;
    animation: none;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    border: none !important;
    right: auto !important;
    bottom: auto !important;
    width: 0;
    height: 0;
    z-index: 2;
    transition: 0.6s all;
    background: rgb(100 100 100 / 10%);
    opacity: 1;
    box-shadow: none;
    animation: none;
  }

  &:hover {
    &::before {
      border: none !important;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  &:active {
    &::after {
      border: none !important;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  &:disabled {
    cursor: no-drop;
    &::before {
      display: none !important;
    }
    &::after {
      display: none !important;
    }
  }

  .ant-btn-loading-icon {
    padding: 0;
    * {
      padding: 0;
    }
  }
`;

export { StyledButton };
