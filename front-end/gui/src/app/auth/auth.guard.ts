import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap, catchError } from 'rxjs/operators';
import { AmplifyService }  from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';

@Injectable()
export class AuthGuard implements CanActivate {

    private signedIn: boolean;

    constructor( public amplifyService: AmplifyService, private router: Router ) {

        this.amplifyService = amplifyService;
        this.router = router;

        this.amplifyService.authStateChange$
        .subscribe(authState => {
            this.signedIn = authState.state === 'signedIn';
            if (!authState.user) {
                console.log('Not Signed in.');
            } else {
                console.log('Signed in: ' + JSON.stringify(authState) );
            }
        });

    }

    async canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {


        if (!this.signedIn) {
            this.router.navigate(['/login']);
            return false;
        }

        if ( next.url.toLocaleString() === 'doc' ) {
            let user = await Auth.currentAuthenticatedUser();
            let allow = false
            if ( user.signInUserSession.idToken.payload["cognito:groups"] )
                user.signInUserSession.idToken.payload["cognito:groups"].forEach( (bean)=>{ 
                    if ( bean === 'docButton' ) {
                        console.log('Returning true!!');
                        allow = true; 
                    }
                });
            return allow;
        } else {
            return this.signedIn;
        }

    }

}
