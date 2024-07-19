import React, { useEffect } from "react";
import styled from "styled-components";

const UploadLabel = styled.label`
  background-color: #007ee5;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #005bb5;
  }
`;

const DropboxChooser = ({ onFilesChosen }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.dropbox.com/static/api/2/dropins.js";
    script.id = "dropboxjs";
    script.setAttribute("data-app-key", "YOUR_DROPBOX_APP_KEY"); // Replace with your Dropbox app key
    document.body.appendChild(script);
  }, []);

  const handleDropboxChooser = () => {
    window.Dropbox.choose({
      success: (files) => {
        onFilesChosen(
          files.map((file) => ({
            name: file.name,
            link: file.link,
          }))
        );
      },
      cancel: () => {},
      linkType: "direct",
      multiselect: true,
      extensions: [".png", ".jpg", ".jpeg"],
    });
  };

  return (
    <UploadLabel onClick={handleDropboxChooser}>
      Dropbox에서 파일 선택
    </UploadLabel>
  );
};

export default DropboxChooser;
