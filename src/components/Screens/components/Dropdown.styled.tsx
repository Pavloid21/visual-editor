import styled from 'styled-components';

export const Container = styled.div`
  & .menu {
    position: relative;

    & .dropdown {
      position: absolute;
      bottom: 0;
      right: 18px;
      display: none;
      border-radius: 4px;
      box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.15);
      border: 1px solid var(--neo-gray);
      z-index: 5;
      width: 150px;
      height: 72px;

      & > div {
        cursor: pointer;
        display: flex;
        align-items: center;
        position: relative;
        svg {
          margin-right: 8px;
        }
        margin: 0;
        padding: 8px 10px;
        & p {
          margin: 0;
          padding: 0;
        }

        &.active {
          & svg {
            fill: #ffffff;
          }
        }
      }

      & > div:hover {
        background: var(--main-color);
        color: #ffffff;

        & > div svg {
          fill: #ffffff;
        }
      }
    }

    & .dots {
      padding: 0 7px;
      cursor: pointer;
    }
  }

  & .menu:hover .dropdown {
    display: block;
  }
`;
