import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp, getApps } from "firebase/app"
import {environment} from "../../environments/environment";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification, updateProfile, applyActionCode ,setPersistence, browserLocalPersistence, getIdToken, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase/compat";
import User = firebase.User;
import {Router} from "@angular/router";
import {APP_BASE_HREF} from "@angular/common";
import {from, map, mergeMap, tap} from "rxjs";
import {ApiIntegrationService} from "../API/api-integration.service";
@Injectable({
  providedIn: 'root'
})
export class FirebaseIntegrationService {
  app;
  auth;
  public user = null;
  public dev_mode = false;
  getResultMessage(err: string) {
    switch(err) {
      case "auth/invalid-email":
        return "Email specified is invalid."
      case "auth/invalid-credential":
        return "The email/password specified is incorrect."
      default:
        return "Unknown Error Occurred."
    }
  }

  private assignUser(user: User) {
    this.user = user;
    this.ApiIntegration.GetUserInformation().pipe(
      tap(_ => console.log("updated userdata"))
    ).subscribe(v => {this.user["db"] = v});
    if (user.uid == '3CSq75BgQ7VQga27d5ms4rtIu342') {
      this.dev_mode = true;
    }
    user["ranks"] = ['Gold', 'Silver', 'Bronze'];
    user["badges"] = ['token', 'military_tech', this.user.emailVerified ? "verified_user" : 'gpp_bad'];
  }

  constructor(private router: Router, private ApiIntegration: ApiIntegrationService) {
    if (getApps().length === 0) {
      this.app = initializeApp(environment.firebaseConfig);
    } else {
      this.app = getApps()[0];
    }
    this.auth = getAuth(this.app);
    //signOut(this.auth).then(r => {});
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        // @ts-ignore
        this.assignUser(user);
        //this.user["token"] = await this.getToken();
      } else {
        // User is signed out
        // ...
        //this.router.navigateByUrl("/");
      }
    });
  }

  public async LoginUser(email: string, password: string) {
    return await setPersistence(this.auth, browserLocalPersistence).then(()=> {
      return signInWithEmailAndPassword(
        this.auth,
        email,
        password
      ).then(async (userCredential) => {
        // @ts-ignore
        this.assignUser(userCredential.user);
       // this.user["token"] = await this.getToken();
        return "no-error";
      }).catch((error) => {
        return this.getResultMessage(error.code);
      });
    });
  }

  public async createUser(email: string, password: string, bio: string, displayName: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password).then((userCred) => {
      updateProfile(userCred.user, {displayName: displayName}).then((f) => {

        sendEmailVerification(userCred.user, {
          url:location.origin+"/email/verify",
        }).then((e) => {
          this.ApiIntegration.CreateUser(this.user?.uid, bio).then((e) => {
            e.subscribe((params)=> {
              // @ts-ignore
              this.assignUser(userCred.user);
            })
          })
        })
      });
      return "Success";
    }).catch((err) => {
      return `Error Occurred: ${err}`;
    });
  }

  public async verifyEmail(actionCode: string) {
    return await applyActionCode(this.auth, actionCode).then((resp) => {
      var u: User = this.user;
      console.log(resp)
      u.reload().then((f)=> {
        setTimeout(async function () {
          await this.router.navigateByUrl("/dashboard");
        }, 5000)
      })
      return "Success";
    }).catch((err)=>{
      console.log(err)
      return err.code;
    })
  }

  public async getToken() {
    var T = await this.getCurrentIdToken();
    return T;
  }

  public async sendEmailVerification(user: User) {
    console.log('trying to send email')
    return await sendEmailVerification(user, {
      url:location.origin+"/email/verify",
    }).then((e)=> { return "Success" }, (err)=> {
      return err.code;
    })
  }

  public isEmailVerified() {
    if (this.user) {
      return this.user.emailVerified;
    }
    return false;
  }

  public async signOut() {
    return await signOut(this.auth).then(() => {
      this.user = null;
      this.router.navigateByUrl("/")
    });
  }

  public getCurrentIdToken() {
    return new Promise((resolve, reject) => {
      const auth = this.auth;
      const unsubscribe = auth.onIdTokenChanged(user => {
        unsubscribe();
        if (user) {
          user.getIdToken().then(token => {
            resolve(token);
          });
        } else {
          reject(null);
        }
      }, reject);
    });
  }
}
