import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule) },
  { path: 'journeys', loadChildren: () => import('./pages/journeys/journeys.module').then(m => m.JourneysModule) },
  { path: 'signin', loadChildren: () => import('./pages/signin/signin.module').then(m => m.SignInModule) },
  { path: 'poi-editor/:id', loadChildren: () => import('./pages/poi-editor/poi-editor.module').then(m => m.PoiEditorPageModule) },
  { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule) },
  { path: 'layer-editor', loadChildren: () => import('./pages/layer-editor/layer-editor.module').then(m => m.LayerEditorPageModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
