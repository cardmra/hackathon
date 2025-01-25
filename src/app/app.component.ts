import { Component, OnInit } from '@angular/core';
import Amplify from 'aws-amplify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-cognito-app';

  ngOnInit() {
    Amplify.configure({
      Auth: {
        mandatorySignIn: true,
        region: 'us-east-1',
        userPoolId: 'us-east-1_kL8N2y7F3',
        userPoolWebClientId: '5069s2b9cq7v831uumml4lg4sh',
        authenticationFlowType: 'USER_PASSWORD_AUTH'
      }
    });
  }
  signOut() {
    Auth.signOut();
  }
}
