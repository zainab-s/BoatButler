import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule, BsDropdownModule, CollapseModule } from 'ngx-bootstrap';
import { MatFormFieldModule, MatInputModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing } from './routing-module';

export const imports = [
  BrowserModule,
  CarouselModule,
  CollapseModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  routing
];
