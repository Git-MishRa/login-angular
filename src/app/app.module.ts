// app.module.ts (if you keep it, or you can remove it entirely)
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component'; 

@NgModule({
    imports: [
      BrowserModule,
      ReactiveFormsModule
    ],
    declarations: [
      AppComponent,
      LoginComponent,
  ],
    providers: [],
    bootstrap: [AppComponent],
    exports: [LoginComponent, AppComponent],
  })
  export class AppModule { }
