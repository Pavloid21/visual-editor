import React, {useRef, useState} from 'react';
import {ReactComponent as Import} from 'assets/import.svg';
import {ReactComponent as Remove} from 'assets/circle_cross.svg';
import {Label} from '../Input';
import {Container} from './FileInput.styled';
import {FileInputProps} from './types';

export const FileInput: React.FC<FileInputProps> = ({label, placeholder, onFileChange, ...props}) => {
  const [fileList, setFileList] = useState<File[]>([]);

  const inputRef = useRef(null);
  // @ts-ignore
  const onDragEnter = () => inputRef && inputRef.current.classList.add('dragover');
  // @ts-ignore
  const onDragLeave = () => inputRef && inputRef.current.classList.remove('dragover');
  // @ts-ignore
  const onDrop = () => inputRef && inputRef.current.classList.remove('dragover');

  const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    const newFile: File = e.target.files[0];
    if (newFile) {
      const updatedList: File[] = props.multiple ? [...fileList, newFile] : [newFile];
      setFileList(updatedList);
      onFileChange(updatedList);
    }
  };

  const fileRemove = (file: File) => {
    const updatedList: File[] = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    onFileChange(updatedList);
  };

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <div
        ref={inputRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <Import />
          {placeholder && <p>{placeholder}</p>}
        </div>
        <input {...props} type="file" value="" onChange={onFileDrop} />
      </div>
      {fileList.length ? (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Ready to upload</p>
          {fileList.map((item, index) => (
            <div key={index} className="drop-file-preview__item">
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
                <p>{item.size}B</p>
              </div>
              <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>
                <Remove />
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </Container>
  );
};
