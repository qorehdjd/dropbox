import React, { useEffect, useState } from "react";
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
  const [isGapiLoaded, setIsGapiLoaded] = useState(false);

  useEffect(() => {
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
          setIsGapiLoaded(true);
          const authInstance = window.gapi.auth2.getAuthInstance();
          if (authInstance.isSignedIn.get()) {
            console.log("User already signed in.");
          } else {
            authInstance.signIn();
          }
        });
    };

    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = handleClientLoad;
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.getElementById("gapi-script");
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const createPicker = () => {
    if (!isGapiLoaded) {
      console.error("GAPI not loaded");
      return;
    }

    const oauthToken = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse().access_token;

    const picker = new window.google.picker.PickerBuilder()
      .addView(window.google.picker.ViewId.DOCS_IMAGES)
      .setOAuthToken(oauthToken)
      .setDeveloperKey("AIzaSyA49muLeouNncHAR9vW2TDAMQ7NgiopHwE") // Replace with your API key
      .setCallback(pickerCallback)
      .build();
    picker.setVisible(true);
  };

  const pickerCallback = (data) => {
    if (
      data[window.google.picker.Response.ACTION] ===
      window.google.picker.Action.PICKED
    ) {
      const files = data[window.google.picker.Response.DOCUMENTS].map(
        (doc) => ({
          name: doc[window.google.picker.Document.NAME],
          link: doc[window.google.picker.Document.URL],
        })
      );
      onFilesChosen(files);
    }
  };

  return (
    <UploadLabel onClick={createPicker}>Google Drive에서 파일 선택</UploadLabel>
  );
};

export default GoogleDrivePicker;
