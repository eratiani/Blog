import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../button/button.component';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
@Component({
  selector: 'app-sucess-modal',
  templateUrl: './sucess-modal.component.html',
  styleUrls: ['./sucess-modal.component.css'],
  standalone: true,
  imports: [MatDialogModule, ButtonComponent],
})
export class SucessModalComponent {
  constructor(public dialogRef: MatDialogRef<SucessModalComponent>) {}

  closePopup() {
    this.dialogRef.close();
  }
}
