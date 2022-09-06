import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 12px;
  .drop-file-input {
    background: var(--ctrl-background);
    border: 1px dashed rgba(66, 77, 120, 0.3);
    border-radius: 6px;
    position: relative;
    padding: 23px 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .drop-file-input input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .drop-file-input:hover,
  .drop-file-input.dragover {
    opacity: 0.6;
  }

  .drop-file-input__label {
    align-items: center;
    color: var(--neo-black);
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .drop-file-input__label img {
    width: 100px;
  }

  .drop-file-preview {
    margin-top: 30px;
  }

  .drop-file-preview p {
    font-weight: 500;
  }

  .drop-file-preview__title {
    margin-bottom: 20px;
  }

  .drop-file-preview__item {
    position: relative;
    display: flex;
    margin-bottom: 10px;
    background-color: var(--ctrl-background);
    padding: 15px;
    border-radius: 20px;
  }

  .drop-file-preview__item__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & > p {
      font-weight: 400;
      margin-bottom: 0;
    }
    & > p:last-child {
      font-size: 12px;
    }
  }

  .drop-file-preview__item__del {
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .drop-file-preview__item:hover .drop-file-preview__item__del {
    opacity: 1;
  }
`;
