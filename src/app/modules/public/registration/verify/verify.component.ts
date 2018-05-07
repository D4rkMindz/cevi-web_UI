import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../shared/services/http/http.service';
import { config } from '../../../../config/config';
import { SnackbarService } from '../../../shared/services/snackbar/snackbar.service';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { __ } from '../../../../functions/translation';

@Component({
  selector: 'cevi-web-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpService, private router: Router, private snackbar: SnackbarService) {
  }

  async ngOnInit() {
    const hash = this.route.snapshot.params['hash'];

    const data = {
      email_token: hash,
    };
    const url = config.defaults.url.base + config.defaults.url.apiVersion + '/users/verify';
    const response = <any>await this.http.post(url, data);
    console.log(response);
    if ('verified' in response && response.verified) {
      const successkey = <string>_('Verified email successfully');
      this.snackbar.success(await __(successkey));
      this.router.navigate(['/home']);
    } else {
      const messageKey = <string>_('Verifying email failed. Is your verification email older than 15 minutes?\n' +
        'Try to renew the email verification in "Your Account"');
      this.snackbar.error(await __(messageKey));
    }
  }

}
