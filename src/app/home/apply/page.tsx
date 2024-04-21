"use client";

import { Icon } from "@iconify/react";
import { useContext, useEffect, useRef, useState } from "react";

import APIUtil from "@/services/APIUtil";
import { AuthContext } from "@/contexts/AuthContext";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import { IChat } from "@/app/interfaces/IChatItem";
import JobItem from "../_components/JobItem";
import LoadingJobItem from "../_components/LoadingJobItem";
import { message } from "antd";
import { Str } from "@/utils/consts";
import { ExperienceItem } from "./ExperienceItem";
import { OverviewItem } from "./OverviewItem";
import ASide from "./CVSide";
import { AxiosError } from "axios";

const Chat = () => {
  const [coverLetter, setCoverLetter] = useState("");

  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const [jobs, setJobs] = useState<any[]>([]);

  const [loadingNewChat, setLoadingNewChat] = useState(false);
  const [loadingCV, setLoadingCV] = useState(false);

  const currentAuth = useContext(AuthContext);
  const apiUtil = new APIUtil();

  useEffect(() => {
    setJobs(Str.dummyJobs);
    setSelectedJob(Str.dummyJobs[0]);
  }, []);

  useEffect(() => {
    if (selectedJob) onLoad(selectedJob);
  }, [selectedJob]);

  const onLoad = async (jobItem: any) => {
    setLoadingCV(true);
    try {
      const coverLetter = await apiUtil.cvService.generateCVCover(
        "1",
        jobItem.id
      );
      setCoverLetter(coverLetter);
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
      setLoadingCV(false);
    }
  };

  /*   const {
    data: jobList,
    error,
    loading: loadingChat,
    refresh: refreshJobList,
  } = useRequest(() => getChats(), {
    ready:
      authContext.currentUser != null && authContext.currentUser != undefined,
  }); */

  const onSelectJob = (jobItem: any) => {
    setSelectedJob(jobItem);
  };

  function waitforme(millisec: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, millisec);
    });
  }

  const onClosePreviousChats = () => {
    // setOpenPrevChats(false);
  };

  const onApplyJob = async (job: any) => {
    if (selectedJob?.name !== job.name) {
      setSelectedJob(job);
      message.warning("Review your cv before applying for this job");
      return;
    }

    setLoading(true);
    await waitforme(5000);
    const clone = [...jobs];
    const jobIndex = clone.findIndex((i) => i.name === job.name);
    clone[jobIndex].applied = true;
    setLoading(false);
    setJobs(clone);
  };

  return (
    <main className="h-full bg-background-thin min-h-screen flex flex-col 3xl:w-10/12  w-full mx-auto">
      <LoadingOverlay
        loading={
          currentAuth.loading || currentAuth.loadingSources || loadingNewChat
        }
      />

      <section className=" flex items-center h-screen overflow-scroll">
        <div className="lg:flex hidden lg:w-9/12  h-full   flex-col overflow-y-scroll">
          <div className="px-2 w-full">{loadingCV && <LoadingJobItem />}</div>

          {!loadingCV && (
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-x-1">
                <div className="flex flex-col w-9/12">
                  <section className="px-6 pt-7">
                    <div className="flex items-center gap-x-2">
                      <Icon
                        className="text-xl"
                        icon={"iconamoon:profile-fill"}
                      />
                      <span className="font-black text-xl">Career Profile</span>
                    </div>

                    <OverviewItem content={coverLetter} />
                  </section>

                  <section className="px-6 pt-7">
                    <div className="flex items-center gap-x-2">
                      <Icon
                        className="text-xl"
                        icon={"ic:baseline-work-history"}
                      />
                      <span className="font-black text-xl">Experiences</span>
                    </div>

                    <ExperienceItem
                      title={"Software developer/DevOps Consultant (Contract)"}
                      duration={"Open AI (January 2023 - Present)"}
                      content={
                        "Open AI provides a smooth experience to Africans applying to colleges abroad through thier online platform. Helping students from 70 plus high schools apply/montitor college applications directly to 900 + universities around Europe, Aisa and North America. I joined a team of 4 developers to help oversee the platfrom move from current monolith application to an API based architecture running on modern cloud infrastructures. The stack i use day to day include PHP 7/Laravel, Javascript / React JS, Nginx, Ubuntu 18 (Running on Digital ocean & AWS platforms), Ansible and Docker"
                      }
                    />
                    <ExperienceItem
                      title={"Fullstack developer"}
                      duration={"Paystack Africa (Feb 2019 - August 2019)"}
                      content={
                        " Paystack Africa is a talent accelerator organization offering tools and products to help graduates, professionals and entrepreneurs become better in their career. I work with a team of four to develop internal tools to help scan through proles of graduates and entrepreneurs and match them to experienced professionals for mentoring. My day to day tech includes, Typescript/NodeJS (NestJs), Typescript/ReactJs, React native, Sass, Redux, Redux saga, Mocha, Enzymes, NodeJs, Firebase, Travis CI, Coveralls, Ubuntu, Laravel"
                      }
                    />
                    <ExperienceItem
                      title={"Android fullstack engineer"}
                      duration={"GidiBooks.com (Nov 2017 - Feb 2019)"}
                      content={
                        "GidiBooks  Is an ebook publishing startup with over 500,000 user base and over 30,000 monthly users. I work as part of a mid sized team of frontend and backend engineers to improve usablility of the web and android platforms as well as build tools to improve publishing and reading experience of our users. My day to day stack includes ReactJS, Redux, Redux Saga, Mocha, Enzymes, Travic CI, Coveralls Mobx, NextJs, CSS3, Sass, NodeJs, Express, Loopback, PHP, PhpUnit, Laravel, AWS services, Microsoft Azure, Ubuntu"
                      }
                    />
                    <ExperienceItem
                      title={"Software engineer (Remote)"}
                      duration={"Codaye technologies (2015) 6 months"}
                      content={
                        "codaye.com Is a software firm that specializes in developing tech solutions such as website, web applications, mobile applications. At codaye, i worked remotely with a team of mobile and web engineers to produce various solutions."
                      }
                    />
                  </section>
                </div>

                <ASide />
              </div>
            </div>
          )}
        </div>

        <div className="lg:w-[400px] w-full  h-full overflow-y-scroll pb-10 ">
          {Str.dummyJobs.map((job) => (
            <JobItem
              job={job}
              applying={job.name === selectedJob?.name && loading}
              onApplyJob={() => onApplyJob(job)}
              onSelectJob={() => onSelectJob(job)}
              active={job.name === selectedJob?.name}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Chat;
