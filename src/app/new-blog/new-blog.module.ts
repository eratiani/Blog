import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { BackBtnComponent } from './back-btn/back-btn.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { NewBlogFormViewComponent } from './new-blog-form-view/new-blog-form-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HighlightDirective } from './shared/directive/highlight.directive';
import { CategoryItemSelectedComponent } from './category-item-selected/category-item-selected.component';
@NgModule({
  declarations: [
    CreateBlogComponent,
    BackBtnComponent,
    NewBlogFormViewComponent,
    HighlightDirective,
    CategoryItemSelectedComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  exports: [],
})
export class NewBlogModule {}
