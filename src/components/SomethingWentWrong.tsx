import { useState } from "react";

const ErrorUI = () => {
  const [copied, setCopied] = useState(false);
  const email = "ggevrt123zz@gmail.com";
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Reset after 2 seconds
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-6 text-center shadow-lg mx-5">
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          Lỗi không mong muốn
        </h2>
        <p className="mt-2 text-gray-600">
          Có một số lỗi đã xảy ra trong quá trình tải dữ liệu
        </p>
        <p>
        Gửi báo cáo qua email: {email}
        </p>

        <button
          onClick={handleCopy}
          className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white shadow-md transition hover:bg-red-600"
          disabled={copied}
        >
          {copied ? (
            'Đã sao chép'
          ) : (
            'Sao chép email'
          )}
        </button>
      </div>
    </div>
  );
};

export default ErrorUI;
