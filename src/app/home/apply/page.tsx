"use client";

import { Icon } from "@iconify/react";
import { useContext, useEffect, useRef, useState } from "react";

import APIUtil from "@/services/APIUtil";
import { AuthContext } from "@/contexts/AuthContext";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import { IChat } from "@/app/interfaces/IChatItem";
import JobItem from "../_components/JobItem";
import LoadingJobItem from "../_components/LoadingJobItem";
import { Button, message } from "antd";
import { Str } from "@/utils/consts";
import { ExperienceItem } from "./ExperienceItem";
import { OverviewItem } from "./OverviewItem";
import ASide from "./CVSide";
import { AxiosError } from "axios";
import { useRequest } from "ahooks";
import ACButton from "@/app/components/Button";
import Upgrade from "./Upgrade";

const Chat = () => {
  const [coverLetter, setCoverLetter] = useState("");

  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const [experiences, setExperiences] = useState<any[]>([]);
  const [loadingExperiences, setLoadingExp] = useState(false);

  const [loadingNewChat, setLoadingNewChat] = useState(false);
  const [loadingCV, setLoadingCV] = useState(false);

  const authContext = useContext(AuthContext);
  const apiUtil = new APIUtil();

  const isBillingActive = authContext.currentUser?.billingActive;

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

  const {
    data: jProfile,
    error: profileErr,
    loading: loadingJProfile,
    refresh: refreshProfile,
  } = useRequest(() => getJobProfile(), {
    ready:
      authContext.currentUser != null && authContext.currentUser != undefined,
  });

  /*   const {
    data: experiences,
    error,
    loading: loadingExperiences,
    refresh: refreshExperiences,
  } = useRequest(() => getExperiences(), {
    ready:
      authContext.currentUser != null &&
      authContext.currentUser != undefined &&
      jProfile,
  }); */

  const {
    data: jobs,
    error: jobsErr,
    loading: loadingJobs,
    refresh: refreshJobs,
  } = useRequest(() => getSimilarJobs(), {
    ready:
      authContext.currentUser != null && authContext.currentUser != undefined,
  });

  useEffect(() => {
    setSelectedJob(Str.dummyJobs[0]);
  }, [jobs]);

  const getExperiences = async (): Promise<any> => {
    try {
      setLoadingExp(true);
      console.log(jProfile.id, selectedJob.id);

      const data = await apiUtil.cvService.getExperiences(
        jProfile.id,
        selectedJob.id
      );

      setExperiences(data.data);
      //return data.data;
    } catch (error) {
      message.error("unable to load data");
    } finally {
      setLoadingExp(false);
    }
  };

  useEffect(() => {
    if (
      authContext.currentUser != null &&
      authContext.currentUser != undefined &&
      jProfile &&
      selectedJob
    ) {
      getExperiences();
    }
  }, [authContext.currentUser, jProfile, selectedJob]);

  const getJobProfile = async (): Promise<any> => {
    try {
      const data = await apiUtil.cvService.getJobProfile("1");
      return data.data;
    } catch (error) {
      message.error("unable to load data");
    }
  };

  const getSimilarJobs = async (): Promise<any> => {
    try {
      const data = await apiUtil.cvService.getMatchedJobs("1");
      return data.data;
    } catch (error) {
      message.error("unable to load jobs");
    }
  };

  console.log(jProfile, "MKDEM");

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
    //setJobs(clone);
  };

  const onUpgraded = () => {};

  return (
    <main className="h-full bg-background-thin min-h-screen flex flex-col 3xl:w-10/12  w-full mx-auto">
      <LoadingOverlay
        loading={
          authContext.loading || authContext.loadingSources || loadingNewChat
        }
      />

      <section className=" flex items-center h-screen overflow-scroll">
        <div className="lg:w-[400px] w-full h-full flex flex-col relative   ">
          <div className=" overflow-y-scroll w-full h-full  ">
            {(jobs ?? []).map((job: { id: any; name: any }) => (
              <JobItem
                job={job}
                applying={job.id === selectedJob?.id && loading}
                onApplyJob={() => onApplyJob(job)}
                onSelectJob={() => onSelectJob(job)}
                active={job.id === selectedJob?.id}
              />
            ))}
          </div>

          {!isBillingActive && (
            <Upgrade
              email={authContext.currentUser?.email}
              onUpgraded={onUpgraded}
            />
          )}
        </div>

        <div className="lg:flex hidden lg:w-9/12  h-full   flex-col overflow-y-scroll">
          <div className="px-2 w-full">
            {(loadingCV || loadingExperiences) && <LoadingJobItem />}
          </div>

          {!loadingCV && !loadingExperiences && (
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

                    {(experiences ?? []).map((experience: any) => {
                      return (
                        <ExperienceItem
                          title={experience.experience_title}
                          companyName={experience.company_name}
                          duration={` ${experience.company_name ?? ""} (${
                            experience.duration
                          })`}
                          content={experience.content}
                        />
                      );
                    })}
                  </section>
                </div>

                <ASide profile={jProfile} />
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Chat;
