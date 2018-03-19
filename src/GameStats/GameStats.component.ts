
import { Component, OnInit } from '@angular/core'
import { GameWebApiClientService } from '../Services/GameWebApiClient.service'


@Component({
  selector: 'game-stats',
  template: `
  <div class="ggs-main-background ggs-generic-padding" >
    <h2 class="align-center">Games In Progress</h2>  
    <div class="container">
      <div class="row">
        <div class="col-md">Total Games : {{gameData.length}}</div>
        <div class="col-sm"></div>
        <div class="col-sm"></div>
        <div class="col-sm"> 
          <div class="input-group mb-3">
            <input type="text" #maxGames (keyup)="onMax(maxGames.value)" class="form-control" placeholder="(max games)">
            <div class="input-group-append">
              <button (click)="onRefresh()" class="btn btn-secondary" type="button">Refresh</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container ggs-table-body">
        <div class="row ggs-table-header">
          <div class="col-md">Title of Game</div>
          <div class="col-sm">Server</div>
          <div class="col-sm">Time in Play</div>
          <div class="col-sm">Teams</div>
        </div>
        <div class="row"  *ngFor="let f of gameData">
          <div class="col-sm">{{f['gameTitle']}}</div>
          <div class="col-sm"><div class="badge badge-secondary">{{f['serverIpAddress']}}</div></div>
          <div class="col-sm"><div class="badge badge-secondary">4 days, 14 hours</div></div>
          <div class="col-sm"><div class="badge badge-info badge-pill">{{f['teams'].length}}</div></div>
        </div>
    </div>
  </div>
  `
})
export class GameStatsComponent implements OnInit {

  total : number = 0
  maxGames: number = 3
  gameData : JSON[] = []
 
  constructor(private _client: GameWebApiClientService) { }

  
  ngOnInit()
  {
    // Refresh the data when we first come up...
    this.onRefresh() 
  }
  
  // Update the max number of games that we will show...
  onMax(i) { this.maxGames = i }

  // Get game details to the team level...
  onRefresh()
  {
      this._client.getFullGameDetails('team', this.maxGames)
          .subscribe(
              data => { this.gameData = data as JSON [] },
              error => this.gameData = [<any>error])
  }
}
