import React, { useState } from "react";
import styled from "styled-components";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import ConvertOptions from "./components/ConvertOptions";
import DropboxChooser from "./components/DropboxChooser";
import GoogleDrivePicker from "./components/GoogleDrivePicker";

const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  background-color: #282c34;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 1.5em;
`;

const App = () => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (uploadedFiles) => {
    setFiles([...files, ...uploadedFiles]);
  };

  const handleAddFiles = (newFiles) => {
    setFiles([...files, ...newFiles]);
  };

  return (
    <AppContainer>
      <Header>
        <Title>Convertio Clone</Title>
      </Header>
      <FileUpload onFileUpload={handleFileUpload} />
      <DropboxChooser onFilesChosen={handleAddFiles} />
      <GoogleDrivePicker onFilesChosen={handleAddFiles} />
      <FileList files={files} />
      <ConvertOptions />
    </AppContainer>
  );
};

export default App;
