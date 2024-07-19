import React, { useEffect } from "react";
import styled from "styled-components";

const UploadLabel = styled.label`
  background-color: #db4437;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #c23321;
  }
`;

const GoogleDrivePicker = ({ onFilesChosen }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => handleClientLoad();
    document.body.appendChild(script);
  }, []);

  const handleClientLoad = () => {
    window.gapi.load("client:auth2", initClient);
  };

  const initClient = () => {
    window.gapi.client
      .init({
        apiKey: "AIzaSyA49muLeouNncHAR9vW2TDAMQ7NgiopHwE", // Replace with your API key
        clientId:
          "296413793089-ovrgub7ppb03lp3ruabvoruqja3odi2u.apps.googleusercontent.com", // Replace with your client ID
        scope: "https://www.googleapis.com/auth/drive.readonly",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
        ],
      })
      .then(() => {
        console.log("winddd", window.gapi);
        window.gapi.auth2.getAuthInstance().signIn();
      });
  };

  const createPicker = () => {
    const google = window.google;
    const oauthToken = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse().access_token;

    const picker = new google.picker.PickerBuilder()
      .addView(google.picker.ViewId.DOCS_IMAGES)
      .setOAuthToken(oauthToken)
      .setDeveloperKey("AIzaSyA49muLeouNncHAR9vW2TDAMQ7NgiopHwE") // Replace with your API key
      .setCallback(pickerCallback)
      .build();
    picker.setVisible(true);
  };

  const pickerCallback = (data) => {
    if (data.action === window.google.picker.Action.PICKED) {
      const files = data.docs.map((doc) => ({
        name: doc.name,
        link: doc.url,
      }));
      onFilesChosen(files);
    }
  };

  return (
    <UploadLabel onClick={createPicker}>Google Drive에서 파일 선택</UploadLabel>
  );
};

export default GoogleDrivePicker;
