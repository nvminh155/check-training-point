import React, { useEffect, useState } from "react";

import ErrorUI from "./components/SomethingWentWrong";
import { dateIsExpiry } from "./utils/checkDateExpiry";

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
  type FB = any;
}

type TMessageExplained = {
  url: string;
  pageName: string;
  dateExpiry: string;
}

type TPost = {
  id: string;
  message: string;
  created_time: string;
};

const sendEmailAccessTokenIsInvalid = () => {
  const templateParams = {
    from_name: "CHECK_TRAINING_POINT",
    message: "CHECK RIGHT NOW!",
    to_name: "ADMIN",
  };

  const data = {
    service_id: import.meta.env.VITE_EMAIL_SERVICE_ID,
    template_id: import.meta.env.VITE_EMAIL_TEMPLATE_ID,
    user_id: import.meta.env.VITE_EMAIL_PUBLIC_KEY,
    template_params: templateParams,
  };

  fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    // console.log("EMAIL SEND", res);
  });
};

function App() {
  const [myFB, setMyFB] = useState<any | null>(null);
  // const [isViewApp, setIsViewApp] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [posts, setPosts] = useState<TPost[] | []>([]);

  useEffect(() => {
    if (myFB) get();
  }, [myFB]);

  function get() {
    const token = import.meta.env.VITE_FB_ACCESS_TOKEN;

    myFB.api(
      "/me",
      "get",
      {
        fields: "id,name,email,posts.limit(30){link,id,created_time,message}",
        access_token: token,
      },
      function (response: any) {
        if (response.error) {
          setIsError(true);
          sendEmailAccessTokenIsInvalid();
          return;
        }
        setPosts(response.posts.data);
      }
    );
  }

  function filter(post: TPost) {
    const {dateExpiry: date}: TMessageExplained = JSON.parse(post.message.slice(3));
    const dateExpiry = date.split("/");

    return (
      !dateIsExpiry(`${dateExpiry[1]}/${dateExpiry[0]}/${dateExpiry[2]}`)
    );
  }

  if (isError) {
    return <ErrorUI />;
  }

  if (!window.FB)
    return (
      <GradientButton
        onClickCB={() => {
          setMyFB(window.FB);
          if(!window.FB) {
            setIsError(true);
            sendEmailAccessTokenIsInvalid();
          }
          // console.log("MyFB", window.FB);
          // setIsViewApp(true);
        }}
      />
    );

  return (
    <>
      <div></div>

      <div id="posts" className="mx-auto flex flex-col items-center mt-16 gap-8 px-10 pb-10">
        <p className="max-sm:text-sm"><span className="font-semibold ">Lưu ý:</span> Nhấp vào đường link để xem bài viết</p>
        <p className="text-gray-300 max-sm:text-sm">Vui lòng kiên nhẫn chờ đợi trông giây lát!!!</p>
        <p className="max-w-[300px]">Nếu có bất cứ hoạt động nào có điểm rèn luyện mà bạn biết vui lòng liên hệ qua email: <b>ggevrt123zz@gmail.com</b>
        </p>

        <p className="font-semibold text-xl max-sm:text-lg">Danh sách hoạt động khả thi:</p>
        {posts
          .filter((p) => p.message?.startsWith("drl") && filter(p))
          .map((post: TPost) => {
            // console.log(post.message);
            const {url, pageName}: TMessageExplained = JSON.parse(post.message.slice(3));

            return (
              <div key={post.id} className="max-sm:text-sm">
                <h2 className="font-semibold">{pageName}</h2>
                <a
                  target="_blank"
                  href={url}
                  className="hover:underline hover:underline-offset-2"
                >
                  {url}
                </a>
                {/* <p>{post.created_time}</p> */}
              </div>
            );
          })}
      </div>
    </>
  );
}

interface GradientButtonProps {
  onClickCB?: () => void;
}
const GradientButton = ({ onClickCB }: GradientButtonProps) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const ubsub = setTimeout(() => {
      if (ref?.current) {
        ref.current.click();
      }
    }, 2000);

    return () => {
      clearTimeout(ubsub);
    };
  }, []);

  return (
    <button
      ref={ref}
      className=" transform rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg transition-transform focus:outline-none focus:ring-2 focus:ring-purple-300"
      onClick={() => {
        if (onClickCB) onClickCB();
      }}
    >
      VUI LÒNG ĐỢI TÍ
    </button>
  );
};

export default App;
