import { IStatus } from "./IStatus";

export interface IResponse {
  status?: IStatus;
  payload?: any;
}
