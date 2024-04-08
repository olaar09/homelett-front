export interface IDataSourceItem {
  id?: string;
  name?: string;
  icon: string;
  category: string;
  source_type: DataSourceType;
}

export interface DataSourceType {
  name: string;
  icon: string;
  category: string;
  description?: string;
}
