import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'site-footer',
  template: `
  <div class="ggs-footer">
    <div class="row">
      <div class="col-8">
        <category-links (newNavState)="this.newNavState.emit($event)"></category-links>
      </div>
      <div class="col-1" ></div>
    </div>
    <div>
      <hr color=#e0d0b0 size=1px >
    </div>
    <div>
      <copyright></copyright>
    </div>
        

  </div>`
})
export class SiteFooterComponent implements OnInit {

  // Issues the event to anyone looking at newNavState (e.g., <site-nav (newNavState)="...expression..."...>...)
  // expression can be f($event) or this.property = $event.
  @Output() newNavState: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }
  ngOnInit() { }

}
