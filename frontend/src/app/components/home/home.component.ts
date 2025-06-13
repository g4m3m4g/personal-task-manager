import { Component } from '@angular/core';
import { TaskComponent } from "../task/task.component";
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-home',
  imports: [TaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
