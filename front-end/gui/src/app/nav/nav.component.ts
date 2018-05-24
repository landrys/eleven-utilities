import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AmplifyService }  from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  private docButton : boolean;
  private lcProxyButton : boolean;
  private utilsButton : boolean;

  constructor(public amplifyService: AmplifyService, private router: Router) { 
        this.amplifyService.authStateChange$
        .subscribe(authState => {
            if ( authState.state === 'signedIn')  {
                this.isInDocButtonGroup();
                this.lcProxyButton = true;
                this.utilsButton = true;
            } else {
                this.docButton = false;
                this.lcProxyButton = false;
                this.utilsButton = false;
            }
        });
  }

  ngOnInit() {
      this.docButton = false;
      this.lcProxyButton = false;
      this.utilsButton = false;
  } 

  btnClick= function (place: string) {
      this.router.navigateByUrl('/' + place);
  };

  isInDocButtonGroup(): void {
      Auth.currentAuthenticatedUser()
      .then(user => {
          if ( user.signInUserSession.idToken.payload["cognito:groups"] )
              user.signInUserSession.idToken.payload["cognito:groups"].forEach( (bean)=>{ 
                  if ( bean === 'docButton' )
                      this.docButton = true; 
              });
      })
      .then(data => {if(data) console.log(JSON.stringify(data));})
      .catch(err => {console.log(JSON.stringify(err));});
  }

}
