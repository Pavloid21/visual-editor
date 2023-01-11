import styled from 'styled-components';

export const BusinessContainer = styled.div`
    & .businessForm {
      height: 535px;
      overflow-y: auto;
      padding: 0 24px 10px 24px;
      z-index: 5;

      & > form {
        font-weight: 400;

        .attempt {
          display: flex;

          input {
            height: 36px;
            width: 112px;
          }
        }

        .dropdownSelect {
          position: relative;

          & + .login {
            z-index: 7;
          }

          & + .pincode {
            z-index: 5;
          }

          div[class$="placeholder"] {
            font-size: 12px;
          }
        }

        & > div {
          margin-top: 12px;
        }
      }
    }

  .toggles {
    display: flex;

    .toggle {
      display: flex;

      p {
        font-size: 14px;
        color: #8C8C8C;
        margin: 0 16px 0 14px;
      }
    }
  }


`;
