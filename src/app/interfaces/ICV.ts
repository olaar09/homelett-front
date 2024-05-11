import { IJProfile } from "./IRegisterRequest";

export interface ICV {
  jProfile: IJProfile;
  experiences: any[];
  loadingExperiences: boolean;
  loadingCV: boolean;
  coverLetter: string;
  onToggleInsights: () => void;
}
