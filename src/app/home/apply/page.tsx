"use client";

import { useContext, useEffect, useRef, useState } from "react";

import APIUtil from "@/services/APIUtil";
import { AuthContext } from "@/contexts/AuthContext";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import { Avatar, Button, Card, FloatButton, Progress, message } from "antd";
import { AxiosError } from "axios";
import { useRequest } from "ahooks";
import { JobsSide } from "./JobSide/JobsSide";
import CVSide from "./CVSide/CVSide";
import { Icon } from "@iconify/react/dist/iconify.js";
import PercentageChart from "./InsightSide/Percentage";

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
  const [toggleInsight, setToggleInsight] = useState(true);

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
    data: authContext.activeProfile,
    error: profileErr,
    loading: loadingauthContext.activeProfile,
    refresh: refreshProfile,
  } = useRequest(() => getJobProfile(), {
    ready:
      authContext.currentUser != null && authContext.currentUser != undefined,
  }); */

  /*   const {
    data: experiences,
    error,
    loading: loadingExperiences,
    refresh: refreshExperiences,
  } = useRequest(() => getExperiences(), {
    ready:
      authContext.currentUser != null &&
      authContext.currentUser != undefined &&
      authContext.activeProfile,
  }); */

  const {
    data: jobs,
    error: jobsErr,
    loading: loadingJobs,
    refresh: refreshJobs,
  } = useRequest(() => getSimilarJobs(), {
    ready:
      authContext.currentUser != null &&
      authContext.currentUser != undefined &&
      authContext.activeProfile?.id != null,
  });

  useEffect(() => {
    if (selectedJob) {
      setIsShowAll(false);
    }
  }, [selectedJob]);

  useEffect(() => {
    refreshJobs();
  }, [authContext.currentUser]);

  useEffect(() => {
    if (jobs && jobs.length > 0) {
      setSelectedJob(jobs[0]);
    }
  }, [jobs]);

  const getExperiences = async (): Promise<any> => {
    try {
      setLoadingExp(true);
      const data = await apiUtil.cvService.getExperiences(
        `${authContext.activeProfile?.id}`,
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
      authContext.activeProfile &&
      selectedJob
    ) {
      getExperiences();
    }
  }, [authContext.currentUser, authContext.activeProfile, selectedJob]);

  /*   const getJobProfile = async (): Promise<any> => {
    try {
      const data = await apiUtil.cvService.getJobProfile("1");
      return data.data;
    } catch (error) {
      message.error("unable to load data");
    }
  }; */

  const getSimilarJobs = async (): Promise<any> => {
    try {
      const data = await apiUtil.cvService.getMatchedJobs("1");
      return data.data;
    } catch (error) {
      message.error("unable to load jobs");
    }
  };

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

  const onToggleInsights = () => setToggleInsight(!toggleInsight);
  const onToggleShowAll = () => setIsShowAll(true);
  const [isShowAll, setIsShowAll] = useState(false);

  const onAddSkill = (skill: string) => {
    console.log(skill);
  };

  const onUpgraded = () => {};
  const pageLoading =
    authContext.loading ||
    authContext.loadingSources ||
    loadingNewChat ||
    !jobs;
  return (
    <main className="h-full bg-background-thin min-h-screen flex flex-col 3xl:w-10/12  w-full mx-auto">
      <LoadingOverlay loading={pageLoading} />

      {!pageLoading && (
        <section className=" flex items-center h-screen overflow-hidden">
          <JobsSide
            jobs={jobs}
            selectedJob={selectedJob}
            loading={loading}
            isBillingActive={isBillingActive ?? false}
            onUpgraded={onUpgraded}
            onApplyJob={onApplyJob}
            onSelectJob={onSelectJob}
          />

          <div className="h-full w-full flex flex-col relative overflow-scroll">
            {toggleInsight && (
              <div className="p-4 lg:px-8">
                <Card
                  style={{ paddingTop: 0 }}
                  className=" shadow-none bg-transparent border-0 mt-0 pt-0 "
                >
                  <div className=" flex items-center px-0 gap-x-3 mb-4">
                    <Avatar src={selectedJob?.company_logo} />
                    <span>{selectedJob?.company_name}</span>
                  </div>
                  <Card.Meta
                    title={
                      <span className="text-2xl">
                        {" "}
                        {selectedJob?.title?.substring(0, 100)}
                        {selectedJob?.title?.length >= 50 ? "..." : ""}
                      </span>
                    }
                    description={
                      <div className="flex items-center gap-x-3">
                        <span className="text-sm">
                          {selectedJob?.location ?? "Remote, World"}
                        </span>
                        <span>.</span>
                        <span>2 weeks ago</span>
                      </div>
                    }
                  />

                  <div className={`mt-6 relative `}>
                    <Suitability
                      type="active"
                      title={"Role suitability"}
                      description={
                        "The role is suitable because you have most of the skills it requires. "
                      }
                      range={40}
                    />

                    <Suitability
                      type="success"
                      title={"Company suitability"}
                      description={
                        "This company is a good fit because they have a track record of offering remote opportunities in Europe, having previously hired Africans to work remotely."
                      }
                      range={90}
                    />

                    <span
                      className={`text-gray-600 text-sm whitespace-pre-wrap block transition-all duration-150 mt-10  ${
                        isShowAll ? " h-auto" : " h-60"
                      } overflow-hidden`}
                      dangerouslySetInnerHTML={{
                        __html: selectedJob?.description,
                      }}
                    />

                    {!isShowAll && (
                      <div className="blur-at-top  absolute h-40  bg-transparent  -bottom-20 w-full  "></div>
                    )}
                    {!isShowAll && (
                      <div className="absolute  h-40 z-30 w-full left-0 right-0">
                        <Button
                          onClick={onToggleShowAll}
                          className="w-full"
                          type="link"
                        >
                          <div className="flex items-center justify-center w-full gap-x-3">
                            <span className="">Show more</span>
                            <Icon
                              className="text-xl "
                              icon={"iconamoon:arrow-down-2-duotone"}
                            />
                          </div>
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
                <Card className="gap-y-1 mt-20 h-72 w-full">
                  <div className="flex lg:flex-row  justify-between ">
                    <div className="w-4/12">
                      <PercentageChart />
                    </div>

                    <div className="flex flex-col gap-y-3 w-4/12  px-6">
                      <span>Skills required : </span>

                      <div className="flex items-center flex-wrap justify-start gap-x-4 gap-y-3">
                        {[
                          "ReactJS",
                          "Javascript",
                          "Laravel",
                          "Empathy",
                          "Leadership",
                          "5 years experience",
                          "AWS",
                          "Cloudflare",
                        ].map((title) => {
                          return <Chip action={onAddSkill} title={title} />;
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-y-3 w-4/12  px-6">
                      <span>Your skills : </span>

                      <div className="flex items-center flex-wrap justify-start gap-x-4 gap-y-3">
                        {[
                          "ReactJS",
                          "Javascript",
                          "Laravel",
                          "Empathy",
                          "Heroku",
                          "Tailwind",
                          "3 years experience",
                        ].map((title) => {
                          return <Chip title={title} action={undefined} />;
                        })}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {!toggleInsight && (
              <CVSide
                onToggleInsights={onToggleInsights}
                jProfile={authContext.activeProfile!}
                experiences={experiences}
                loadingExperiences={loadingExperiences}
                loadingCV={loadingCV}
                coverLetter={coverLetter}
              />
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default Chat;

const Chip = ({ title, action }: { title: string; action: any }) => {
  return (
    <div
      onClick={() => {
        if (action) {
          action(title);
        }
      }}
      className="rounded-2xl bg-gray-200 px-2 flex items-center gap-x-2 hover:opacity-60 transition-all duration-100 cursor-pointer"
    >
      <span>{title}</span>
      {action && <Icon icon={"lucide:plus"} />}
    </div>
  );
};

const Suitability = ({
  title,
  description,
  range,
  type,
}: {
  title: string;
  description: string;
  range: number;
  type: "active" | "success";
}) => {
  return (
    <div className="flex flex-col my-4 gap-y-2">
      <div className="flex gap-x-3 items-start  ">
        <span className="w-32 text-gray-800">{title}</span>
        <div className="w-40">
          <Progress status={type} percent={range} size="small" />
        </div>
      </div>
      <span className="text-gray-800">{description}</span>
    </div>
  );
};
