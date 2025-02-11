import { useEffect, useState } from "react";

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
};

type TPost = {
  id: string;
  message: string;
  created_time: string;
};

function App() {
  const [posts, setPosts] = useState<TPost[] | []>([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_ENDPOINT + "/posts")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      });
  }, []);

  function filter(post: TPost) {
    const { dateExpiry: date }: TMessageExplained = JSON.parse(
      post.message.slice(3)
    );
    const dateExpiry = date.split("/");

    return !dateIsExpiry(`${dateExpiry[1]}/${dateExpiry[0]}/${dateExpiry[2]}`);
  }

  return (
    <>
      <div></div>

      <div
        id="posts"
        className="mx-auto mt-16 flex flex-col items-center gap-8 px-10 pb-10"
      >
        <p className="max-sm:text-sm">
          <span className="font-semibold">Lưu ý:</span> Nhấp vào đường link để
          xem bài viết
        </p>
        <p className="text-gray-300 max-sm:text-sm">
          Vui lòng kiên nhẫn chờ đợi trông giây lát!!!
        </p>
        <p className="max-w-[300px]">
          Nếu có bất cứ hoạt động nào có điểm rèn luyện mà bạn biết vui lòng
          liên hệ qua email: <b>ggevrt123zz@gmail.com</b>
        </p>

        <p className="text-xl font-semibold max-sm:text-lg">
          Danh sách hoạt động khả thi:
        </p>
        {posts.filter((p) => p.message?.startsWith("drl") && filter(p))
          .length === 0 && <div>Chưa có dữ liệu</div>}
        {posts
          .filter((p) => p.message?.startsWith("drl") && filter(p))
          .map((post: TPost) => {
            // console.log(post.message);
            const { url, pageName }: TMessageExplained = JSON.parse(
              post.message.slice(3)
            );

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

export default App;
