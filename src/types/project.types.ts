export type TProject = {
  _id?: string;
  title: string;
  image: string;
  descriptions: string;
  live_link: string;
  client: string;
  server?: string;
  technology: string[];
  isDeleted?: boolean;
};
