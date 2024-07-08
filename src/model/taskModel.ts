import { ITask } from "../interfaces/Task";
import { TASK_STATUS } from "../enums/TaskStatus";

const tasks = [
  {
    id: "1",
    title: "Write Chapter on 'Master-Slave Morality'",
    desc: "Develop ideas for the contrasting moralities of master and slave classes.",
    status: TASK_STATUS.PENDING
  },
  {
    id: "2",
    title: "Revise 'Thus Spoke Zarathustra'",
    desc: "Review and edit draft of the philosophical novel.",
    status: TASK_STATUS.PENDING
  },
  {
    id: "3",
    title: "Prepare Lecture on Eternal Recurrence",
    desc: "Create lecture notes and outline for upcoming lecture on eternal recurrence.",
    status: TASK_STATUS.DONE
  },
  {
    id: "4",
    title: "Correspondence with Wagner",
    desc: "Exchange letters with Richard Wagner regarding philosophy and music.",
    status: TASK_STATUS.NOTSTARTED
  },
  {
    id: "5",
    title: "Read Schopenhauer's 'The World as Will and Representation'",
    desc: "Study Schopenhauer's work to inform own philosophical reflections.",
    status: TASK_STATUS.NOTSTARTED
  }
];

export function getTasks() {
  return tasks;
}

export function getTaskById(id: string) {
  return tasks.find(({ id: userId }) => userId === id);
}

export function createTask(task: ITask) {
  tasks.push({
    id: `${tasks.length + 1}`,
    ...task,
  });
}

export function updateTask(id: string, task: ITask): number {
  const index = tasks.findIndex((item) => item.id === id);

  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...task };
  }
  return index;
}

export function deleteTask(id: string): number {
  const index = tasks.findIndex((task) => task.id === id);

  if (index !== -1) {
    tasks.splice(index, 1);
  }
  return index;
}
