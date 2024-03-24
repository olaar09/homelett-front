import { ISubjectGroup } from "./ISubjectGroup";

export interface ISubjectItem {
  id: string;
  title: string;
  description: string;
  amount: number;
  subjectGroup: ISubjectGroup;
  groupId: string;
}
