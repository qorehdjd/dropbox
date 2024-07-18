import React, { useEffect } from "react";

const DropboxChooserComponent = () => {
  const APP_KEY = "l766feo7114b4gv"; // Dropbox 애플리케이션의 클라이언트 ID

  useEffect(() => {
    // Dropbox Chooser 스크립트 로드
    const script = document.createElement("script");
    script.src = "https://www.dropbox.com/static/api/2/dropins.js";
    script.id = "dropboxjs";
    script.setAttribute("data-app-key", APP_KEY);
    script.async = true;
    document.body.appendChild(script);

    // Clean up function to remove script from DOM when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openChooser = () => {
    // Chooser를 열기 위해 Dropbox.choose 함수 호출
    window.Dropbox.choose({
      success: (files) => {
        console.log("Files chosen:", files);
        alert("Here's the file link: " + files[0].link);
        // 선택된 파일에 대한 추가 처리 로직을 여기에 추가할 수 있습니다.
      },
      cancel: () => {
        console.log("Chooser was canceled");
      },
      linkType: "preview", // 파일 링크 유형 설정 (preview 또는 direct)
      multiselect: false, // 단일 파일 선택만 가능하도록 설정
      extensions: [".pdf", ".doc", ".docx"], // 허용할 파일 확장자 설정
      folderselect: false, // 폴더 선택 기능 활성화 여부
      sizeLimit: 1024, // 파일 크기 제한 설정 (바이트 단위)
    });
  };

  return (
    <div>
      <h2>Welcome to Dropbox Chooser Example!</h2>
      <button onClick={openChooser}>Open Dropbox Chooser</button>
    </div>
  );
};

export default DropboxChooserComponent;
