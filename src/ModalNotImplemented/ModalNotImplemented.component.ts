import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'not-implemented',
  template: `
  <!-- Modal -->
  <div class="modal fade" id="ModalNotImplemented" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Not Implemented Yet!</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">The feature you are looking for has not yet been implemented.
        This modal dialog indicates that you did not fail to reach your intended destination by accident,
        but that the destination has simply not been authored yet.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`
})
export class ModalNotImplementedComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
