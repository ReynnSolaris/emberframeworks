import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp, getApps } from "firebase/app"
import {environment} from "../../environments/environment";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification, applyActionCode ,setPersistence, browserLocalPersistence, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase/compat";
import User = firebase.User;
import {Router} from "@angular/router";
import {APP_BASE_HREF} from "@angular/common";
@Injectable({
  providedIn: 'root'
})
export class FirebaseIntegrationService {
  app;
  auth;
  public user = null;

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
    user["ranks"] = ['Gold', 'Silver', 'Bronze'];
    user["badges"] = ['token', 'military_tech', this.user.emailVerified ? "verified_user" : 'gpp_bad'];
  }

  constructor(private router: Router) {
    if (getApps().length === 0) {
      this.app = initializeApp(environment.firebaseConfig);
    } else {
      this.app = getApps()[0];
    }
    this.auth = getAuth(this.app);
    //signOut(this.auth).then(r => {});
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // @ts-ignore
        this.assignUser(user);
      } else {
        // User is signed out
        // ...
        this.router.navigateByUrl("/");
      }
    });
  }

  public async LoginUser(email: string, password: string) {
    return await setPersistence(this.auth, browserLocalPersistence).then(()=> {
      return signInWithEmailAndPassword(
        this.auth,
        email,
        password
      ).then((userCredential) => {
        // @ts-ignore
        this.assignUser(userCredential.user);
        return "no-error";
      }).catch((error) => {
        return this.getResultMessage(error.code);
      });
    });
  }

  public async createUser(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password).then((userCred) => {
      // @ts-ignore
      this.assignUser(userCred.user);
      sendEmailVerification(userCred.user, {
        url:location.origin+"/email/verify",
      }).then((e)=> { })
      return "Success";
    }).catch((err) => {
      return `Error Occurred: ${err}`;
    });
  }

  public async verifyEmail(actionCode: string) {
    return await applyActionCode(this.auth, actionCode).then((resp) => {
      var u: User = this.user;
      u.reload().then((f)=> {
        setTimeout(function () {
          this.router.navigateByUrl("/dashboard");
        }, 5000)
      })
      return "Success";
    }).catch((err)=>{
      return err.code;
    })
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
}
