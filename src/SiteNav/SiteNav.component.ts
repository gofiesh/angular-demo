import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'site-nav',
  template: `
    <nav class="navbar navbar-dark bg-dark">
      <nav class="nav  flex-column flex-sm-row"> 
        <!--<a (click)="this.newNavState.emit('home')"  class="navbar-brand" href="#">gO</a>-->
        <a (click)="this.newNavState.emit('home')" class="flex-sm-fill text-sm-center nav-link" href="#">Home</a>
        <a (click)="this.newNavState.emit('situation room')" class="flex-sm-fill text-sm-center nav-link" href="#">Situation Room</a>
        <a class="flex-sm-fill text-sm-center nav-link" href="#" data-toggle="modal" data-target="#ModalDemo">For Demo</a>
      </nav>
    </nav>    
  `
})
export class SiteNavComponent implements OnInit {

  // Issues the event to anyone looking at newNavState (e.g., <site-nav (newNavState)="...expression..."...>...)
  // expression can be f($event) or this.property = $event.
  @Output() newNavState: EventEmitter<string> = new EventEmitter<string>()


  constructor() { }

  ngOnInit() { }

}
