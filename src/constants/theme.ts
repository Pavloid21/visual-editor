import {createGlobalStyle} from 'styled-components';
export default createGlobalStyle`
  body {
    background: #FAFAFA;
    text-align: left;
    font-weight: 400;
    line-height: 1.5;
    font-family: Roboto, sans-serif;
  }
  * {
    --background: #f3f3f3;
    --main-color: #F44532;
    --hover-color: #F09B99;
    --active-color: #C72A25;
    --light-orange: #FFEBEE;
    --neo-black: #333333;
    --neo-gray: #E6E6E6;
    --neo-secondary-gray: #8C8C8C;
    --error-text: #BA346A;
    --neo-black: #404040;
    --ctrl-background: #fafafa;
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

  *, ::before, ::after {
    box-sizing: border-box;
  }

  .d-flex {
    display: -ms-flexbox !important;
    display: flex !important;
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

  .left-bar-image {
    &.active {
      & path {
        fill: var(--main-color);
      };
    }
  }

  .rst__tree {
    font-size: 16px;
    line-height: 20px;
  }

  [data-test-id="virtuoso-item-list"] {
    & > div:first-child {
      & .dropdown {
        bottom: -32px;
      }
    }
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

  .actions_tab {
    .tab_active {
      border-bottom: 2px solid #333333;
    }
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
