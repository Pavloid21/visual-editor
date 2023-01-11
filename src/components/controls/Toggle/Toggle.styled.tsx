import styled from 'styled-components';

export const Container = styled.div`
  .toggle {
    position: relative;
    display: flex;

    input[type="checkbox"] {
      position: relative;
      width: 46px;
      height: 20px;
      background: #B3B3B3;
      -webkit-appearance: none;
      border-radius: 20px;
      outline: none;
      transition: .4s;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }

    input:checked[type="checkbox"] {
      background: #E63C32;
    }

    input[type="checkbox"]::before {
      z-index: 2;
      position: absolute;
      content: "";
      left: 2px;
      top: 2px;
      width: 16px;
      height: 16px;
      background: #fff;
      border-radius: 50%;
      transform: scale(1.1);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      transition: .4s;
    }

    input:checked[type="checkbox"]::before {
      left: 28px;
      background: #F09B99;
    }

    label {
      position: absolute;
      color: #fff;
      font-weight: 400;
      font-size: 12px;
      pointer-events: none;
      margin: 0;
      padding: 0;
      display: block;
      height: 18px;
      line-height: 18px;
    }

    .onbtn {
      bottom: 1px;
      left: 5px;
    }

    .ofbtn {
      bottom: 1px;
      right: 4px;
    }

    .noVisible {
      visibility: hidden;
    }
  }
`;