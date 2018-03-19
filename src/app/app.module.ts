

import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import {HttpModule} from '@angular/http'


import { TrackingService } from '../Services/Tracking.service'
import { GameWebApiClientService } from '../Services/GameWebApiClient.service'

import { AppComponent } from './app.component'
import { HomeComponent } from '../Home/Home.component'
import { GameStatsComponent } from '../GameStats/GameStats.component'
import { SiteNavComponent } from '../SiteNav/SiteNav.component'
import { SiteFooterComponent } from '../SiteFooter/SiteFooter.component'
import { SituationRoomComponent } from '../SituationRoom/SituationRoom.component'
import { ModalDemoComponent } from '../ModalDemo/ModalDemo.component'
import { ModalNotImplementedComponent } from '../ModalNotImplemented/ModalNotImplemented.component'
import { CopyrightComponent } from '../Copyright/Copyright.component'
import { CategoryLinksComponent } from '../CategoryLinks/CategoryLinks.component'
import { DocumentComponent } from '../Document/Document.component'
import { TrackComponent } from '../Track/Track.component'
import { TrackingViewComponent, TrackingViewDirective } from '../TrackingView/TrackingView.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameStatsComponent,
    SiteNavComponent,
    SiteFooterComponent,
    SituationRoomComponent,
    ModalDemoComponent,
    ModalNotImplementedComponent,
    CopyrightComponent,
    CategoryLinksComponent,
    DocumentComponent,
    TrackComponent,
    TrackingViewDirective,
    TrackingViewComponent
],
  imports: [
    BrowserModule,
    HttpModule,
  ],
  providers: [
    GameWebApiClientService,
    TrackingService
  ],

  entryComponents: [TrackComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }


