import React, { useEffect, useRef, useState } from "react";

import { Modal, message } from "antd";

import ACButton from "@/app/components/Button";
import APIUtil from "@/services/APIUtil";
import { AxiosError } from "axios";
import InputField from "@/app/components/InputField";
import { ICredential } from "@/app/interfaces/IRegisterRequest";

const ChangeCredentialPasswordModal: React.FC<{
  open: boolean;
  selectedCredential: ICredential | null;
  handleCancel: (password?: string, emovedCredential?: string | null) => void;
  handleOk: () => void;
}> = ({ handleOk, handleCancel, open, selectedCredential }) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState<any>(null);
  const [email, setEmail] = useState<any>(null);
  const [inviteLink, setInviteLink] = useState<any>("none");

  useEffect(() => {
    if (open) {
      setPassword(selectedCredential?.password);
      setEmail(selectedCredential?.email);
      setInviteLink(selectedCredential?.invite_link ?? "none");
    }
  }, [open]);

  const apiUtil = new APIUtil();

  const onValidate = () => {
    if (!password) {
      message.error("Enter password to continue");
      return;
    }

    return true;
  };

  const onApproveCredential = () => {
    if (onValidate()) {
      onSubmit();
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      await apiUtil.productService.updateCredentialPassword({
        credential_request_id: `${selectedCredential!.id}`,
        email: email,
        invite_link: inviteLink,
        password: password,
      });
      handleCancel(`${selectedCredential!.id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        message.error(
          `${
            error?.response?.data?.message ??
            error?.response?.data?.reason ??
            "Unable to complete request"
          }`
        );
      } else {
        message.error("Unable to complete request");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={`Update  Credential Password`}
      open={open && selectedCredential != null}
      onOk={handleOk}
      onCancel={() => handleCancel(undefined, undefined)}
      maskClosable={false}
      destroyOnClose={true}
      footer={null}
    >
      <div className=" h-96 mt-10 flex flex-col gap-y-7">
        <div className="w-full flex flex-col gap-y-2">
          <span className="">Email</span>
          <InputField
            placeHolder={`Enter email`}
            type={""}
            name={"email"}
            value={email}
            required
            onChange={(val) => setEmail(val.target.value)}
          />
        </div>

        <div className="w-full flex flex-col gap-y-2">
          <span className="">New password</span>
          <InputField
            placeHolder={`Enter password`}
            type={""}
            name={"password"}
            value={password}
            required
            onChange={(val) => setPassword(val.target.value)}
          />
        </div>

        <div className="w-full flex flex-col gap-y-2">
          <span className="">Invite link</span>
          <InputField
            placeHolder={`Enter invite link`}
            type={""}
            name={"invite_link"}
            value={inviteLink}
            required
            onChange={(val) => setInviteLink(val.target.value)}
          />
        </div>

        <div className="mt-0">
          <ACButton
            onClick={onApproveCredential}
            text={""}
            type={"button"}
            loading={loading}
          >
            <span className="text-white text-sm"> Update details</span>
          </ACButton>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeCredentialPasswordModal;
