import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../components/task/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`, {
      withCredentials: true,
    });
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, task, {
      withCredentials: true,
    });
  }

  updateTask(taskId: string, updatedData: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/tasks/${taskId}`, updatedData, {
      withCredentials: true,
    });
  }

  markComplete(taskId: string): Observable<any> {
    return this.http.patch<Task>(
      `${this.baseUrl}/tasks/${taskId}/complete`,
      { completed: true },
      { withCredentials: true }
    );
  }

  markNotComplete(taskId: string): Observable<any> {
    return this.http.patch<Task>(
      `${this.baseUrl}/tasks/${taskId}/not-complete`,
      { completed: false },
      { withCredentials: true }
    );
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${taskId}`, {
      withCredentials: true,
    });
  }
}
