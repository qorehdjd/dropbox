import React from "react";
import styled from "styled-components";

const ListContainer = styled.div`
  margin: 20px;
`;

const FileItem = styled.div`
  background-color: #f1f1f1;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
`;

const FileList = ({ files }) => {
  return (
    <ListContainer>
      {files.length > 0 && <h2>파일 목록</h2>}
      {files.map((file, index) => (
        <FileItem key={index}>{file.name}</FileItem>
      ))}
    </ListContainer>
  );
};

export default FileList;
