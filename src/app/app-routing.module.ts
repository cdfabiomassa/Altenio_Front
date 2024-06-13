import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './component/core/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: '**', redirectTo: '/not-found' },
]

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
})

export class AppRoutingModule {
  hideFooter: boolean = false;
}
