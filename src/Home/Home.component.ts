
import { Component, OnInit } from '@angular/core'

import { TrackingViewComponent } from '../TrackingView/TrackingView.component'
import { GameStatsComponent } from '../GameStats/GameStats.component'
import { timer } from 'rxjs/observable/timer'


@Component({
    selector: 'home',
    template: `
        <div class="no-padding" (window:resize)="onResize($event)" >
        <canvas id="canvas-banner">
        </canvas>
        </div>

        <div class="ggs-generic-padding ggs-background-1">
        Torrent is a strategic social game that takes the classic world conquest
        game to the next level.        
        Form teams with your friends to collaborate for the win. But realize that working
        together in a team is as much the game as defeating your opponents.
        </div>
        <div class="ggs-generic-padding  ggs-background-2">
        Create your dream team and be the strong and shrewd leader that you are.
        Invite your friends to be your generals, admirals, ambassadors, and spies.
        Master the art of persuasion and convince your generals to carry out your
        orders, for they alone command their military assets into war.
        </div>
        <div class="ggs-generic-padding ggs-background-1">
        With your strong leadership and political skills, you will lead your
        friends to world conquest. But watch your back! One of your friends may
        turn on you and try to topple your regime in a palace coup!
        The stakes are high, and the rewards are limitless. Friends, fame, and fortune
        await the next ruler of the world who knows how to negotiate alliances, defeat
        his enemies, and maintain political harmony and balance back at home.
        </div>

        <div class="no-padding">
            <game-stats>fetching data...</game-stats>
        </div>

        <div class="ggs-background-1 ggs-generic-padding" >
        <H4>Community Nuggets</H4>
        <p>
        The community will be able to participate in the evolution of Torrent as the game evolves.
        </p>
        <h6>Leader Board API</h6>
        <p>
        Plans are in the works for a published RESTful API to allow third parties
        to interact with the leader board and general statistics servers. Look for more
        information to come in the future.
        </p>
        <h6>Community Content</h6>
        <p>
        Eventually we intend to incorporate community content, such as maps and assets,
        into the game, extending the experience to include those of the players themselves.
        </p>
        </div>
    `,
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public banner : HTMLImageElement

    constructor() { }

    ngOnInit() 
    {
        this.banner = new Image()
        this.banner.src = 'assets/dustmap.png'
        var me : any = this
        this.banner.onload = function() { me.onResize(0) }
    }
    

    onResize(event) 
    {
        // get the dimensions of the page and the image...
        var pageWidth = document.body.clientWidth 
        var workingWidth = pageWidth * 2

        // For smaller pages, we want to readjust...
        if (pageWidth < 1000)
            workingWidth = pageWidth * 3
        if (pageWidth < 750)
            workingWidth = pageWidth * 4
        if (pageWidth < 600)
            workingWidth = pageWidth * 5

        // Don't allow gaps on the sides...
        if (workingWidth > this.banner.width)
            workingWidth = this.banner.width

        // Get the canvas object and size it appropriately...
        var canvas : HTMLCanvasElement = document.getElementById('canvas-banner') as HTMLCanvasElement
        canvas.height = this.banner.height/3
        canvas.width = pageWidth
        
        // Render the image...
        canvas.getContext('2d').drawImage(this.banner,
            // render a centered perspective of the image
            this.banner.width/2 - workingWidth/2, 0, workingWidth, this.banner.height,
            // render to the entire width of the browser page
            0, 0, pageWidth, this.banner.height/3        
        )
    }
}
