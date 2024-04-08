import { IDataSourceItem } from "./IDataSourceItem";
import { ISubjectGroup } from "./ISubjectGroup";

export interface IChat {
  id: string;
  slug: string;
  datasource: IDataSourceItem;
  session_id: string;
}
