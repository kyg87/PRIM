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
import { CardModule} from '../components/card/card';
import { ButtonModule} from '../components/button/button';
import { GalleriaModule} from '../components/galleria/galleria';
import { BodygallComponent } from './bodygall/bodygall.component';

import { PanelModule } from '../components/panel/panel';
import { PaginatorModule } from '../components/paginator/paginator';
import { GrowlModule} from '../components/growl/growl';
import { SplitButtonModule} from '../components/splitbutton/splitbutton';
import { TableModule} from '../components/table/table';
import { ContentComponent } from './content/content.component';
import { AdsenseModule } from 'ng2-adsense';
import { AvSearchComponent } from './av-search/av-search.component';
import { EditorModule} from '../components/editor/editor';
import { BloggingComponent } from './blogging/blogging.component';
import { CodeHighlighterModule } from '../components/codehighlighter/codehighlighter';
import { LoginComponent } from './login/login.component';

import { UserService } from './user.service';
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";

import { SignupComponent } from './signup/signup.component';
import { CommentsComponent } from './comments/comments.component';
import { ToastrModule } from 'ngx-toastr';

export function getAuthServiceConfigs(){
  
}
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("263291575940-76n9mer2gvr59tc1n77a4uru5l7nfk24.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("162668791075308")
  }
]);

export function provideConfig() {
  return config;
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
    LoginComponent,
    SignupComponent,
    CommentsComponent
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
    SocialLoginModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [
      // { provide: LocationStrategy, useClass: HashLocationStrategy },
      CarService,CountryService,EventService,NodeService,
      {
        provide: AuthServiceConfig,
        useFactory: provideConfig,
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }