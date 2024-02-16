import {AfterContentInit, Component} from '@angular/core';
import {FirebaseIntegrationService} from "../Firebase/firebase-integration.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent implements AfterContentInit {
  constructor(private _auth: FirebaseIntegrationService, private formBuilder: FormBuilder) {
  }

  ngAfterContentInit(): void {
    this.userDetails.controls.bio.patchValue(this._auth.user?.db?.biography || "")
    this.userDetails.controls["avatarUrl"].patchValue(this._auth.user?.photoURL || "");
    this.userDetails.controls["selectedAwards"].patchValue(this._auth.user?.ranks || []);
    this.userDetails.controls["selectedBadges"].patchValue(this._auth.user?.badges || []);
    console.log(this.userDetails)
  }

  settingsForm = new FormGroup(
    {
      bio: new FormControl("", Validators.required),
    }
  );

  userDetails = new FormGroup({
    bio: new FormControl("", Validators.required),
    avatarUrl: new FormControl("", Validators.required),
    selectedBadges: new FormControl("", Validators.required),
    selectedAwards: new FormControl("", Validators.required),
    discordLink: new FormControl("", Validators.required)
  });

  badges = ['token', 'military_tech', "verified_user", 'gpp_bad']; // Replace with your badge options
  awards = ['Gold', 'Silver', 'Bronze']; // Replace with your award options


  security = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  // Privacy and 2FA data models go here
  getUserProfilePic() {
    return this._auth.user?.photoURL || ""
  }
  saveUserDetails() {
    // Implement logic to save user details
    console.log('User details saved!');
  }

  saveSecurityChanges() {
    // Implement logic to save security changes
    console.log('Security changes saved!');
  }

  savePrivacyChanges() {
    // Implement logic to save privacy changes
    console.log('Privacy changes saved!');
  }

  save2FAChanges() {
    // Implement logic to save 2FA changes
    console.log('2FA changes saved!');
  }

  verifyDiscordLink() {

  }

  onAvatarChange($event: Event) {

  }
}
