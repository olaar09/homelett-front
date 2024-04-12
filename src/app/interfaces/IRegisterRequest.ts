import firebase from "firebase/compat/app";
import { ISubjectGroup } from "./ISubjectGroup";

export interface IAuthRequest {
  id?: string;
  username?: string;
  email: string;
  password: string;
  company?: string;
  is_open_ai?: number;
}
