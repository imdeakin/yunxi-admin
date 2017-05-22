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
import {
  HeadBarComponent,
  AccordionNavComponent,
  DatePickerComponent,
  SelectBoxComponent,
  CityPickerComponent,
  CityPickerServer
} from './com';
import {
  WorkbenchPageComponent,
  BarGraphPageComponent,

  WeizhangPageComponent,

  YoukaTaocanComponent,
  YoukaBindComponent,
  YoukaOrderComponent,
  YoukaRecordComponent,

  UserListComponent
} from './page';

// Providers
import {ApiRequest, ApiConfig, ApiCall} from './http';
import {FuncServer} from './serv/func.server';

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
    SelectBoxComponent,
    CityPickerComponent,

    // 工作台
    BarGraphPageComponent,
    WorkbenchPageComponent,

    // 违章管理
    WeizhangPageComponent,

    // 油卡管理
    YoukaTaocanComponent,
    YoukaBindComponent,
    YoukaOrderComponent,
    YoukaRecordComponent,

    // 会员管理
    UserListComponent
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    ApiRequest,
    ApiConfig,
    ApiCall,
    FuncServer,
    CityPickerServer
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
