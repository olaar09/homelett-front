"use client";

import { useContext, useEffect, useRef, useState } from "react";

import APIUtil from "@/services/APIUtil";
import { AuthContext } from "@/contexts/AuthContext";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import { FloatButton, message } from "antd";
import { AxiosError } from "axios";
import { useRequest } from "ahooks";
import { JobsSide } from "./JobSide/JobsSide";
import CVSide from "./CVSide/CV_1/CVSide";
import InsightSide from "./InsightSide/InsightSide";
import { Str } from "@/utils/consts";
import CVContainer from "./CVSide";
import { Icon } from "@iconify/react/dist/iconify.js";

const Apply = () => {
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

  const [allJobs, setAllJobs] = useState<string[]>([]);

  const [profileSkills, setProfileSkills] = useState<string[]>([]);
  const [jobSkills, setJobSkills] = useState<string[]>([]);
  // State to store the selected CV
  const [selectedCV, setSelectedCV] = useState<string>(
    Str.CV_TEMPLATES.CV_1.key
  );

  useEffect(() => {
    if (selectedJob) {
      toggleInsight ? onLoadJobFeatures() : onLoadCV(selectedJob);
    }
  }, [selectedJob]);

  useEffect(() => {
    if (selectedJob) {
      const parsed = JSON.parse(selectedJob.ai_description);
      setJobSkills(parsed?.skills ?? []);
    }
  }, [selectedJob]);

  useEffect(() => {
    if (selectedJob) {
      onLoadCV(selectedJob);
    }
  }, [toggleInsight]);

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
          authContext.currentUser!.active_job_profile!.id,
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

  const onNewSkillAdded = (skill: string) => {
    setProfileSkills([skill, ...profileSkills]);
  };

  const onLoadJobFeatures = async () => {
    await onJobFeature(selectedJob);
  };
  const onLoadCV = async (jobItem: any) => {
    setLoadingCV(true);
    try {
      const coverLetter = await apiUtil.cvService.generateCVCover(
        authContext.currentUser!.active_job_profile!.id,
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
    refreshJobs();
  }, [authContext.currentUser]);

  useEffect(() => {
    setAllJobs(jobs);
  }, [jobs]);

  useEffect(() => {
    if (allJobs && allJobs.length > 0) {
      setSelectedJob(allJobs[0]);
    } else {
      setSelectedJob(null);
    }
  }, [allJobs]);

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

  const onSelectedJobApplied = () => {
    const removeApplied = allJobs.filter((jb: any) => jb.id !== selectedJob.id);
    setAllJobs(removeApplied);
  };

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

  // Function to handle CV selection
  const handleShuffleCV = () => {
    const cvs = Object.keys(Str.CV_TEMPLATES);
    const currentIndex = cvs.indexOf(selectedCV);
    const nextIndex = (currentIndex + 1) % cvs.length;
    message.success(`Selected ${cvs[nextIndex]}`);
    setSelectedCV(cvs[nextIndex]);
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
            jobs={allJobs}
            selectedJob={selectedJob}
            loading={loading}
            isBillingActive={isBillingActive ?? false}
            onUpgraded={onUpgraded}
            onApplyJob={onApplyJob}
            onSelectJob={onSelectJob}
          />

          {toggleInsight && selectedJob && (
            <div className="lg:w-9/12 h-full ">
              <InsightSide
                onJobApplied={onSelectedJobApplied}
                onRefreshInsights={onLoadJobFeatures}
                onToggleInsights={onToggleInsights}
                onNewSkillAdded={onNewSkillAdded}
                profileSkills={profileSkills}
                jobSkills={jobSkills}
                selectedJob={selectedJob}
                toggleInsight={false}
                loadingFeatures={loadingFeatures}
                jobProfileFeatures={jobProfileFeatures}
              />
            </div>
          )}

          {!toggleInsight && selectedJob && (
            <div className=" lg:w-9/12  h-full hidden lg:block">
              <CVContainer
                onShuffleCV={handleShuffleCV}
                selected={selectedCV}
                data={{
                  onToggleInsights,
                  jProfile: authContext.activeProfile!,
                  experiences,
                  loadingExperiences,
                  loadingCV,
                  coverLetter,
                }}
              />
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default Apply;
