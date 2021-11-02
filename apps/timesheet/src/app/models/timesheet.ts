import { Employee } from './employee';
import { Project } from './project';

export interface TimeSheet {
    id?: number;
    note?: string;
    employeeId: number;
    employee?: Employee;
    endDate?: Date;
    projectId: number;
    project?: Project;
    startDate?: Date;
    Status?: string;
 
  }