import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { BlogComponent } from './home/blog/blog.component';
import { CardContentComponent } from './home/card-content/card-content.component';
import { NewBlogFormViewComponent } from './new-blog/new-blog-form-view/new-blog-form-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: BlogComponent },
  { path: 'Home/:id', component: CardContentComponent },
  { path: 'add', component: NewBlogFormViewComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
