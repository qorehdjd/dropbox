import React, { useEffect, useState } from "react";
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
  const [isDropboxLoaded, setIsDropboxLoaded] = useState(false);

  useEffect(() => {
    if (document.getElementById("dropboxjs")) {
      setIsDropboxLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.dropbox.com/static/api/2/dropins.js";
    script.id = "dropboxjs";
    script.setAttribute("data-app-key", "l766feo7114b4gv"); // Replace with your Dropbox app key
    script.onload = () => setIsDropboxLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handleDropboxChooser = () => {
    if (!isDropboxLoaded) {
      console.error("Dropbox Chooser script not loaded.");
      return;
    }

    if (window.Dropbox && window.Dropbox.choose) {
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
    } else {
      console.error("Dropbox Chooser API is not available.");
    }
  };

  return (
    <UploadLabel onClick={handleDropboxChooser}>
      Dropbox에서 파일 선택
    </UploadLabel>
  );
};

export default DropboxChooser;
