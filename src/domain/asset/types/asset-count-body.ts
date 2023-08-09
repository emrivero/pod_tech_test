import { StatusType } from "../../user/types/create-user-payload";

export type AssetsCountBody = {
  [K in StatusType]?: number;
};
