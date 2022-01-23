import { Project } from "./project";

export interface Client {
    id: string;
    name: string;
    projects: Project[]
}