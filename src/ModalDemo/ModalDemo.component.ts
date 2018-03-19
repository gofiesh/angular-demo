import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'for-demo-purposes',
  template: `
  <!-- Modal -->
  <div class="modal fade" id="ModalDemo" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">For Demonstration (portfolio) Only</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>This web site was built to demonstrate full stack development of a game engine
          and user interface. This site could be a work in progress of an actual game, but
          it is offered at this time only as a demonstration of content design and implementation.
          For this reason, most links at the bottom are not real links, but are present
          only to demonstrate what would be considered reasonable content design.
          </p>
  
          <p>The front end is an SPA web client built on Angular 2 with Bootstrap 4 (beta).</p>
  
          <p>The back end holds the game engine and the repository, both accessed via RESTful
          API. The game engine also accesses the repository via REST API, making the REST API
          the repository interface, simplifying the use of Entity Framework to manage the data.
          The entire backend is built on .Net Core 2 Web Api using C# with EF Core 2.</p>

          <p>With this architecture, portions of, or all of, the backend could be replaced with 
          a Python solution using the Django Rest Framework.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`
})
export class ModalDemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
