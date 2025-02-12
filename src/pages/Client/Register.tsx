import React from "react";

const Register = () => {
  const [email, setEmail] = React.useState("");



  return (
    <div className="my-3 flex w-full max-w-[325px] gap-2 px-3 max-sm:max-w-full">
      <input
        type="email"
        placeholder="Email"
        className="flex-1 rounded-full border px-3 py-1 outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="rounded-full bg-blue-400 px-3 font-semibold text-white" onClick={() => {
        fetch(import.meta.env.VITE_API_ENDPOINT + "/register-notice", {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(res => {
            if(res.status === 200) {
                alert("Đăng ký thành công");
            } else if(res.status === 300) {
                alert("Email đã tồn tại");  
            } else {
                alert("Đăng ký thất bại");
            }
        }).catch(() => {
            alert("Đăng ký thất bại");
        })
      }}>
        Đăng ký
      </button>
    </div>
  );
};

export default Register;
