
// Framework...
import { Component, Input } from '@angular/core'

// Project components...
import { HomeComponent } from '../Home/Home.component'
import { SiteNavComponent } from '../SiteNav/SiteNav.component'
import { SiteFooterComponent } from '../SiteFooter/SiteFooter.component'
import { DocumentComponent } from '../Document/Document.component'
import { SituationRoomComponent } from '../SituationRoom/SituationRoom.component'

// Modal definitions...
import { ModalDemoComponent } from '../ModalDemo/ModalDemo.component'
import { ModalNotImplementedComponent } from '../ModalNotImplemented/ModalNotImplemented.component'

// Additional supporting libraries and frameworks...
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'



@Component({
  selector: 'app-root',
  template: `

    <!---------------------------------------------------------------
      site-nav provides a signal (event) by which we can receive the
      user's navigation selection from the navigation bar along the top.
      The signal is passed from site-nav.newNavState into $event where
      we cache it in this.newNavState for our own use in deciding which
      top level component will be made visible to the user.
    ---------------------------------------------------------------->
    <site-nav (newNavState)="this.newNavState = $event"></site-nav>

    <!--------------  Top Level Components (AKA web pages) -------------->
    <home *ngIf="this.newNavState === 'home' || this.newNavState === ''"></home>
    <situation-room *ngIf="this.newNavState === 'situation room'"></situation-room>
    <ggs-document *ngIf="this.newNavState === 'game rules'" title="Torrent Game Rules" doc="GameRules"></ggs-document>
    <ggs-document *ngIf="this.newNavState === 'team roles'" title="Torrent Team Roles" doc="TeamRoles"></ggs-document>


    <!--------------            The Footer                 -------------->
    <site-footer (newNavState)="this.newNavState = $event"></site-footer>


    <!--------------        Modal Definitions              -------------->
    <for-demo-purposes></for-demo-purposes>
    <not-implemented></not-implemented>


    <!--------------        ...that is all!                -------------->
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  // This state is set by the navigation component and is used to
  // decide which top level component should present to the user.
  newNavState = ""

}
