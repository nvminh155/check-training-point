import { useEffect, useState } from "react";

import { dateIsExpiry } from "./utils/checkDateExpiry";

import "./App.css";

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
  createdAt: string;
  shortDesc: string;
};

type TPost = {
  id: string;
  message: string;
  created_time: string;
};

function App() {
  return <NewUI />;
}

const NewUI = () => {
  const [posts, setPosts] = useState<TPost[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_ENDPOINT + "/posts")
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setPosts(res.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  function filter(post: TPost) {
    const { dateExpiry: date }: TMessageExplained = JSON.parse(
      post.message.slice(3)
    );
    const dateExpiry = date.split("/");

    return !dateIsExpiry(`${dateExpiry[1]}/${dateExpiry[0]}/${dateExpiry[2]}`);
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#ffffff]">
      <h1 className="my-gradient-bg select-none px-2 text-center font-bold uppercase drop-shadow-lg max-sm:text-[35px] sm:text-[60px] lg:text-[100px]">
        Find your <br></br>training point
      </h1>

      {isLoading && (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-gray-300 max-sm:text-sm">Đang tải dữ liệu!!!</p>
        </div>
      )}

      {posts.filter((p) => p.message?.startsWith("drl") && filter(p)).length ===
        0 && !isLoading ? (
        <div className="flex flex-1 flex-col justify-center items-center gap-5">
           <img
            alt="no-data"
            src="/no-data.png"
            className="h-[100px] w-[100px]"
          />
          <span className="text-[40px] font-semibold max-sm:text-[30px]">Chưa có hoạt động</span>
         
        </div>
      ) : (
        <div className="xs:grid-cols-1 grid w-full flex-1 gap-10 overflow-y-scroll px-10 pb-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {posts
            .filter((p) => p.message?.startsWith("drl") && filter(p))
            .map((post: TPost) => {
              // console.log(post.message);
              const data: TMessageExplained = JSON.parse(post.message.slice(3));

              return <CardItem key={post.id} data={data} />;
            })}
        </div>
      )}

      <div className="px-5 py-5 text-center opacity-50">
        <span className="font-bold">Lưu ý: </span>
        <span>
          Nếu có bất cứ thắc mắc hoặc có các hoạt động khác có + điểm rèn luyện
          vui lòng liên hệ qua email: <b>ggevrt123zz@gmail.com</b>
        </span>
        <CopyButton />
      </div>
    </div>
  );
};

const CopyButton = () => {
  const [copied, setCopied] = useState(false);
  const email = "ggevrt123zz@gmail.com";
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Reset after 2 seconds
  };

  return (
    <button
      onClick={() => {
        handleCopy();
      }}
    >
      {copied ? (
        "Đã sao chép"
      ) : (
        <img src="/copy.png" alt="copy icon" className="h-[18px] w-[18px]" />
      )}
    </button>
  );
};
interface CardItemProps {
  data: TMessageExplained;
}

const CardItem = ({ data }: CardItemProps) => {
  return (
    <div className="flex h-full max-h-[180px] w-full flex-col rounded-lg bg-white px-5 py-3 shadow-lg transition-transform duration-300 hover:scale-105">
      <p className="text-lg font-semibold">{data.pageName}</p>
      <div className="flex flex-1 flex-col">
        <p className="line-clamp-3 flex-1">{data.shortDesc}</p>
        <a
          target="_blank"
          href={data.url}
          className="mt-auto !text-[16px] font-semibold text-blue-400 underline hover:underline"
        >
          Xem chi tiết
        </a>
      </div>
      <span className="mt-auto text-gray-400">Đăng lúc {data.createdAt}</span>
    </div>
  );
};
export default App;
