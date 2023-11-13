import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { StatusService } from './status.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gas Sensing Dashboard V0.4.05';

  constructor(private statusService: StatusService) {}

  toggleStatus() {
    this.statusService.toggleStatus();
  }

  getStatusMessage(): string {
    return this.statusService.toggleStatus() ? 'Connected!' : 'Not Connected!';
  }
}
