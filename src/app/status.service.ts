import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private status: boolean = false;

  toggleStatus(): boolean {
    this.status = !this.status;
    return this.status;
  }
}
