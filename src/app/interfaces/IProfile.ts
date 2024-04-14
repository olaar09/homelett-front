import firebase from "firebase/compat/app";
import { ISubjectGroup } from "./ISubjectGroup";

export interface IProfile {
  id?: string;
  uid: string;
  user: firebase.User;
  groups?: ISubjectGroup[];
}
