import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { environment } from './../../environments/environment';
import { AmplifyService }  from 'aws-amplify-angular';

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.css']
})
export class UtilsComponent implements OnInit {

    private form1: FormGroup; private form2: FormGroup;
    private form3: FormGroup;
    private result: string;

  constructor(public amplifyService: AmplifyService, private fb: FormBuilder){}

  ngOnInit() {

      this.form1 = this.fb.group({
          treeTable: this.fb.control('') // Here you can do things like validating input ( See cost comp. in Bigoooo)
      });

      this.form2 = this.fb.group({
          treeTable: this.fb.control(''), // Here you can do things like validating input ( See cost comp. in Bigoooo)
          treeTableOptimized: this.fb.control('')
      });

      this.form3 = this.fb.group({
          radioGroup: this.fb.control('count') // Here you can do things like validating input ( See cost comp. in Bigoooo)
      });

      this.result='Supply data the press Go to see your result.';
  }

  submit1(value) {
      let apiName = environment.api.utility;
      let path = '';

      let myInit = { // OPTIONAL
          headers: {}, // OPTIONAL
          response: true, // OPTIONAL (return entire response object instead of response.data)
          queryStringParameters: {"function": environment.utils.fullPathNamefunction, "treeTable" : value.treeTable} // OPTIONAL
      }

      this.amplifyService.api().get(apiName, path, myInit).then(response => {
          console.log(response.data);
          this.result = "<h1>Result</h1><br>";;
          this.result += response.data;
      }).catch(error => {
          if ( error.response && error.response.data && error.response.data.message )
              this.result = error.response.data.message;
          else
              this.result = JSON.stringify(error, null, 2);
      });
  }

  submit2(value) {
      let apiName = environment.api.utility;
      let path = '';

      let myInit = { // OPTIONAL
          headers: {}, // OPTIONAL
          response: true, // OPTIONAL (return entire response object instead of response.data)
          queryStringParameters: {
              "function": environment.utils.optimizeTreeTablefunction, 
              "treeTable" : value.treeTable,
              "treeTableOptimized" : value.treeTableOptimized
          }
      }

      this.amplifyService.api().get(apiName, path, myInit).then(response => {
          console.log(response.data);
          this.result = "<h1>Result</h1><br>";;
          this.result += response.data;
      }).catch(error => {

          if ( error.response && error.response.data && error.response.data.message )
              this.result = error.response.data.message;
          else
              this.result = JSON.stringify(error, null, 2);

      });
  }

  submit3(value) {

      let apiName = environment.api.utility;
      let path = '';
      let queryStringParameters;

      if ( value.radioGroup === 'count' )  {
          queryStringParameters =  {
              "function": environment.utils.bikeItemAttributeNullCount
          };
      } else {
          queryStringParameters = {
              "function": environment.utils.bikeItemAttributeSyncer 
          };
      }

      let myInit = { // OPTIONAL
          headers: {}, // OPTIONAL
          queryStringParameters: queryStringParameters,
          response: true // OPTIONAL (return entire response object instead of response.data)
      }

      this.amplifyService.api().get(apiName, path, myInit).then(response => {
          console.log(response.data);
          this.result = "<h1>Result</h1><br>";;
          this.result += response.data;
      }).catch(error => {

          if ( error.response && error.response.data && error.response.data.message )
              this.result = error.response.data.message;
          else
              this.result = JSON.stringify(error, null, 2);

      });
  }





}
