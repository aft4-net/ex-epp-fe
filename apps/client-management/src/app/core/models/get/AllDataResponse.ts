import { Client } from "./client";

export interface AllDataResponse {
  ResponseStatus: string;
  Message: string;
  Ex?: unknown;
  Data: Client[];
}
