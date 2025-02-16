"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Popconfirm, Spin, Tag, message } from "antd";
import APIUtil from "@/services/APIUtil";
import { useRequest } from "ahooks";
import { AuthContext } from "@/contexts/AuthContext";
import { Icon } from "@iconify/react/dist/iconify.js";

import TransactionItem from "../_components/TransactionItem";
import ACButton from "@/app/components/Button";

const ListTransactions = () => {
  const authContext = useContext(AuthContext);
  const apiUtils = new APIUtil();

  const {
    data: transactionList,
    error,
    loading: loadingTransactions,
    refresh: refreshTransactions,
  } = useRequest(() => getTransactions(), {
    ready:
      authContext.currentUser != null && authContext.currentUser != undefined,
  });

  const getTransactions = async (): Promise<any> => {
    try {
      const data = await apiUtils.transactionService.fetchTransactions();
      console.log('transactions', data);
      return data;
    } catch (error) {
      message.error("unable to load transactions");
    }
  };

  return (
    <>
      {(loadingTransactions || !transactionList) && (
        <div className="h-screen   flex flex-col justify-center items-center">
          {" "}
          <div className="">
            {" "}
            <Icon
              icon={"eos-icons:three-dots-loading"}
              className=" text-6xl text-foreground"
            />
          </div>
        </div>
      )}

      {!loadingTransactions &&
        transactionList &&
        transactionList.length < 1 && (
          <div className="h-screen   flex flex-col justify-center items-center">
            {" "}
            {!error && (
              <div className=" flex flex-col  items-center justify-center gap-y-7">
                {" "}
                <img className="h-12" src="/fun-arrow.svg" />
                <span className="text-foreground">No transactions yet !</span>
              </div>
            )}
            {error && (
              <div className=" flex flex-col  items-center justify-center gap-y-7">
                {" "}
                <img className="h-12" src="/fun-arrow.svg" />
                <ACButton
                  onClick={refreshTransactions}
                  text={""}
                  type={"button"}
                  loading={false}
                >
                  <span className="text-foreground">Try again</span>
                </ACButton>
              </div>
            )}
          </div>
        )}

      {transactionList && transactionList.length > 0 && (
        <Spin
          indicator={
            <Icon
              icon={"eos-icons:three-dots-loading"}
              className=" text-8xl text-foreground"
            />
          }
          spinning={loadingTransactions}
          className="bg-background-thin"
        >
          <div className="bg-background-thin min-h-screen">
            {/*    <section className="h-20  flex items-center justify-between px-8 mt-0 mx-auto w-full bg-background-thin">
              <div className="flex flex-col">
                <HeaderItem
                  icon={"octicon:workflow-16"}
                  title={`Workflows `}
                  withBg={false}
                />
                <span className="text-xs text-foreground-secondary truncate w-52">
                  Manage & view workflows
                </span>
              </div>

              <div className="flex items-center gap-x-7">
                <div onClick={() => handleAddWorkflow()}>
                  <HeaderItem
                    icon="gg:add"
                    title="Add  new workflow"
                    withBg={true}
                  />
                </div>
              </div>
            </section> */}

            <div className="w-full mx-auto  bg-background-thin  ">
              <section className=" flex items-center w-full max-h-screen pb-40  lg:px-8 px-2 mt-10 flex-wrap gap-y-4 overflow-y-scroll">
                {(transactionList ?? []).map((transaction: any) => {
                  return (
                    <div className="lg:w-4/12 w-full">
                      <TransactionItem
                        applying={false}
                        onSelectJob={undefined}
                        onApplyJob={undefined}
                        active={false}
                        transaction={{ ...transaction }}
                      />
                    </div>
                  );
                })}
              </section>
            </div>
          </div>
        </Spin>
      )}
    </>
  );
};

export default ListTransactions;
