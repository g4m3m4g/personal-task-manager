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
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-task',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TagModule,
    PanelModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    DatePickerModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  editDialogVisible: boolean = false;
  selectedTask: Task = {
    _id: '',
    title: '',
    description: '',
    duedate: undefined,
    completed: false,
  };

  constructor(
    private taskService: TaskService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

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
    if (!task.duedate || task.completed) return false;
    return new Date(task.duedate) < new Date();
  }

  isDueSoon(task: Task): boolean {
    if (!task.duedate || task.completed) return false;

    const now = new Date();
    const dueDate = new Date(task.duedate);
    // Calculate the time difference in milliseconds (2 days)
    const timeDiff = dueDate.getTime() - now.getTime();
    const twoDay = 2 * 24 * 60 * 60 * 1000;

    return timeDiff > 0 && timeDiff <= twoDay;
  }

  markComplete(task: Task) {
    this.taskService.markComplete(task._id).subscribe({
      next: (updatedTask) => {
        task.completed = updatedTask.completed;
      },
      error: (err) => console.error('Failed to mark task as complete', err),
    });
  }

  markNotComplete(task: Task) {
    this.taskService.markNotComplete(task._id).subscribe({
      next: (updatedTask) => {
        task.completed = updatedTask.completed;
      },
      error: (err) => console.error('Failed to mark task as not complete', err),
    });
  }

  editTask(task: Task) {
    this.selectedTask = { ...task };
    this.editDialogVisible = true;
  }

  saveTask() {
    if (!(this.selectedTask.title.trim())) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Update task failed',
        detail: 'Please input task title',
      });
      return;
    }

    this.taskService
      .updateTask(this.selectedTask._id, this.selectedTask)
      .subscribe({
        next: () => {
          this.fetchTasks();
          this.editDialogVisible = false;
        },
        error: (err) => console.error('Failed to update task', err),
      });
  }

  deleteTask(task: Task) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${task.title}"?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.taskService.deleteTask(task._id).subscribe({
          next: () => {
            this.tasks = this.tasks.filter((t) => t._id !== task._id);
          },
          error: (err) => {
            console.error('Failed to delete task', err);
          },
        });
      },
    });
  }
}
