import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactComponent } from './components/contact.component';
import { TemplateComponent } from './components/template.component';

const ROUTES: Routes = [
  { path: '', component: TemplateComponent },
  { path: 'contact', redirectTo: '', component: ContactComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(ROUTES);
