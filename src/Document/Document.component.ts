import { Component, OnInit, Input } from '@angular/core'
import { GameWebApiClientService } from '../Services/GameWebApiClient.service'

@Component({
  selector: 'ggs-document',
  template: `
  <div class="ggs-doc-background">
    <!-- We have to override the nav-pills background here to make it transparent -->
    <style>
      .nav-pills > a { font-size:10pt; color: rgb(64, 64, 64); }
      .nav-pills > .active { background-color: rgba(0, 0, 0, 0.1); }
    </style>
    <div class="container">
      <div class="row">
        <div class="column col-2">
        </div>
        <div class="column col-10">
          <h1 class="display-4">{{title}}</h1> 
        </div>
      </div>
      <div class="row">
        <div class="column col-2">
          <div class="nav flex-sm-column nav-pills" id="page-tab" role="tablist" aria-orientation="vertical">
            <a *ngFor="let page of pages; let i = index"
               class="nav-link {{getActive(i)}}"
               id="page-{{i}}-tab"
               data-toggle="pill"
               href="#page-{{i}}"
               role="tab"
               attr.aria-controls="page-{{i}}"
               attr.aria-selected="{{getTrue(i)}}">
               {{page.chapter}}
            </a>
          </div>
        </div>
        <div class="column col-10">
          <div class="tab-content" id="page-contents">
            <div *ngFor="let page of pages; let i = index"
                class="tab-pane fade {{getActive(i)}} {{getShow(i)}}"
                id="page-{{i}}"
                role="tabpanel"
                attr.aria-labelledby="page-{{i}}-tab"
                innerHTML={{page.text}}
                >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})
export class DocumentComponent implements OnInit {

  @Input() title : string
  @Input() doc : string
  pages : JSON

  constructor(private _client: GameWebApiClientService) { }

  getInitState(i, a, b) { return i === 0 ? a : b }
  getActive(i) { return this.getInitState(i, 'active', '') }
  getShow(i) { return this.getInitState(i, 'show', '') }
  getTrue(i) { return this.getInitState(i, 'true', 'false') }
  

  ngOnInit() 
  {
    this.onRefresh()
  }

  // Get game rules document
  onRefresh()
  {
    this._client.getDoc(this.doc)
        .subscribe(
            data => { this.pages = data['pages'] },
            error => this.doc = error)
  }
}
