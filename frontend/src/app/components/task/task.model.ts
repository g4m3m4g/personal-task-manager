export interface Task {
  _id: string;
  title: string;
  description?: string;
  duedate?: Date;
  completed: boolean;
}
