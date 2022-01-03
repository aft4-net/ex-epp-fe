import { Project } from "..";

export interface Client {
  id: string;
  name: string;
  projects: Project[]
}
