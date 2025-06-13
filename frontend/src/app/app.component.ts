import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { SidebarModule } from 'primeng/sidebar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddTaskButtonComponent } from './components/button/add-task-button/add-task-button.component';
import { AuthService } from './services/auth.service';
import { ConfirmationService } from 'primeng/api';
import { LandingComponent } from './components/landing/landing.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule,
    CardModule,
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    RouterModule,
    ToastModule,
    CommonModule,
    TagModule,
    SidebarModule,
    NavbarComponent,
    AddTaskButtonComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.refreshTokenState();
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
