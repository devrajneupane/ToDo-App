import { ITodo } from "./Task";

export interface IServiceResponse {
  message?: string;
  error?: string;
  data?: ITodo | ITodo[];
}
