import React, { useState } from "react";

const Auth = ({ children }: React.PropsWithChildren) => {
  const [pass, setPass] = useState("");

  if (pass === import.meta.env.VITE_KEY_PASS) {
    return <>{children}</>;
  }

  return (
    <input
      type="text"
      placeholder="pass"
      value={pass}
      onChange={(e) => setPass(e.target.value)}
    />
  );
};

export default Auth;
