"use client";

import { Icon } from "@iconify/react";
import Chip from "@/app/components/Chip";
import { useEffect, useState } from "react";
import Drawer from "../_components/Drawer";
import Link from "next/link";
import StickyHead from "@/app/components/Header";
import SubjectListInfinite from "../_components/SubjectListInfinite";
import { usePaystackPayment } from "react-paystack";
import { message } from "antd";

const dummy = [
  { title: "CSS 101", description: "Electrical theory and assertions" },
];

const dummyPro = [
  {
    title: "Beginner Python",
    description: "Beginning python programming from scratch",
    amount: 5000,
  },
  {
    title: "Beginner Javascript",
    description: "Beginning python programming from scratch",
    amount: 3000,
  },
  {
    title: "Beginner React",
    description: "Beginning python programming from scratch",
    amount: 3000,
  },
  {
    title: "Beginner React",
    description: "Beginning python programming from scratch",
    amount: 5000,
  },
  {
    title: "Beginner React",
    description: "Beginning python programming from scratch",
    amount: 5100,
  },
  {
    title: "Beginner React",
    description: "Beginning python programming from scratch",
    amount: 5100,
  },
  {
    title: "Beginner React",
    description: "Beginning python programming from scratch",
    amount: 1100,
  },
  {
    title: "Beginner React",
    description: "Beginning python programming from scratch",
    amount: 1100,
  },
  {
    title: "Beginner React",
    description: "Beginning python programming from scratch",
    amount: 1100,
  },
  {
    title: "Beginner React",
    description: "Beginning python programming from scratch",
    amount: 1100,
  },
  {
    title: "Beginner React",
    description: "Beginning python programming from scratch",
    amount: 1100,
  },
];

const Chat = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [amount, setAmount] = useState(0);
  const [currentUser, setcurrentUser] = useState(null);

  const [completingPayment, setCompletingPayment] = useState(false);

  const config = {
    reference: new Date().getTime().toString(),
    email: "agboolar09@gmail.com",
    amount: (amount ?? 0) * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_0bd51a9b53a2c80ead3d84d11b27e4f51659e5f5",
  };

  const initializePayment = usePaystackPayment(config);
  const completeTrx = async (reference: string) => {};

  useEffect(() => {
    if (amount && amount > 0) {
      onInitPayment();
    }
  }, [amount]);

  const handlePayment = async (result: any) => {
    try {
      setCompletingPayment(true);
      await completeTrx(result?.reference ?? "");
      message.success("Transaction successful");
      // await refreshUsr();
      setCompletingPayment(false);
    } catch (x) {
      message.error("Unable to complete transaction");
      setCompletingPayment(false);
    }
  };

  const onSuccess = (reference: string) => {
    message.success("Payment success");
    console.log(reference);
    // handlePayment(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
    message.error("Payment cancelled");
  };

  const onInitPayment = () => {
    try {
      initializePayment({ onSuccess, onClose });
    } catch (x) {
      message.error("Unable to initialize payment");
      console.log(x, "Error occured");
    } finally {
      setAmount(0);
    }
  };

  const onSubjectSelected = (subject: ISubjectItem) => {
    setAmount(subject.amount);
  };

  return (
    <div>
      <StickyHead hasContent={true}>
        <Link href={"/chat/1"}>
          <div className="flex items-center  py-1 rounded-lg gap-x-2">
            <Icon
              icon={"material-symbols:arrow-back-ios-rounded"}
              className="text-md cursor-pointer text-2xl"
            />
            <span className="text-lg">Add a new subject</span>
          </div>
        </Link>
      </StickyHead>

      <div className="flex flex-col gap-y-4 mt-24  ">
        <SubjectListInfinite onSelect={onSubjectSelected} items={dummyPro} />
      </div>
    </div>
  );
};

export default Chat;
