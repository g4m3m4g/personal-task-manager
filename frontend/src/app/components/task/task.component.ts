import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from './task.model';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PanelModule } from 'primeng/panel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-task',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TagModule,
    PanelModule,
    ConfirmDialogModule,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.getTasks().subscribe({
      next: (res) => (this.tasks = res),
      error: (err) => console.error('Failed to fetch tasks', err),
    });
  }

  isOverdue(task: Task): boolean {
    if (!task.duedate) return false;
    return new Date(task.duedate) < new Date() && !task.completed;
  }

  markComplete(task: Task) {
    // Your logic to mark the task complete, e.g. call backend and update UI
    task.completed = true;
  }

  editTask(task: Task) {
    // Logic to open edit modal/form
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task._id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t._id !== task._id);
      },
      error: (err) => {
        console.error('Failed to delete task', err);
      },
    });
  }
}
