import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { AmplifyService }  from 'aws-amplify-angular';
import { environment } from './../../environments/environment';
import { Auth } from 'aws-amplify';
import { MyAuthService } from '../auth/myauth.service';
import * as querystring from 'querystring';

@Component({
  selector: 'app-lcproxy',
  templateUrl: './lcproxy.component.html',
  styleUrls: ['./lcproxy.component.css']
})
export class LcproxyComponent implements OnInit {

  formGet: FormGroup;
  formPut: FormGroup;
  result: string;
  putTab: boolean;

  constructor(public myAuthService: MyAuthService, public amplifyService: AmplifyService, private fb: FormBuilder){}

  ngOnInit() {
      
      this.myAuthService.getPutTab().subscribe((passedPutTab) => {this.putTab = passedPutTab;});

      this.formGet = this.fb.group({
          getApiCall: this.fb.control('') // Here you can do things like validating input ( See cost comp. in Bigoooo)
      });

      this.formPut = this.fb.group({
          putApiCall: this.fb.control(''),
          putPayload: this.fb.control('') // Here you can do things like validating input ( See cost comp. in Bigoooo)
      });

      this.result='Put in your query and press Go to see your result.';
  }

  submitGet(value) {

      let apiName = environment.api.lcproxy;
      let param = {"lcQuery": encodeURIComponent(value.getApiCall)};

      let myInit = { // OPTIONAL
          headers: {}, // OPTIONAL
          response: true, // OPTIONAL (return entire response object instead of response.data)
          queryStringParameters: param 
      }


      // No path, passed in as ''
      this.amplifyService.api().get(apiName, '', myInit).then(response => {
          this.result = JSON.stringify(response.data, null, 2);
      }).catch(error => {
          if ( error.response && error.response.data && error.response.data.message )
              this.result = error.response.data.message;
          else
              this.result = JSON.stringify(error, null, 2);
      });



  }

  submitPut(value) {

      let apiName = environment.api.lcproxy;

      let path = JSON.stringify(value.putApiCall);
      path = "/" + path + "/";
     
      path =  path.replace(/['"]+/g, '');

      let cleanMe = value.putPayload.trim();
      let myList = cleanMe.split(';');;

      myList.forEach( (data)=> {
          console.log(data);

          path = path + data.id;

          let myInit = { // OPTIONAL
              body: JSON.parse(data), 
              response: true, // OPTIONAL (return entire response object instead of response.data)
          }

          this.amplifyService.api().put(apiName, path, myInit).then(response => {
              this.result = JSON.stringify(response.data, null, 2);
          }).catch(error => {
              if ( error.response && error.response.data && error.response.data.message )
                  this.result = error.response.data.message;
              else
                  this.result = JSON.stringify(error, null, 2);
          });

      });
      /*
      let myInit = { // OPTIONAL
          body: JSON.parse(value.putPayload), 
          headers: {}, // OPTIONAL
          response: true, // OPTIONAL (return entire response object instead of response.data)
          queryStringParameters: {} // OPTIONAL
      }

      this.amplifyService.api().put(apiName, path, myInit).then(response => {
          this.result = JSON.stringify(response.data, null, 2);
      }).catch(error => {
          if ( error.response && error.response.data && error.response.data.message )
              this.result = error.response.data.message;
          else
              this.result = JSON.stringify(error, null, 2);
      });
     */
  }



}
