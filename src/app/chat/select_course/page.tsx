"use client";

import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";

import Link from "next/link";
import StickyHead from "@/app/components/Header";
import SubjectListInfinite from "../_components/SubjectListInfinite";
import { usePaystackPayment } from "react-paystack";
import { Spin, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { ISubjectItem } from "@/app/interfaces/ISubjectItem";
import { useRequest } from "ahooks";
import TextAvatar from "@/app/components/TextAvatar";

const Chat = () => {
  const [selectedSubject, setSelectedSubject] = useState<ISubjectItem | null>(
    null
  );

  //const currentAuth = useContext(FireBaseAuthContext);
  const [completingPayment, setCompletingPayment] = useState(false);
  const apiUtil = new APIUtil();

  const listSubjects = async (): Promise<ISubjectItem[] | undefined> => {
    try {
      const data = await apiUtil.subjectService.listSubjects();
      if (data) {
        return data;
      }
    } catch (error) {
      message.error("unable to load data");
    }
  };
  const { data, error, loading } = useRequest(listSubjects);
  console.log(data, "RESPONSE");

  const config = {
    reference: new Date().getTime().toString(),
    email: "agboolar09@gmail.com",
    amount: (selectedSubject?.amount ?? 0) * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_0bd51a9b53a2c80ead3d84d11b27e4f51659e5f5",
  };

  const initializePayment = usePaystackPayment(config);
  const completeTrx = async (reference: string) => {};

  useEffect(() => {
    if (selectedSubject && selectedSubject.amount > 0) {
      onInitPayment();
    }
  }, [selectedSubject?.amount]);

  const onSuccess = (reference: string) => {
    completePayment(reference);
  };

  const completePayment = async (data: any) => {
    try {
      setCompletingPayment(true);
      await apiUtil.subjectService.addSubject({
        paymentReference: data.reference,
        subjectId: selectedSubject!.id,
      });
      message.success("Subject added");
      // await refreshUsr();
      setCompletingPayment(false);
    } catch (x) {
      message.error("Unable to complete transaction");
      setCompletingPayment(false);
    }
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
      setSelectedSubject(null);
    }
  };

  const onSubjectSelected = (subject: ISubjectItem) => {
    setSelectedSubject(subject);
  };

  return (
    <div>
      <StickyHead hasContent={true}>
        <Link href={"/chat"}>
          <div className="flex items-center  py-1 rounded-lg gap-x-2">
            <Icon
              icon={"material-symbols:arrow-back-ios-rounded"}
              className="text-md cursor-pointer text-2xl"
            />
            <span className="text-lg">Add a new subject</span>
          </div>
        </Link>
      </StickyHead>

      {(loading || !data) && (
        <div className="animate-pulse flex flex-col gap-y-6 mt-24">
          <div className="flex items-center flex-wrap gap-y-8">
            {[1, 2, 3, 4, 8, 8, 8, 3].map((val, index) => {
              return (
                <div key={index} className="w-6/12 px-3">
                  <div
                    key={index}
                    className="flex flex-col gap-y-2 shrink-0  bg-[#1D1D1D] rounded-lg  px-2 pt-2 h-36"
                  >
                    <TextAvatar character={""} bgColor="#181818" />
                    <span className="text-sm truncate h-3 "></span>
                    <span className="text-[0.85rem] h-8 text-foreground-secondary truncate-2-lines max-w-xs"></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!loading && data && (
        <div className="flex flex-col gap-y-4 mt-24  ">
          <SubjectListInfinite onSelect={onSubjectSelected} items={data} />
        </div>
      )}
    </div>
  );
};

export default Chat;
