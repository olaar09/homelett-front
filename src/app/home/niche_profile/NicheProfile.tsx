import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, Button, Tooltip, Avatar, Slider, Drawer } from "antd";

const NicheProfileDrawer = ({
  open,
  onClose,
}: {
  onClose: any;
  open: boolean;
}) => {
  return (
    <Drawer title="Manage profile" onClose={onClose} open={open}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default NicheProfileDrawer;
