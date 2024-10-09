import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './app/shared/AuthState/auth.reducer';
import { AuthEffects } from './app/shared/AuthState/auth.effects';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {...appConfig,
  providers : [
    importProvidersFrom(HttpClientModule),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects])
  ]
}
)
  .catch((err) => console.error(err));
