import { Component, OnInit } from '@angular/core';
import {config} from '../../../config/config';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {UserDataService} from '../../shared/services/user/user-data.service';
import {MatDialog} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {UserInfoDialogComponent} from '../user-info-dialog/user-info-dialog.component';

@Component({
  selector: 'cevi-web-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  public lang: string = config.defaults.language.default;
  public gender: BehaviorSubject<string> = new BehaviorSubject<string>('');

  /**
   * UserComponent constructor
   * @param {UserDataService} user
   * @param {MatDialog} dialog
   * @param {TranslateService} translate
   */
  constructor(public user: UserDataService,
              private dialog: MatDialog,
              private translate: TranslateService) {
    this.registerLanguageChange();
    this.registerGenderChange();
  }

  /**
   * Edit user
   */
  public editUser() {
    const dialogRef = this.dialog.open(UserInfoDialogComponent, {
      width: '80%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    });
  }

  /**
   * Register language change
   */
  private registerLanguageChange() {
    this.lang = this.translate.currentLang.slice(0, 2);
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang['lang'];
      const val = this.user.gender['name_' + this.lang];
      this.gender.next(val);
    });
  }

  /**
   * register gender change
   */
  private registerGenderChange() {
    const gender = this.user.gender['name_' + this.lang];
    this.gender.next(gender);
    this.user.genderObs.subscribe(gend => {
      const val = gend['name_' + this.lang];
      this.gender.next(val);
    });
  }
}
