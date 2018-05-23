import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap, catchError } from 'rxjs/operators';
import { AmplifyService }  from 'aws-amplify-angular';

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

    canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (!this.signedIn) {
            this.router.navigate(['/login']);
        }

        return this.signedIn;

    }
}
