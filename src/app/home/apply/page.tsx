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
  const [jobProfileFeatures, setJobProfileFeatures] =
    useState<IJobProfileFeature | null>(null);

  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const [experiences, setExperiences] = useState<any[]>([]);
  const [loadingExperiences, setLoadingExp] = useState(false);

  const [loadingNewChat, setLoadingNewChat] = useState(false);
  const [loadingCV, setLoadingCV] = useState(false);
  const [loadingFeatures, setLoadingJobFeatures] = useState(false);

  const authContext = useContext(AuthContext);
  const apiUtil = new APIUtil();

  const isBillingActive = authContext.currentUser?.billingActive;
  const [toggleInsight, setToggleInsight] = useState(true);

  const [profileSkills, setProfileSkills] = useState<string[]>([]);

  useEffect(() => {
    if (selectedJob) onJobFeature(selectedJob);
  }, [selectedJob]);

  useEffect(() => {
    if (authContext.currentUser?.active_job_profile) {
      const skills =
        authContext.currentUser?.active_job_profile.attributes.filter(
          (attr) => attr.attribute === "skill"
        );
      const skillsMap = skills.map((skill) => skill.value);
      setProfileSkills(skillsMap);

      console.log(profileSkills);
    }
  }, [authContext.currentUser]);

  const onJobFeature = async (jobItem: any) => {
    setLoadingJobFeatures(true);
    try {
      const jobProfileFeatures =
        await apiUtil.jobService.fetchJobProfileFeatures(
          authContext.currentUser!.active_job_profile.id,
          jobItem.id
        );
      setJobProfileFeatures(jobProfileFeatures);
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
      setLoadingJobFeatures(false);
    }
  };

  const onLoadCV = async (jobItem: any) => {
    setLoadingCV(true);
    try {
      const coverLetter = await apiUtil.cvService.generateCVCover(
        authContext.currentUser!.active_job_profile.id,
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
              <div className="p-4 lg:px-8 h-full flex flex-col">
                <Card
                  loading={loadingFeatures}
                  style={{ paddingTop: 0 }}
                  className=" shadow-none bg-transparent border-0 mt-0 pt-0 relative  "
                >
                  <div className="flex justify-between lg:items-center  lg:flex-row flex-col mb-10">
                    <div className=" flex items-center px-0 gap-x-3 mb-4">
                      <Avatar src={selectedJob?.company_logo} />
                      <span>{selectedJob?.company_name}</span>
                    </div>

                    <div className="flex lg:items-center lg:flex-row gap-x-4   justify-start">
                      <Button
                        className="bg-primary flex items-center gap-x-3"
                        type="primary"
                      >
                        <Icon icon={"mdi:gesture-touch-box"} />
                        <span>Apply for job</span>
                      </Button>

                      <Button
                        onClick={onToggleInsights}
                        type="link"
                        className="flex items-center gap-x-3 text-gray-700"
                      >
                        <Icon icon={"ph:read-cv-logo-fill"} />
                        <span>View generated CV</span>
                      </Button>
                    </div>
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

                  <div
                    className={`mt-6 relative flex flex-col gap-y-3  ${
                      isShowAll ? " h-auto" : " lg:h-72 h-60 overflow-hidden"
                    } `}
                  >
                    <Suitability
                      type="active"
                      title={"Role suitability"}
                      description={
                        jobProfileFeatures?.role_similarity_note ?? ""
                      }
                      range={jobProfileFeatures?.role_similarity ?? 0}
                    />

                    <Suitability
                      type="success"
                      title={"Company suitability"}
                      description={
                        jobProfileFeatures?.company_similarity_note ?? ""
                      }
                      range={jobProfileFeatures?.company_similarity ?? 0}
                    />

                    <span
                      className={`text-gray-600 text-sm whitespace-pre-wrap block transition-all duration-150 mt-10  overflow-hidden`}
                      dangerouslySetInnerHTML={{
                        __html: selectedJob?.description,
                      }}
                    />
                  </div>
                  {!isShowAll && (
                    <div className=" h-16 bg-green-00  mt-0    lg:bottom-10 bottom-0 blur-at-top left-0 right-0">
                      <div className=" h-10  bg-transparent  w-full  bg-blue-300 text-black "></div>
                      <div className=" z-30 w-full left-0 right-0  ">
                        <Button
                          onClick={onToggleShowAll}
                          className="w-full"
                          type="link"
                        >
                          <div className="flex items-center justify-center">
                            <span className="">Show more</span>
                            <Icon
                              className="text-xl "
                              icon={"iconamoon:arrow-down-2-duotone"}
                            />
                          </div>
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>

                {!loadingFeatures && jobProfileFeatures && (
                  <div className="gap-y-1 mt-0  w-full flex flex-col flex-end justify-end">
                    <Card className="gap-y-1 2xl:min-h-72 h-auto w-full">
                      <div className="flex 2xl:flex-row flex-col  gap-y-8 items-center justify-between ">
                        <div className="2xl:w-4/12 w-full flex items-center justify-center">
                          <PercentageChart
                            similarity={jobProfileFeatures?.role_similarity}
                          />
                        </div>

                        <div className="flex flex-col gap-y-3 2xl:w-4/12 w-full  px-6">
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

                        <div className="flex flex-col gap-y-3 2xl:w-4/12 w-full  px-6">
                          <span>Your skills : </span>

                          <div className="flex items-center flex-wrap justify-start gap-x-4 gap-y-3">
                            {profileSkills.map((title) => {
                              return <Chip title={title} action={undefined} />;
                            })}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
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
          <Progress
            status={
              range < 40
                ? "exception"
                : range < 60
                ? "normal"
                : range < 80
                ? "active"
                : range < 90
                ? "success"
                : "success"
            }
            percent={range}
            size="small"
          />
        </div>
      </div>
      <span className="text-gray-800">{description}</span>
    </div>
  );
};
