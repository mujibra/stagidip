export type ApiListResponse<T> = {
  success: boolean;
  totalDatas?: number;
  data: T[];
  message?: string;
};

export type Mesin = {
  id: string;
  merek: string | null;
  model: number | null;
  type: string | null;
  status?: string | null;
};
