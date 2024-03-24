import firebase from "firebase/compat/app";

export interface ISubjectGroup {
  id: string;
  code: string;
  groupName: string;
  authorId: string;
  author: string;
}
