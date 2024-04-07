import ACButton from "@/app/components/Button";
import InputField from "@/app/components/InputField";
import TextAvatar from "@/app/components/TextAvatar";
import { ISubjectItem } from "@/app/interfaces/ISubjectItem";
import { FireBaseAuthContext } from "@/contexts/AuthContext";
import FirebaseContext from "@/contexts/FirebaseContext";
import APIUtil from "@/services/APIUtil";
import { Drawer, Button, message } from "antd";
import { Input } from "postcss";
import { useContext, useState } from "react";

type GroupCodeDrawerProps = {
  onClose: () => void;
  open: boolean;
  items: ISubjectItem[];
  closable?: false;
};

const GroupCodeDrawer: React.FC<GroupCodeDrawerProps> = ({
  closable = false,
  onClose,
  open,
}) => {
  const [code, setCode] = useState<any>();
  const [loading, setLoading] = useState(false);
  const authContext = useContext(FireBaseAuthContext);
  const firebaseServices = useContext(FirebaseContext);
  const apiService = new APIUtil();

  const onUpdateAddGroup = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();

      await apiService.groupService.adGroup(code);
      await authContext!.refreshProfile();
      message.success("Class code added");
      setLoading(false);
    } catch (error) {
      message.error("Unable to add code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title={<span className=" text-foreground">Sign up for a class</span>}
      placement={"bottom"}
      onClose={onClose}
      closable={closable}
      style={{ background: "rgb(var(--panel-rgb))" }}
      className="z-30"
      open={open}
      key={"fund"}
    >
      <form
        onSubmit={onUpdateAddGroup}
        className="w-full text-left flex flex-col gap-y-2"
      >
        <span>Code:</span>
        <InputField
          type="text"
          value={code?.toString()}
          onChange={(x) => setCode(x.target?.value)}
          placeHolder={"Enter Class code"}
          name={"class_code"}
          required={true}
        />

        <div className="flex items-center gap-x-4 mt-4">
          <ACButton
            text={"Submit"}
            type={"submit"}
            loading={loading}
          ></ACButton>
        </div>
      </form>
    </Drawer>
  );
};

export default GroupCodeDrawer;
