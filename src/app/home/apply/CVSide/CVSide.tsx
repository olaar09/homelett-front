import { Icon } from "@iconify/react/dist/iconify.js";
import LoadingJobItem from "../../_components/LoadingJobItem";
import ASide from "./CVProfileInfo";
import { ExperienceItem } from "./ExperienceItem";
import { OverviewItem } from "./OverviewItem";
import { IJProfile } from "@/app/interfaces/IRegisterRequest";
import { FloatButton } from "antd";

interface ICVSide {
  jProfile: IJProfile;
  experiences: any[];
  loadingExperiences: boolean;
  loadingCV: boolean;
  coverLetter: string;
  onToggleInsights: () => void;
}

const CVSide = ({
  jProfile,
  loadingCV,
  loadingExperiences,
  coverLetter,
  experiences,
  onToggleInsights,
}: ICVSide) => {
  return (
    <div className="lg:flex hidden  h-full    flex-col overflow-y-scroll">
      <FloatButton
        onClick={onToggleInsights}
        style={{ width: 120 }}
        description={
          <div className="flex items-center gap-x-1">
            <Icon
              className="text-2xl text-primary"
              icon={"majesticons:analytics"}
            />
            <span className=" text-base">Insights</span>
          </div>
        }
        shape="square"
      />

      <div className="px-2 w-full">
        {(loadingCV || loadingExperiences) && <LoadingJobItem />}
      </div>

      {!loadingCV && !loadingExperiences && coverLetter && experiences && (
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-1">
            <div className="flex flex-col w-9/12">
              <section className="px-6 pt-7">
                <div className="flex items-center gap-x-2">
                  <Icon className="text-xl" icon={"iconamoon:profile-fill"} />
                  <span className="font-black text-xl">Career Profile</span>
                </div>

                <OverviewItem content={coverLetter} />
              </section>

              <section className="px-6 pt-7">
                <div className="flex items-center gap-x-2">
                  <Icon className="text-xl" icon={"ic:baseline-work-history"} />
                  <span className="font-black text-xl">Experiences</span>
                </div>

                {(experiences ?? []).map((experience: any) => {
                  return (
                    <ExperienceItem
                      title={experience.experience_title}
                      companyName={experience.company_name}
                      list={experience.content}
                      duration={`${experience.duration_start}`}
                      content={experience.main_responsibilities}
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
  );
};

export default CVSide;
