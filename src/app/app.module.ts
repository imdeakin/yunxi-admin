import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';

/*
 * Platform and Environment providers/directives/pipes
 */
import {ENV_PROVIDERS} from './environment';
import {AdminModule} from './admin/admin.module';
import {AppRoutingModule} from './app-routing.module';

// App is our top level component
import {AppComponent} from './app.component';
import {LoginComponent} from './login';

// Providers
import {ApiRequest, ApiConfig, ApiCall} from './http';
import {FuncServer} from './serv/func.server';
import {Rc4Server} from './serv/rc4.server';

// stylesheet
import '../styles/main.css';
import 'angular2-layer/css/dialog.css'

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    AdminModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    ApiRequest,
    ApiConfig,
    ApiCall,
    FuncServer,
    Rc4Server
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
