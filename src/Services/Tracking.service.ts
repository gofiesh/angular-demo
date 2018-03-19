

import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'



@Injectable()
export class TrackingService {
    
    private useLocalJsonFiles : boolean = true;
    
    
    //////////////////////   Specific API Calls    ///////////////////////
    
    getDemoTracks():Observable<{}> {
    
        var target = this.useLocalJsonFiles 
            ? 'assets/ApiDemoTracks.json' 
            : 'http://localhost:55555/api/tracks/demo/';
    
        return this.http.get(target)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    
    //////////////////////   Common Implementation    ///////////////////////
    constructor(private http:Http) {
    }
    
    
    private extractData(res:Response) {
        let body = res.json()
        console.log('extracting json: ' + JSON.stringify(body))
        return body || {}
    }
    
    private handleError(error:any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error'
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg)
    }
}

