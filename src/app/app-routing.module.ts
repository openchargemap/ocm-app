import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
  { path: 'journeys', loadChildren: './pages/journeys/journeys.module#JourneysModule' },
  { path: 'signin', loadChildren: './pages/signin/signin.module#SignInModule' },
  { path: 'poi-editor/:id', loadChildren: './pages/poi-editor/poi-editor.module#PoiEditorPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'layer-editor', loadChildren: './pages/layer-editor/layer-editor.module#LayerEditorPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
