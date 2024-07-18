import React, { useState } from "react";
import axios from "axios";
import queryString from "query-string";
import DropboxChooser from "react-dropbox-chooser";

const CLIENT_ID = "l766feo7114b4gv"; // Dropbox 애플리케이션의 클라이언트 ID
const REDIRECT_URI = "http://localhost:3000/callback"; // Dropbox 애플리케이션에서 설정한 리디렉션 URI

const DropboxPhotoPicker = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleLogin = () => {
    // OAuth 인증 시작
    const authUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}`;
    window.location.href = authUrl;
  };

  // 콜백 처리
  React.useEffect(() => {
    const params = queryString.parse(window.location.hash);
    if (params.access_token) {
      setAccessToken(params.access_token);
    }
  }, []);

  const handleDropboxChooserSuccess = (files) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedPhoto({
        name: file.name,
        link: file.link,
        thumbnailLink: file.thumbnailLink,
      });
    }
  };

  const handleDropboxChooserCancel = () => {
    console.log("Dropbox Chooser was canceled.");
  };

  return (
    <div>
      {accessToken ? (
        <div>
          <h2>Welcome to Dropbox Photo Picker!</h2>
          <DropboxChooser
            appKey={CLIENT_ID}
            success={handleDropboxChooserSuccess}
            cancel={handleDropboxChooserCancel}
            multiselect={false}
            extensions={[".jpg", ".jpeg", ".png", ".gif"]}
          >
            <button>Select a Photo from Dropbox</button>
          </DropboxChooser>
          {selectedPhoto && (
            <div style={{ marginTop: "20px" }}>
              <h3>Selected Photo:</h3>
              <p>Name: {selectedPhoto.name}</p>
              <p>
                Link:{" "}
                <a
                  href={selectedPhoto.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedPhoto.link}
                </a>
              </p>
              <img
                src={selectedPhoto.thumbnailLink}
                alt="Thumbnail"
                style={{ maxWidth: "100%", maxHeight: "300px" }}
              />
            </div>
          )}
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Dropbox</button>
      )}
    </div>
  );
};

export default DropboxPhotoPicker;
