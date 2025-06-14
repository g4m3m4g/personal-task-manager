import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../task/task.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-task-button',
  imports: [
    DialogModule,
    InputTextModule,
    DatePickerModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './add-task-button.component.html',
  styleUrl: './add-task-button.component.css',
})
export class AddTaskButtonComponent {
  displayModal = false;

  task: Task = {
    _id: '',
    title: '',
    description: '',
    duedate: undefined,
    completed: false,
  };

  constructor(
    private taskService: TaskService,
    public authService: AuthService,
    private messageService: MessageService
  ) {}

  openModal() {
    this.displayModal = true;
  }

  submitTask() {
    if (!this.task.title.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Create task failed',
        detail: 'Please input task title',
      });
      return;
    }

    this.taskService.createTask(this.task).subscribe({
      next: (newTask) => {
        console.log('Task created:', newTask);
        this.displayModal = false;
        this.resetTask();
      },
      error: (err) => {
        console.error('Failed to submit task', err);
      },
    });
  }

  resetTask() {
    this.task = {
      _id: '',
      title: '',
      description: '',
      duedate: undefined,
      completed: false,
    };
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
