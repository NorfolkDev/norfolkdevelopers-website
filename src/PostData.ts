export type PostData = {
  title?: string;
  body: string;
  path: string;
  date: string;
  tags?: string[];
  author?: string[];
  excerpt?: string;
  draft?: boolean;
};
