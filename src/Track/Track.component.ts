
import { Component, OnInit, Input, Output } from '@angular/core';
import { v4 as uuid } from 'uuid';


@Component({
  selector: '[track]',
  template: `
    <svg:text text-anchor='left' font-size='11' attr.x='{{x + 6}}' attr.y='{{y - 24}}' attr.fill='{{color}}'  style='stroke-width: 0'>
      {{ident}}
    </svg:text>
    <svg:text text-anchor='left' font-size='11' attr.x='{{x + 6}}' attr.y='{{y - 14}}' attr.fill='{{color}}'  style='stroke-width: 0'>
      {{statAlt}}/{{statVel}}
    </svg:text>
    <svg:polyline *ngIf='this.tracer'
      stroke-dasharray='8,6'
      attr.points='{{path}} {{location}}'
      attr.stroke={{color}}
      style='fill: transparent; stroke-width: 1' />
    <svg:polygon *ngIf='this.symbol==="raptor"'
      attr.points='{{x}},{{y-7}}
      {{x+2}},{{y-2}}  {{x+2}},{{y}}    {{x+5}},{{y+2}} {{x+5}},{{y+3}} {{x+2}},{{y+4}} {{x+1}},{{y+5}}
      {{x-1}},{{y+5}}  {{x-2}},{{y+4}}  {{x-5}},{{y+3}} {{x-5}},{{y+2}} {{x-2}},{{y}}   {{x-2}},{{y-2}}'
      attr.transform='rotate({{head}} {{x}} {{y}} )'
      attr.fill={{fill}}
      attr.stroke={{color}}
      style='stroke-width: 1'/>
    <svg:polygon *ngIf='this.symbol==="bomber"'
      attr.points='{{x+1}},{{y-3}} {{x+8}},{{y+4}}   {{x+6}},{{y+6}}   {{x+3}},{{y+3}}  {{x}},{{y+6}}
                   {{x-3}},{{y+3}} {{x-6}},{{y+6}}   {{x-8}},{{y+4}}   {{x-1}},{{y-3}}'
      attr.transform='rotate({{head}} {{x}} {{y}} )'
      attr.fill={{fill}}
      attr.stroke={{color}}
      style='stroke-width: 1'/>
    <svg:circle *ngIf='this.symbol==="circle"'
      attr.cx='{{x}}'
      attr.cy='{{y}}'
      attr.r='{{radius}}'
      attr.fill={{fill}}
      attr.opacity={{opacity}}
      attr.stroke={{color}}
      style='stroke-width: 2'/>
    <svg:polygon *ngIf='this.symbol==="diamond"'
      attr.points='{{x-radius}},{{y+0}} {{x+0}},{{y-radius}} {{x+radius}},{{y+0}} {{x+0}},{{y+radius}}'
      attr.stroke={{color}}
      style='fill: transparent; stroke-width: 2' />
    <svg:polygon *ngIf='this.symbol==="square"'
      attr.points='{{x-radius}},{{y+radius}} {{x+radius}},{{y+radius}} {{x+radius}},{{y-radius}} {{x-radius}},{{y-radius}}'
      attr.stroke={{color}}
      style='fill: transparent; stroke-width: 2' />
    <svg:polygon *ngIf='this.symbol==="triangle"'
      attr.points='{{x+radius}},{{y-radius/2}} {{x+0}},{{y+radius}} {{x-radius}},{{y-radius/2}}'
      attr.stroke={{color}}
      style='fill: transparent; stroke-width: 2' />
      `,
  styles: []
})
export class TrackComponent implements OnInit 
{
  // JSON keys...
  WAYPOINT   = 'waypoint'
  LOCATION   = 'location'
  KEY        = 'key'
  IDENT      = 'ident'
  ALTITUDE   = 'altitude'
  CLIMB      = 'climb'
  TYPE       = 'type'
  TRACE      = 'trace'
  COLOR      = 'color'
  HEADING    = 'heading'
  VELOCITY   = 'velocity'
  PLAN       = 'plan'
  ACTIONS    = 'actions'
  EXPLODE    = 'explode'
  YIELD      = 'yield'
  

  // traits
  type      : string  = 'diamond'
  color     : string  = 'gray'
  path      : string  = ''
  
  // primary identifiers and stats...
  key       : string  = uuid()
  ident     : string  = ''
  statVel   : number  = 0
  statAlt   : number  = 0

  // performance information...
  velocity  : number  = 0
  altitude  : number  = 0
  climb     : number  = 0
  heading   : number  = 180
  xx        : number  = 100
  yy        : number  = 100

  // rendering support information
  radius    : number  = 9
  trace     : boolean = true
  x         : number  = this.xx
  y         : number  = this.yy
  head      : number  = this.heading
  
  // flight plan management
  legIndex  : number  = 0
  plan      : JSON [] = []
  enable    : boolean = true
  fill      : string = 'transparent'
  opacity   : number = 0
  
  // Explosive yields
  yieldRatio: number = 200
  yieldSm   : number  = 22
  yieldMd   : number  = 33
  yieldLg   : number  = 55

  // Explosive animation
  colorFill      = 255
  colorFillLimit = 20
  colorFillStep  = 2
  colorFillEnd   = 0
  alphaFill      = 1.0
  alphaFillLimit = 0.2
  alphaFillStep  = 0.003
  alphaFillEnd   = 0
  colorEdge      = 255
  colorEdgeLimit = 100
  colorEdgeStep  = 1
  colorEdgeEnd   = 0
  alphaEdge      = 1.0
  alphaEdgeLimit = 0.5
  alphaEdgeStep  = 0.003
  alphaEdgeEnd   = 0

