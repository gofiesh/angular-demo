

import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'


@Injectable()
export class GameWebApiClientService {

    private useLocalJsonFiles : boolean = true
    private repositoryIpAddress : string = "24.94.75.88"


    //////////////////////   Specific API Calls    ///////////////////////

    getFullGameDetails(deep: string, max: number):Observable<{}> {

        var target = this.useLocalJsonFiles 
            ? 'assets/ApiGame.json' 
            : 'http://localhost:55555/api/game/' + deep + '/' + max

            console.log('looking for game data @ "' + target + '"')

        return this.http.get(target)
            .map(this.extractData)
            .catch(this.handleError)
    }


    getGame():Observable<{}> {
        var target = this.useLocalJsonFiles 
            ? 'assets/ApiGame.json'
            : 'http://localhost:55555/api/game'
        return this.http.get(target)
            .map(this.extractData)
            .catch(this.handleError)
    }
    

    getDoc(docName: string):Observable<{}> {
        var target = this.useLocalJsonFiles 
            ? 'assets/ApiDoc.' + docName + '.json' 
            : 'http://localhost:55555/doc/' + docName
        return this.http.get(target)
            .map(this.extractData)
            .catch(this.handleError)
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