import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
  { path: 'journeys', loadChildren: './pages/journeys/journeys.module#JourneysModule' },
  { path: 'signin', loadChildren: './pages/signin/signin.module#SignInModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
