export interface IChatHistoryItem {
  id?: string;
  message?: string;
  type: string;
  chat_id: string;
  extra?: {
    bar_chart: { x: any; y: any };
    pie_chart: { x: any; y: any };
    line_chart: { x: any; y: any };
    area_chart: { x: any; y: any };
  };
}
