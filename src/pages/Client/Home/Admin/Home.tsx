import { useState } from "react";

import { sendEmailAccessTokenIsInvalid } from "@/utils/email";
import GradientButton from "@/components/GradientButton";
import ErrorUI from "@/components/SomethingWentWrong";

const AdminHome = () => {
  const [myFB, setMyFB] = useState<any | null>(window.FB);
  const [token, setToken] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  function fbGetPost() {

    myFB.api(
      "/me",
      "get",
      {
        fields: "id,name,posts.limit(30){link,id,created_time,message}",
        access_token: token,
      },
      function (response: any) {
        if (response.error) {
          setIsError(true);
          sendEmailAccessTokenIsInvalid();
          return;
        }
        updatePosts(response.posts.data);
        // setPosts(response.posts.data);
      }
    );
  }

  function updatePosts(data: any) {
    fetch(import.meta.env.VITE_API_ENDPOINT + "/update-data", {
      method: "PUT",
      body: JSON.stringify(data, null, 2),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (isError) {
    return <ErrorUI />;
  }


  if (!window.FB)
    return (
      <GradientButton
        onClickCB={() => {
            console.log("MyFB", window.FB); 
          setMyFB(window.FB);
          if (!window.FB) {
            setIsError(true);
            sendEmailAccessTokenIsInvalid();
          }
          // console.log("MyFB", window.FB);
          // setIsViewApp(true);
        }}
      />
    );

  

  return (
    <div>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="ACCESS TOKEN"
      />
      <button
        onClick={() => {
          fbGetPost();
        }}
      >
        UPDATE POST
      </button>
    </div>
  );
};

export default AdminHome;
