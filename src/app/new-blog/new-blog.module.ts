import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { BackBtnComponent } from './back-btn/back-btn.component';



@NgModule({
  declarations: [
    CreateBlogComponent,
    BackBtnComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NewBlogModule { }
