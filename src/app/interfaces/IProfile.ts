import firebase from "firebase/compat/app";
import { ISubjectGroup } from "./ISubjectGroup";
import { ISubjectItem } from "./ISubjectItem";

export interface IProfile {
  id: string;
  uid: string;
  user: firebase.User;
  school: ISubjectGroup;
  currentSubject: ISubjectItem;
  currentSubjectId: string;
  subscribedSubjects: ISubjectItem[];
}
