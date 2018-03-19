import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'situation-room',
  template: `

  <tracking-view mode='demo'></tracking-view>

  `,
  styleUrls: ['./SituationRoom.component.css']
})
export class SituationRoomComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
