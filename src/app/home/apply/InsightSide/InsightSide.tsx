import Chip from "@/app/components/Chip";
import { Icon } from "@iconify/react";
import { Card, Avatar, Button, Progress, message, Tooltip } from "antd";
import CVSide from "../CVSide/CV_1/CVSide";
import PercentageChart from "./Percentage";
import { useContext, useEffect, useState } from "react";
import APIUtil from "@/services/APIUtil";
import { AuthContext } from "@/contexts/AuthContext";
import { AxiosError } from "axios";

const InsightSide = ({
  loadingFeatures,
  selectedJob,
  onToggleInsights,
  jobProfileFeatures,
  jobSkills,
  profileSkills,
  onRefreshInsights,
  onNewSkillAdded,
}: {
  toggleInsight: boolean;
  loadingFeatures: boolean;
  selectedJob: any;
  onNewSkillAdded: (skill: string) => void;
  onToggleInsights: () => void;
  onRefreshInsights: () => void;
  jobProfileFeatures: IJobProfileFeature | null;
  jobSkills: string[];
  profileSkills: string[];
}) => {
  const onToggleShowAll = () => setIsShowAll(true);
  const [isShowAll, setIsShowAll] = useState(false);
  const apiUtil = new APIUtil();
  const authContext = useContext(AuthContext);
  const [addingSkills, setAddingSkills] = useState<string[]>([]);

  const onAddSkills = async (skills: string[]) => {
    if (addingSkills.length > 0) return;

    try {
      setAddingSkills([...skills]);
      await apiUtil.cvService.createSkill(
        authContext.currentUser!.active_job_profile.id,
        skills
      );
      message.loading("New skill added");
      setAddingSkills([]);
      onNewSkillAdded(skills[0]);
      onRefreshInsights();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.reason);
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
      setAddingSkills([]);
    }
  };

  useEffect(() => {
    if (selectedJob) {
      console.log(selectedJob);

      setIsShowAll(false);
    }
  }, [selectedJob]);

  return (
    <div className="h-full w-full flex flex-col relative overflow-scroll">
      <div className="p-4 lg:px-8 h-full flex flex-col">
        <Card
          loading={loadingFeatures || !jobProfileFeatures}
          style={{ paddingTop: 0 }}
          className=" shadow-none bg-transparent border-0 mt-0 pt-0 relative  "
        >
          <div className="flex justify-between lg:items-center  lg:flex-row flex-col mb-10">
            <div className=" flex items-center px-0 gap-x-3 mb-4">
              <Avatar src={selectedJob?.company_logo} />
              <span>{selectedJob?.company_name}</span>
            </div>

            <div className="lg:flex hidden lg:items-start lg:flex-row gap-x-4   justify-start">
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
                <span>View fine tuned CV</span>
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
                <Tooltip
                  title={
                    selectedJob?.location
                      ? "Only application within this location is considered"
                      : "Application from all locations are considered"
                  }
                >
                  <span className="text-sm">
                    {selectedJob?.location ?? "Location agnostic"}
                  </span>
                </Tooltip>

                <span>.</span>
                <span>{selectedJob?.job_listing_date ?? ""}</span>
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
              description={jobProfileFeatures?.role_similarity_note ?? ""}
              range={jobProfileFeatures?.role_similarity ?? 0}
            />

            <Suitability
              type="success"
              title={"Company suitability"}
              description={jobProfileFeatures?.company_similarity_note ?? ""}
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
            <Card
              loading={!jobProfileFeatures?.role_similarity}
              className="gap-y-1 2xl:min-h-72 h-auto w-full"
            >
              <div className="flex 2xl:flex-row flex-col  gap-y-8 items-start justify-between ">
                <div className="2xl:w-4/12 w-full flex items-start justify-center h-full">
                  {jobProfileFeatures?.role_similarity && (
                    <PercentageChart
                      similarity={Number(
                        jobProfileFeatures?.role_similarity ?? 0
                      )}
                    />
                  )}
                </div>

                <div className="flex flex-col items-start  gap-y-3 2xl:w-4/12 w-full  px-6 h-full">
                  <span>Skills required : </span>

                  <div className="flex items-center flex-wrap justify-start gap-x-4 gap-y-3">
                    {jobSkills.map((title) => {
                      return (
                        <Chip
                          action={() => onAddSkills([title])}
                          title={title}
                          loading={addingSkills.includes(title)}
                          isSelected={false}
                          icon={""}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col items-start  gap-y-3 2xl:w-4/12 w-full  px-6 h-full">
                  <span>Your skills : </span>

                  <div className="flex items-center flex-wrap justify-start gap-x-4 gap-y-3">
                    {profileSkills.map((title) => {
                      return (
                        <Chip
                          title={title}
                          action={undefined}
                          isSelected={false}
                          icon={""}
                          loading={false}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightSide;

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
