type BaseData = {
  title?: string;
  body: string;
  path: string;
  date: string;
  excerpt?: string;
  draft?: boolean;
}

export type PostData = BaseData & {
  tags?: string[];
  author?: string[];
};

export type JobData = BaseData & {
  role: string;
  salary: string;
  expiryDate: string;
  company?: string;
  location?: string;
  seniority?: string;
  apply?: string;
};
