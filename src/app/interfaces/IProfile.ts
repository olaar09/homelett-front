import firebase from "firebase/compat/app";
import { ISubjectGroup } from "./ISubjectGroup";
import { ISubjectItem } from "./IChatItem";

export interface IProfile {
  id?: string;
  uid: string;
  user: firebase.User;
  groups?: ISubjectGroup[];
  currentSubject?: ISubjectItem;
  currentSubjectId?: string;
  subscribedSubjects: ISubjectItem[];
}
