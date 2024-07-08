import { TASK_STATUS } from "../enums/TaskStatus";

export interface ITask {
  title: string;
  desc: string;
  status: TASK_STATUS
}
