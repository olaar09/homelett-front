export interface IDataSourceItem {
  id?: string;
  name?: string;
  icon: string;
  category: string;
  source_type: DataSourceType;
}

export interface DataSourceType {
  id: number;
  name: string;
  icon: string;
  category: string;
  description?: string;
  is_active: number;
}
