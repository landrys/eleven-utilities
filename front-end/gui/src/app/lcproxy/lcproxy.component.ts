import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { AmplifyService }  from 'aws-amplify-angular';
import { environment } from './../../environments/environment';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-lcproxy',
  templateUrl: './lcproxy.component.html',
  styleUrls: ['./lcproxy.component.css']
})
export class LcproxyComponent implements OnInit {

  form: FormGroup;
  result: string;

  constructor(public amplifyService: AmplifyService, private fb: FormBuilder){}

  ngOnInit() {
      this.form = this.fb.group({
          apiCall: this.fb.control('') // Here you can do things like validating input ( See cost comp. in Bigoooo)
      });

      this.result='Put in your query and press Go to see your result.';
  }

  submit(value) {

      let apiName = environment.aws.lcproxyApiName;
      let path = environment.lc.getPart;

      path += JSON.stringify(value.apiCall);
      path =  path.replace(/['"]+/g, '');
      //path = '';

      let myInit = { // OPTIONAL
          headers: {}, // OPTIONAL
          response: true, // OPTIONAL (return entire response object instead of response.data)
          queryStringParameters: {} // OPTIONAL
      }


      //let session = Auth.currentSession();
      //myInit.headers.Authorization = session.idToken;

      this.amplifyService.api().get(apiName, path, myInit).then(response => {
          this.result = JSON.stringify(response.data, null, 2);
      }).catch(error => {
          this.result = JSON.stringify(error);
      });
  }

}
