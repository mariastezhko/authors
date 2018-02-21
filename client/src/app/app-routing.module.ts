import { AuthorsComponent } from './authors/authors.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'authors',component: AuthorsComponent },
  { path: 'new',component: NewComponent },
  { path: 'edit/:id',component: EditComponent },
  { path: '', pathMatch: 'full', redirectTo: 'authors' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
