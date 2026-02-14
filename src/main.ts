import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { LoginComponent } from './app/login/login.component';
import { bootstrapApplication } from '@angular/platform-browser';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

 bootstrapApplication(LoginComponent)
  .catch(err => console.error(err));