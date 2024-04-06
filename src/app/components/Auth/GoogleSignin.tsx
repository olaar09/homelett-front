import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { message } from "antd";

const GoogleLoginButton = ({ onSuccess }: any) => {
  const responseGoogle = async (response: any) => {
    // console.log("HEREEEE", response);
    return await onSuccess(true, response?.credential);
  };

  const errorGoogle = () => {
    message.error("Unable to authenticate with google");
  };

  return (
    <div>
      <GoogleLogin onSuccess={responseGoogle} onError={errorGoogle} />
    </div>
  );
};

export default GoogleLoginButton;
