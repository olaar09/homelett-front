import { IDataSourceItem } from "@/app/interfaces/IDatasourceItem";

export interface IChat {
  id: string;
  slug: string;
  datasource: IDataSourceItem;
  session_id: string;
}
