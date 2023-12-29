import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sucess-modal',
  templateUrl: './sucess-modal.component.html',
  styleUrls: ['./sucess-modal.component.css'],
  standalone: true,
  imports: [MatDialogModule, ButtonComponent],
})
export class SucessModalComponent {
  constructor(
    public dialogRef: MatDialogRef<SucessModalComponent>,
    private router: Router
  ) {}

  closePopup() {
    this.router.navigate(['./Home']);
    this.dialogRef.close();
  }
}
