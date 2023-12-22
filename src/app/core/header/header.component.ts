import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SucessModalComponent } from 'src/app/stand-alone/sucess-modal/sucess-modal.component';
import { AuthenticationFormComponent } from '../authentication-form/authentication-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  matDialogRef!: MatDialogRef<AuthenticationFormComponent>;
  email: string = 'west';
  constructor(private matDialog: MatDialog) {}
  OpenModal() {
    this.matDialogRef = this.matDialog.open(AuthenticationFormComponent, {
      data: { email: this.email },
    });

    this.matDialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