  zoom = 1.0

  constructor() { }
  ngOnInit() { }

  get symbol() : string { return this.enable ? this.type : '' }
  get tracer() : boolean { return this.enable && this.trace }
  get location() : string { return this.x.toString() + ',' + this.y.toString() }

  ReadJson(j: JSON, k: string, d: any) { return k in j ? j[k] : d }
  ReadLeg(k: string, d: any) { return k in this.plan[this.legIndex] ? this.plan[this.legIndex][k] : d}

  public LoadFlightPlan(value : JSON []) 
  {
    this.plan = value
    this.legIndex = 0
  }

  public Configure(config: JSON ) : string
  {
    this.key       = this.ReadJson(config, this.KEY     , this.key       )
    this.type      = this.ReadJson(config, this.TYPE    , this.type      )
    this.ident     = this.ReadJson(config, this.IDENT   , this.ident     )
    this.climb     = this.ReadJson(config, this.CLIMB   , this.climb     )
    this.altitude  = this.ReadJson(config, this.ALTITUDE, this.altitude  )
    this.trace     = this.ReadJson(config, this.TRACE   , this.trace     )
    this.color     = this.ReadJson(config, this.COLOR   , this.color     )
    this.xx = this.x = this.LOCATION in config ? config[this.LOCATION][0] : this.xx
    this.yy = this.y = this.LOCATION in config ? config[this.LOCATION][1] : this.yy
    this.LoadFlightPlan(this.ReadJson(config, this.PLAN, []))
    return this.key
  }

  // TODO: Change from periodic ident to time and date...
  public Update(period : number, visualUpdate : boolean) 
  {

    // If we are done processing the entire flight plan...
    if (this.plan.length <= this.legIndex)
    {
      this.enable = false
      return
    }

    // Reference the current leg in the entire flight plan...
    var leg : any = this.plan[this.legIndex]

    // If this leg is to fly to a waypoint, then calculate the necessary heading...
    if (this.WAYPOINT in leg)
    {
      leg[this.HEADING] = Math.atan2(leg[this.WAYPOINT][0] - this.xx, this.yy - leg[this.WAYPOINT][1]) / 3.14159 * 180
    }

    // If this leg has a new heading, then apply it...
    if (this.HEADING in leg)
    {
      this.heading = leg[this.HEADING]
      this.path = this.path + ' ' + this.x.toString() + ',' + this.y.toString() + ' '
    }

    this.ProcessActions(leg)

    this.velocity = this.ReadLeg(this.VELOCITY, this.velocity)
    this.climb = this.ReadLeg(this.CLIMB, this.climb)
    this.altitude += this.climb

    // If moving the track reaches its waypoint, then go to next leg of flight plan...
    if (this.Move(leg))
      ++this.legIndex

    if (!visualUpdate)
      return
      
    this.statAlt = Math.trunc(this.altitude / 100)
    this.statVel = Math.trunc(this.velocity * 100)
    this.x = this.xx
    this.y = this.yy
    this.head = this.heading
  }


  Move(plan : JSON) : boolean
  {
    var nextLeg = false

    // If we have any velocity at all...
    if (this.velocity > 0)
    {
      // Calculate where the track will be next based upon its velocity and heading...
      var x = this.xx + this.velocity * Math.sin(this.heading * 3.14159 / 180)
      var y = this.yy - this.velocity * Math.cos(this.heading * 3.14159 / 180)

      // If we are heading to a waypoint...
      if (this.WAYPOINT in plan)
      {
        // simple references...
        var wx = plan[this.WAYPOINT][0]
        var wy = plan[this.WAYPOINT][1]

        // if we are passing our waypoint...
        if (this.xx <= wx && wx <= x || this.xx >= wx && wx >= x || this.yy <= wy && wy <= y || this.yy >= wy && wy >= y)
        {
          // move to the way point (don't pass it up)...
          // TODO: maybe remove this part and allow the track to pass by the waypoint?
          // x = wx;
          // y = wy;
          // reference the next leg in our flight plan...
          nextLeg = true
        }
      }
      else // otherwise, we go onto the next leg immediately...
      {
        nextLeg = true
      }

      // Move the object...
      this.xx = x
      this.yy = y
    }

    return nextLeg
  }

  ProcessActions(leg : any)
  {
    if (!(this.ACTIONS in leg))
      return;

    leg.actions.forEach(action => {
      if (this.EXPLODE in action)
      {
        this.colorFill = this.colorFill - (this.colorFill > this.colorFillLimit ? this.colorFillStep : this.colorFillEnd)
        this.alphaFill = this.alphaFill - (this.alphaFill > this.alphaFillLimit ? this.alphaFillStep : this.alphaFillEnd)
        this.colorEdge = this.colorEdge - (this.colorEdge > 100 ? 1     : 0)
        this.alphaEdge = this.alphaEdge - (this.alphaEdge > 0.5 ? 0.003 : 0)
        this.velocity = 0
        this.color = 'rgba(' + this.colorEdge +  ',' +  this.colorEdge + ',' +  this.colorEdge + ',' + this.alphaEdge + ')'
        this.fill = 'rgba(' + this.colorFill +  ',' +  this.colorFill + ',' +  this.colorFill + ',' + this.alphaFill + ')'
        this.trace = false
        this.type = 'circle'
        this.opacity = 50
        if (this.radius < action.explode.yield)
          this.radius += (action.explode.yield - this.radius) / this.yieldRatio
      }
    })
  }
}