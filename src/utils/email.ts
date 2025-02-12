

export const sendEmailAccessTokenIsInvalid = () => {
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


export const sendNewNoticeActivity = (toEmail: string) => {
  
  const templateParams = {
    from_name: "FIND_TRAINING_POINT_WEBSITE",
    to_name: "Bạn",
    to_email: toEmail
  };
  
  const data = {
    service_id: import.meta.env.VITE_EMAIL_SERVICE_ID,
    template_id: 'template_2wi2end',
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