import { Component, OnInit } from '@angular/core';
import { AmplifyService }  from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

     private loggedIn;

    /*
     private signedIn;
     private amplifyService;
    */


    constructor( ){
      }
  ngOnInit() {
      Auth.currentAuthenticatedUser()
        .then(user => {
            this.loggedIn = true;
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));

  }

  signOut() {
      console.log("Signing out...");
      Auth.signOut()
      .then(data => {console.log(data); this.loggedIn = false;})
      .catch(err => console.log(err));
  }

/*
  constructor( public amplifyService: AmplifyService ) {
      this.amplifyService = amplifyService;
  }
 

  ngOnInit() {
          this.amplifyService.authStateChange$
          .subscribe(authState => {
              this.signedIn = authState.state === 'signedIn';
              if (!authState.user) {
                  this.user = null;
                  this.greeting = 'We are NOT signed in!!';
              } else {
                  this.user = authState.user;
                  this.greeting = "Hello " + this.user.username;
              }
          });
      }
  }
 */
}
