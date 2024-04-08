import { IDatasourceItem } from "./IDatasourceItem";
import { ISubjectGroup } from "./ISubjectGroup";

export interface IChat {
  id: string;
  slug: string;
  datasource: IDatasourceItem;
  session_id: string;
}
