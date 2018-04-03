import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
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
import {GrowlModule} from '../components/growl/growl';
import {SplitButtonModule} from '../components/splitbutton/splitbutton';
import {TableModule} from '../components/table/table';
import { ContentComponent } from './content/content.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InstargallComponent,
    BodygallComponent,
    ContentComponent
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
    TableModule
  ],
  providers: [
      { provide: LocationStrategy, useClass: HashLocationStrategy },
      CarService,CountryService,EventService,NodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }