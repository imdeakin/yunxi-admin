import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';

// App is our top level component
import { AppComponent } from './app.component';
import { HeadBarComponent } from './com/head-bar';
import { AccordionNavComponent } from './com/accordion-nav';

// Providers
import { ApiRequest, ApiConfig, ApiCall } from './http';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    imports: [ // import Angular's modules
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules})
    ],
    declarations: [
        AppComponent,
        HeadBarComponent,
        AccordionNavComponent
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,
        ApiRequest,
        ApiConfig,
        ApiCall,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
