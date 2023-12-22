import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { SucessModalComponent } from 'src/app/stand-alone/sucess-modal/sucess-modal.component';

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.css'],
})
export class AuthenticationFormComponent {
  email: string;
  isValid: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AuthenticationFormComponent>,
    @Inject(MAT_DIALOG_DATA) data: { email: string },
    public matSuccess: MatDialog
  ) {
    this.email = data.email;
  }

  closePopup() {
    this.dialogRef.close();
  }
  OpenSuccessModal() {
    this.matSuccess.open(SucessModalComponent);
  }
}
