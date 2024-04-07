import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { message } from "antd";

const GoogleLoginButton = ({ onSuccess }: any) => {
  const responseGoogle = async (response: any) => {
    // console.log("HEREEEE", response);
    return await onSuccess(response?.credential);
  };

  const errorGoogle = () => {
    message.error("Unable to authenticate with google");
  };

  return (
    <div className=" max-auto flex items-center justify-center">
      <GoogleLogin
        size="large"
        width={342}
        onSuccess={responseGoogle}
        onError={errorGoogle}
      />
    </div>
  );
};

export default GoogleLoginButton;
