import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';

/*
 * Platform and Environment providers/directives/pipes
 */
import {ENV_PROVIDERS} from './environment';
import {AppRoutingModule} from './app-routing.module';
import {Ng2PaginationModule} from "ng2-pagination"

// App is our top level component
import {AppComponent} from './app.component';
import {HeadBarComponent} from './com/head-bar';
import {AccordionNavComponent} from './com/accordion-nav';
import {DatePickerComponent} from './com/date-picker';
import {BarGraphPageComponent} from './page/workbench/bar-graph';
import {WorkbenchPageComponent} from './page/workbench';
import {WeizhangPageComponent} from './page/weizhang';
import {YoukaTaocanComponent, YoukaBindComponent} from './page/youka';

// Providers
import {ApiRequest, ApiConfig, ApiCall} from './http';
import {ElClass} from './serv/el-class';

// stylesheet
import '../styles/main.css';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2PaginationModule
  ],
  declarations: [
    AppComponent,
    HeadBarComponent,
    AccordionNavComponent,
    DatePickerComponent,
    BarGraphPageComponent,
    WorkbenchPageComponent,
    WeizhangPageComponent,
    YoukaTaocanComponent,
    YoukaBindComponent
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    ApiRequest,
    ApiConfig,
    ApiCall,
    ElClass
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
