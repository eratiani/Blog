import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { SucessModalComponent } from 'src/app/stand-alone/sucess-modal/sucess-modal.component';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.css'],
})
export class AuthenticationFormComponent implements OnInit {
  email: string;
  isValid: boolean = false;
  authenticationForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AuthenticationFormComponent>,
    @Inject(MAT_DIALOG_DATA) data: { email: string },
    public matSuccess: MatDialog,
    private formBuilder: FormBuilder,
    private authServ: AuthenticationService
  ) {
    this.email = data.email;
  }
  ngOnInit(): void {
    this.authenticationForm = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.pattern(/^[a-zA-Z]+@redberry\.ge$/)],
      ],
    });
  }
  async onSubmit() {
    console.log(this.authenticationForm.invalid);
    if (this.authenticationForm.invalid) return;
    const body = await this.authenticationForm.value;
    console.log(this.authenticationForm.value);
    try {
      await this.authServ.checkEmail(body).then((res) => {
        this.authServ.isLogedIn.next(true);
        this.dialogRef.close();
        this.OpenSuccessModal();
      });
    } catch (error) {
      console.log(error);

      this.isValid = true;
    }
  }
  validateEmail() {}
  OpenSuccessModal() {
    this.matSuccess.open(SucessModalComponent);
  }
  checkForInvalid(formElement: string): boolean | undefined {
    return (
      this.authenticationForm.get(`${formElement}`)?.invalid &&
      (this.authenticationForm.get(`${formElement}`)?.dirty ||
        this.authenticationForm.get(`${formElement}`)?.touched)
    );
  }
}
