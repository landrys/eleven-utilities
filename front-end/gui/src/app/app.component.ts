import { Component, OnInit } from '@angular/core';
import Amplify from 'aws-amplify';
import { environment } from './../environments/environment';
import { MyAuthService } from './auth/myauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MyAuthService] 
})
export class AppComponent implements OnInit {

    // Needed to inject here so that it gets instantiated before we call it in other places since it
    // subscribes to the AmplifyService authenticate stuff. Services are ingletons.
    constructor ( public myAuthService: MyAuthService ) {};

    ngOnInit() {
        Amplify.configure(environment.amplify)
    }

    title = 'app';
}
