import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  exportOption: string | undefined;
  options: string[] = ['JSON', 'CSV', 'Excel'];

  selected = 'COM3';
}
