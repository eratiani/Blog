import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SucessModalComponent } from 'src/app/stand-alone/sucess-modal/sucess-modal.component';
import { AuthenticationFormComponent } from '../authentication-form/authentication-form.component';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  matDialogRef!: MatDialogRef<AuthenticationFormComponent>;
  email: string = '';
  isLogedIn: Observable<boolean> = this.authServ.isLogedIn.asObservable();
  isHomePage: Observable<boolean> = this.authServ.isHomePage.asObservable();
  constructor(
    private matDialog: MatDialog,
    private authServ: AuthenticationService,
    private router: Router
  ) {}
  OpenModal() {
    this.matDialogRef = this.matDialog.open(AuthenticationFormComponent, {
      data: { email: this.email },
    });

    this.matDialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onAddBlog() {
    console.log(this.isLogedIn, this.isHomePage);
    this.authServ.isHomePage.next(false);
    this.router.navigate(['./add']);
  }
  ngOnInit(): void {
    this.isLogedIn = this.authServ.isLogedIn;
    this.isHomePage = this.authServ.isHomePage;
  }
}
