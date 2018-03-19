
import { Directive, Component, OnInit, Input, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core'
import { Observable } from 'rxjs/Rx'

import { TrackingService } from '../Services/Tracking.service'
import { TrackComponent } from '../Track/Track.component'


/*
  This directive is used to form a template with which to dynamically
  add tracks to the view. I didn't want to create yet another file just
  for two lines of code when it was so tightly coupled to this file...
      see: https://angular.io/guide/dynamic-component-loader
 */
@Directive({ selector: '[tracking-view-directive]' })
export class TrackingViewDirective { constructor(public viewContainerRef: ViewContainerRef) { } }

/*
  This is the TrackingView component. It manages the collection of
  tracks to be viewed, the view's background (e.g., satellite imagery),
  and the means for a tracking engine to manipulate the tracks in
  real time.

  When mode is set to 'demo', the name of the game is displayed over
  the tracking display background.

  */
@Component({
  selector: 'tracking-view',
  template: `
  <div>
    <!-- The satellite view to be used as the backdrop to the tracking animation.-->
    <img src="assets/Canada.png" style="width: 100%; position: absolute; z-index: -1;">
   
    <!-- This SVG element represents the entire tracking content. -->
    <svg id='tracking-view' attr.width="{{viewSize()[0]}}" attr.height="{{viewSize()[1]}}">
      <g attr.transform="scale({{zoom()}})">    
        <!-- This template is used to dynamically add tracks. 
               see: https://angular.io/guide/dynamic-component-loader   -->
        <ng-template tracking-view-directive></ng-template>
      </g>
    </svg>
  </div>
  `,
  styles: []
})
export class TrackingViewComponent implements OnInit {

  constructor(private client                  : TrackingService
            , private componentFactoryResolver: ComponentFactoryResolver
            ) { }

  @ViewChild(TrackingViewDirective) trackTemplate: TrackingViewDirective
  
  @Input() mode : string = ""

  IsDemoMode()  : Boolean { return this.mode === 'demo' }

  demoTracks    : any = []
  tracks        : Array<TrackComponent> = new Array<TrackComponent>()
  pageWidth     : number = 300
  aspectRatio   : number = 2
  start         : number = 0

  viewSize() : Array<number> {
    return [this.pageWidth, this.pageWidth / this.aspectRatio]
  }
  zoom() : number {
    return this.pageWidth / 1000
  }

  ngOnInit()
  {
    Observable.interval(50).subscribe(period=>this.OnPeriodic(period))
    if (this.IsDemoMode())
    {
      this.client.getDemoTracks()
        .subscribe(
          data => { this.demoTracks = data as JSON [] },
          error => this.demoTracks = [])
    }  
  }

  OnPeriodic(period: number) 
  {
    this.pageWidth = document.body.clientWidth

    // Process demo tracks in the case we are running in demo mode...
    this.ProcessDemoTracks(period)
 
    // Update each loaded track...
    this.tracks.forEach(track => { track.Update(period, (period % 50) == 0) })
  }

  ProcessDemoTracks(period : number)
  {
   // If we are running in demo mode...
   if (this.IsDemoMode())
   {
      // Load up demo tracks on our sat view at their proper time...
      this.demoTracks.forEach(track => {

       // If it is time for track to appear...
       if (track.onTime === period - this.start)
       {       
         // Add the track...
         this.AddTrack(track)

         // If we just added a track to restart the demo...
         if ('restart' in track)
         {
           // Dump all tracks...
           this.trackTemplate.viewContainerRef.clear()
           while (this.tracks.pop() != null) {}

           // Adjust this.start to be two ticks in the future...
           this.start = period + 2
         }
       }
     })
   }
  }

  AddTrack(config:JSON): string 
  {
    /* 
        Angular has an issue with dynamically inserting components with SVG elements.
        The <DIV> tag is generated instead of the <svg:g> tag. To work around this,
        we provide the actual HTML/XML element for the component when we create it.

          see: https://github.com/angular/angular/issues/10404
    */
    // Create the Track component...
    let factory = this.componentFactoryResolver.resolveComponentFactory(TrackComponent)
    let element = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    let newTrack = factory.create(this.trackTemplate.viewContainerRef.injector, [], element)

    // Insert the Track component into the template...
    this.trackTemplate.viewContainerRef.insert(newTrack.hostView)

    // Cache the reference to the new Track component...
    this.tracks.push(newTrack.instance)

    // Configure the new Track component...
    newTrack.instance.Configure(config)

    // Return the new track's opaque identifier...
    return newTrack.instance.key
  }
}
