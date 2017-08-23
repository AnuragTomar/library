import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/*BrowserModule imports commonModule, commonModule imports common modules required for components like ngIf and same, that's why we can use ngIf, ngFor without importing it anywhere. we just need BrowserModule 
imported in app.module.*/

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//ngModel is present in forms module therefore we import this module

import { HttpModule } from '@angular/http';
import { ToastComponent } from './toast/toast.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [
    // Shared Modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // Shared Components
    ToastComponent,
    LoadingComponent
  ],
  declarations: [
    ToastComponent,
    LoadingComponent
  ],
  providers: [
    ToastComponent
  ]
})
export class SharedModule { }
/*sharedmodule contains common modules required by many components so instead of importing them in every modules we create shared module and import it into app.module and components*/