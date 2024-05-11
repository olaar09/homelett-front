"use client";
import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import APIUtil from "@/services/APIUtil";
import { AuthContext } from "@/contexts/AuthContext";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import JobItem from "../../_components/JobItem";
import LoadingJobItem from "../../_components/LoadingJobItem";
import { message } from "antd";
import { ExperienceItem } from "../CV_1/ExperienceItem_old";
import { OverviewItem } from "../CV_1/OverviewItem";
import ASide from "../CV_1/CVProfileInfo";
import { AxiosError } from "axios";
import { useRequest } from "ahooks";
import Upgrade from "./Upgrade";

interface JobsSide {
  jobs: any[];
  selectedJob: any;
  loading: boolean;
  isBillingActive: boolean;
  onUpgraded: () => void;
  onApplyJob: (job: any) => void;
  onSelectJob: (job: any) => void;
}

export const JobsSide = ({
  jobs,
  selectedJob,
  loading,
  isBillingActive,
  onUpgraded,
  onApplyJob,
  onSelectJob,
}: JobsSide) => {
  const authContext = useContext(AuthContext);

  return (
    <div className="md:w-[500px] w-full h-full flex flex-col relative  border-l-0   ">
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
  );
};
