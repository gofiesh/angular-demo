import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'category-links',
  template: `
  <div class="row">
    <div class="col-sm" >    
      <h6>Torrent</h6>
      <span style="color : rgb(100, 100, 200)">
           Registration
      <br/>My Teams
      <br/>My Assets
      <br/>Play Torrent
      </span>
      <br/><a (click)="this.newNavState.emit('game rules')" href="#">Game Rules</a>
      <br/><a (click)="this.newNavState.emit('team roles')" href="#">Team Roles</a>
      <br/>
      <br/>
    </div>
    <div class="col-sm" >
      <h6>Community</h6>
      <span style="color : rgb(100, 100, 200)">
           Forums
      <br/>Contributing Maps
      <br/>Contributing Assets
      <br/>
      <br/>
      </span>
    </div>
    <div class="col-sm" >
      <h6>Resources</h6>
      <span style="color : rgb(100, 100, 200)">
           The Roadmap
      <br/>Developer API
      <br/>Available Maps
      <br/>
      <br/>
      </span>
    </div>
    <div class="col-sm" >
      <h6>Help</h6>
      <span style="color : rgb(100, 100, 200)">
           Support
      <br/>Purchases
      <br/>Contact Us
      <br/>
      <br/>
      </span>
    </div>
  </div>
  `
})
export class CategoryLinksComponent implements OnInit {

  // Issues the event to anyone looking at newNavState (e.g., <site-nav (newNavState)="...expression..."...>...)
  // expression can be f($event) or this.property = $event.
  @Output() newNavState: EventEmitter<string> = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
  }

}
