import { OnInit, Injectable } from '@angular/core';
import Amplify, { Auth } from 'aws-amplify';
import { environment } from './../../environments/environment';
import { AmplifyService }  from 'aws-amplify-angular';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MyAuthService {

    private putTab: boolean;
    private syncTab: boolean;

    constructor(public amplifyService: AmplifyService){
        this.amplifyService.authStateChange$
        .subscribe(authState => {
            if ( authState.state === 'signedIn')  {
                this.isInAdminGroup();
                this.isInLcWriteGroup();
            } else {
                this.putTab = false;
                this.syncTab = false;
            }
        });

    }
    private isInAdminGroup(): void {
        this.syncTab = false;
        Auth.currentAuthenticatedUser()
        .then(user => {
            //console.log(JSON.stringify(user, null, '\t'));
            if ( user.signInUserSession.idToken.payload["cognito:groups"] )
                user.signInUserSession.idToken.payload["cognito:groups"].forEach( (bean)=>{ 
                    if ( bean === 'Admin' )
                        this.syncTab = true; 
                });
        })
        .then(data => {if(data) console.log("What!!!" + JSON.stringify(data));})
        .catch(err => {console.log(JSON.stringify(err));});
    }


    private isInLcWriteGroup(): void {
        this.putTab = false;
        Auth.currentAuthenticatedUser()
        .then(user => {
            //console.log(JSON.stringify(user, null, '\t'));
            if ( user.signInUserSession.idToken.payload["cognito:groups"] )
                user.signInUserSession.idToken.payload["cognito:groups"].forEach( (bean)=>{ 
                    if ( bean === 'lc-write' || bean === 'Admin' )
                        this.putTab = true; 
                });
        })
        .then(data => {if(data) console.log("What!!!" + JSON.stringify(data));})
        .catch(err => {console.log(JSON.stringify(err));});
    }

  public getPutTab(): Observable<boolean> {
      //console.log('HERE' + this.putTab);
      //See https://angular.io/tutorial/toh-pt4
      return of(this.putTab);
  }
  public getSyncTab(): Observable<boolean> {
      return of(this.syncTab);
  }

}
