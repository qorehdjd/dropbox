import React from "react";
import styled from "styled-components";

const UploadContainer = styled.div`
  margin: 20px;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #45a049;
  }
`;

const FileUpload = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    onFileUpload(uploadedFiles);
  };

  return (
    <UploadContainer>
      <FileInput type="file" id="file" multiple onChange={handleFileChange} />
      <UploadLabel htmlFor="file">파일 선택</UploadLabel>
    </UploadContainer>
  );
};

export default FileUpload;
