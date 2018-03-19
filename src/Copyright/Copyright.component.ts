import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'copyright',
  template: `
    <div class="row">
      <div class="col-sm">
        <span class="copyright">© 2018 Greg Ofiesh</span>
      </div>
      <div class="col-sm">
        <a href="#" data-toggle="modal" data-target="#ModalDemo">For Demo Purposes</a>
      </div>
      <div class="col-sm" >
      </div>
      <div class="col-sm" >
      </div>
      <div class="col-sm" >
      </div>
      <div class="col-sm" >
      </div>
    </div>
    `,
  styleUrls: ['./Copyright.component.css']
})
export class CopyrightComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
