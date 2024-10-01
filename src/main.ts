import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component'; // Import the standalone AppComponent

platformBrowserDynamic()
  .bootstrapModule(AppComponent)
  .catch(err => console.error(err));
