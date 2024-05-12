import { Drawer } from "antd";
import InsightSide from "../InsightSide/InsightSide";

const MobileInsightDrawer = ({
  loadingFeatures,
  selectedJob,
  onToggleInsights,
  jobProfileFeatures,
  jobSkills,
  profileSkills,
  onRefreshInsights,
  onNewSkillAdded,
  onJobApplied,
  toggleInsight,
  onClose,
  open,
}: {
  open: boolean;
  toggleInsight: boolean;
  loadingFeatures: boolean;
  selectedJob: any;
  onJobApplied: () => void;
  onNewSkillAdded: (skill: string) => void;
  onToggleInsights: () => void;
  onClose: () => void;
  onRefreshInsights: () => void;
  jobProfileFeatures: IJobProfileFeature | null;
  jobSkills: string[];
  profileSkills: string[];
}) => {
  return (
    <Drawer
      title={null}
      placement={"bottom"}
      closable={true}
      onClose={onClose}
      open={open}
      height={screen.height - (screen.availHeight / 100) * 5}
      key={"bottom"}
    >
      <InsightSide
        toggleInsight={toggleInsight}
        loadingFeatures={loadingFeatures}
        selectedJob={selectedJob}
        onJobApplied={onJobApplied}
        onNewSkillAdded={onNewSkillAdded}
        onToggleInsights={onToggleInsights}
        onRefreshInsights={onRefreshInsights}
        jobProfileFeatures={jobProfileFeatures}
        jobSkills={jobSkills}
        profileSkills={profileSkills}
      />
    </Drawer>
  );
};

export default MobileInsightDrawer;
