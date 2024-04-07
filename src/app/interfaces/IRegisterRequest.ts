import firebase from "firebase/compat/app";
import { ISubjectGroup } from "./ISubjectGroup";
import { ISubjectItem } from "./ISubjectItem";

export interface IAuthRequest {
  id?: string;
  username?: string;
  email: string;
  password: string;
  company?: string;
}
