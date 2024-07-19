import { useEffect } from "react";
import useDrivePicker from "react-google-drive-picker";

function GoogleDrivePicker() {
  const [openPicker, authResponse] = useDrivePicker();
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "296413793089-ovrgub7ppb03lp3ruabvoruqja3odi2u.apps.googleusercontent.com",
      developerKey: "AIzaSyA49muLeouNncHAR9vW2TDAMQ7NgiopHwE",
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        }
        console.log(data);
      },
    });
  };

  return (
    <div>
      <button onClick={() => handleOpenPicker()}>Open Picker</button>
    </div>
  );
}

export default GoogleDrivePicker;
