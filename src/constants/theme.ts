import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
  body {
    background: #FAFAFA;
  }
  * {
    --background: #f3f3f3;
    --main-color: #F44532;
    --hover-color: #F09B99;
    --active-color: #C72A25;
    --light-orange: #FFEBEE;
    --neo-black: #333333;
    --neo-gray: #E6E6E6;
    font-family: Roboto, sans-serif !important;
    font-size: 16px;
  }

  *::-webkit-scrollbar {
    width: 4px;
  }

  *::-webkit-scrollbar-track {
    background-color: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background: #E6E6E6;
    border-radius: 2px;
  }

  .icon {
    border-radius: 4px;
    &.active {
      background-color: var(--main-color);
      & path {
        fill: #FFFFFF;
      }
    }
    &:hover {
      cursor: pointer;
      background-color: var(--light-orange);
      & path {
        fill: #333333;
      }
    }
    &:active {
      background-color: var(--active-color);
      & path {
        fill: #FFFFFF;
      }
    }
  }

  .rst__tree {
    font-size: 16px;
    line-height: 20px;
  }

  .node_selected {
    background-color: var(--light-orange);
  }

  .node {
    padding: 4px;
    border-radius: 4px;
  }

  .tab_active {
    color: #333333 !important;
  }

  pre {
    background: none !important;
  }

  .rstcustom__row {
    width: 100%;
    & > div {
      & > div:first-child {
        display: none;
      }
    }
  }
`;
