export interface IProduct {
  id: number;
  title: string;
  extra: string;
  extra_icon: string;
  tag: string;
  type: string;
  group_count: number;
  total_selection: string;
  total_selection_count: number;
  price: number;
  platform_ids: number;
  created_at: null;
  updated_at: null;
  assigned_platforms: IAssignedPlatform[];
}

export interface IAssignedPlatform {
  id: number;
  product_id: number;
  platform_id: number;
  platform: IPlatform;
}

export interface IPlatform {
  id: number;
  name: string;
  description: string;
  categories: string;
  icon: string;
}
