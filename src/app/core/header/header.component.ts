import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthenticationFormComponent } from '../authentication-form/authentication-form.component';
import { AuthenticationService } from '../service/authentication.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  matDialogRef!: MatDialogRef<AuthenticationFormComponent>;
  email: string = '';
  isLogedIn: boolean = false;
  isHomePage: boolean = true;
  constructor(
    private matDialog: MatDialog,
    private authServ: AuthenticationService,
    private router: Router,
    private localStorageS: LocalStorageService
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
    this.authServ.isHomePage.next(false);
    this.localStorageS.setItem('isHomePage', false);
    this.router.navigate(['./add']);
  }
  ngOnInit(): void {
    this.authServ.isLogedIn.subscribe((val) => {
      this.isLogedIn = this.localStorageS.getItem('isLoggedIn') || val;
    });
    this.authServ.isHomePage.subscribe((val) => {
      this.isHomePage = this.localStorageS.getItem('isHomePage') || val;
    });
  }
}
