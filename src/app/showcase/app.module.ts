import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { CarService } from './service/carservice';
import { CountryService } from './service/countryservice';
import { EventService } from './service/eventservice';
import { NodeService } from './service/nodeservice';
import { InstargallComponent } from './components/instargall/instargall.component';
import { DataViewModule } from '../components/dataview/dataview';
import {CardModule} from '../components/card/card';
import {ButtonModule} from '../components/button/button';
import {GalleriaModule} from '../components/galleria/galleria';
import { BodygallComponent } from './bodygall/bodygall.component';

import { PanelModule } from '../components/panel/panel';
import { PaginatorModule } from '../components/paginator/paginator';
import {GrowlModule} from '../components/growl/growl';
import {SplitButtonModule} from '../components/splitbutton/splitbutton';
import {TableModule} from '../components/table/table';
import { ContentComponent } from './content/content.component';
import { AdsenseModule } from 'ng2-adsense';
import { AvSearchComponent } from './av-search/av-search.component';
import {EditorModule} from '../components/editor/editor';
import { BloggingComponent } from './blogging/blogging.component';
import { CodeHighlighterModule } from '../components/codehighlighter/codehighlighter';
import { LoginComponent } from './login/login.component';

import { UserService } from './user.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function getAuthHttp(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerName: 'x-auth-token',
    noTokenScheme: true,
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('id_token')),
  }), http);
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InstargallComponent,
    BodygallComponent,
    ContentComponent,
    AvSearchComponent,
    BloggingComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DataViewModule,
    CardModule,
    ButtonModule,
    GalleriaModule,
    PanelModule,
    GrowlModule,
    SplitButtonModule,
    TableModule,
    PaginatorModule,
    EditorModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-2651262364281330',
      adSlot: 4461430600,
    }),
  ],
  providers: [
      // { provide: LocationStrategy, useClass: HashLocationStrategy },
      CarService,CountryService,EventService,NodeService,
      UserService,
      {
        provide: AuthHttp,
        useFactory: getAuthHttp,
        deps: [Http]
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }