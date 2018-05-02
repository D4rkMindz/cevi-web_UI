import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../shared/services/storage/local-storage.service';
import {Router} from '@angular/router';
import {UserDataService} from '../../shared/services/user/user-data.service';
import {CredentialsService} from '../../shared/services/authentication/credentials.service';

@Component({
  selector: 'cevi-web-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private localStorage: LocalStorageService,
              private router: Router,
              private userData: UserDataService,
              private credentials: CredentialsService) {
    console.log('LogoutComponent::constructor');
  }

  ngOnInit() {
    console.log('LogoutComponent::ngOnInit');
    this.userData.clear();
    this.credentials.clear();
    this.localStorage.clear().then(() => {
      this.router.navigate(['/hello']);
    });
  }

}
