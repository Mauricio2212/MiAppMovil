import { Component } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { AuthService } from './services/auth.service'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private svcAuth: AuthService
  ) {
  }
}

