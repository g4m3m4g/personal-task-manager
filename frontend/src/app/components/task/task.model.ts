export interface Task {
  _id: string;
  title: string;
  description?: string;
  duedate?: string;
  completed: boolean;
}
