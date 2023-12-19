import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp, getApps } from "firebase/app"
import {environment} from "../../environments/environment";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
@Injectable({
  providedIn: 'root'
})
export class FirebaseIntegrationService {
  app;
  auth;

  constructor() {
    if (getApps().length === 0) {
      this.app = initializeApp(environment.firebaseConfig);
    } else {
      this.app = getApps()[0];
    }
    this.auth = getAuth(this.app);
    console.log(`Initialized Firebase Application: ${this.app.name}`);
    setPersistence(this.auth, browserSessionPersistence).then(() =>
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
        } else {
          // User is signed out
          // ...
          console.log(`User isn't logged in, --Signing into developer@local.net`);
          signInWithEmailAndPassword(
            this.auth,
            environment.DeveloperEmailSignin,
            environment.DeveloperPasswordSignin
          ).then((userCredential) => {
          }).catch((error) => {
            console.log(`${error.code} - ${error.message}`)
          });
        }
      })
    );
  }
}
