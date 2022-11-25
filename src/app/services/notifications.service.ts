import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
  } from '@capacitor/push-notifications';

import { LocalNotificationsPlugin, LocalNotifications, LocalNotificationDescriptor } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService implements OnInit{

  constructor(public platform: Platform,
              public authSvc: AuthService,
              public frSotre: FirestoreService,
              public router: Router,
              public http: HttpClient) {
                
                //this.stateUser();
                this.inicializar();
               }

  ngOnInit() {
    
  }

  inicializar(){
    if(this.platform.is('capacitor')){
      PushNotifications.requestPermissions().then(result => {
        console.log('PushNotifications.requestPermission()');
        if(result){
          console.log('permisos concedidos');
          PushNotifications.register();
          this.addListeners();
        }else{
          //Mostrar algún error
        }
      });
    }else{
      console.log('PushNotifications.requestPermission() -> no es movil');
    }
  }

  addListeners(){
    PushNotifications.addListener('registration',
    (token: Token) => {
      //this.guardarToken(token.value);
      console.log('The token is', token)
    });

    PushNotifications.addListener('registrationError',
    (error: any) => {
      console.log('Error on registration', error);
      }
    );

    PushNotifications.addListener('pushNotificationReceived',
    (notification:PushNotificationSchema) => {
      console.log('Push received:', notification);
      LocalNotifications.schedule({
        notifications: [
          {
            title: notification.title,
            body: notification.body,
            id: 1,
            extra: {
              data: notification.data
            }
          }
        ]
      });
    });

    PushNotifications.addListener('pushNotificationReceived',
    (notification: PushNotificationSchema) => {
      console.log('Push receive: ' + JSON.stringify(notification));
    })

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push action performed en segundo plano', notification);
        this.router.navigate(['/tab2']);
      });

    /*
      LocalNotifications.addListener('localNotificationActionPerformed',
    (notifications: ActionPerformed) => {
      console.log('Push action performed en primer plano:', notifications);
      this.router.navigate(['/tab2']);

    });
    */
  }
}
