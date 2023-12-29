import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ButtonComponent } from '../stand-alone/button/button.component';
import { RouterModule } from '@angular/router';
import { SucessModalComponent } from '../stand-alone/sucess-modal/sucess-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthenticationFormComponent } from './authentication-form/authentication-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HighlightDirective2 } from './directive/highlight.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AuthenticationFormComponent,
    HighlightDirective2,
  ],
  imports: [
    CommonModule,
    ButtonComponent,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    SucessModalComponent,
    ReactiveFormsModule,
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
