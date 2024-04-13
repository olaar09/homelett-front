export interface IChatHistoryItem {
  id?: string;
  message?: string;
  type: string;
  chat_id: string;
  ai_explanation: string;
  datasource_query: string;
  extra?: {
    current?: string;
    bar_chart?: { x: any; y: any };
    pie_chart?: { x: any; y: any };
    line_chart?: { x: any; y: any };
    area_chart?: { x: any; y: any };
  };
}
