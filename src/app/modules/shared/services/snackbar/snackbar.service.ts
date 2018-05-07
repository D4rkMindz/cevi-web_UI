import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { config } from '../../../../config/config';
import { __ } from '../../../../functions/translation';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

@Injectable()
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) {
  }

  /**
   * Show error message
   * @param {string} message
   * @param {string} action
   */
  public error(message: string, action?: string) {
    action = action || 'OK';
    this.snackbar.open(message, action, {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: config.defaults.snackbar.duration.error,
    });
  }

  /**
   * Show success message
   * @param {string} message
   * @param {string} action
   * @return {Promise<void>}
   */
  public async success(message: string, action?: string) {
    const key = <string>_('Great');
    action = action || await __(key);
    this.snackbar.open(message, action, {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: config.defaults.snackbar.duration.message
    });
  }

  /**
   * Report an error
   * @param {string} message
   * @param {string} page {Component Action} Z{Line Reference}
   * @param {string} code
   * @return {Promise<void>}
   */
  public async reportError(message: string, page: string, code: string) {
    const actionKey = <string> _('Report');
    const action = await __(actionKey);

    const snackbar = this.snackbar.open(message, action, {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: config.defaults.snackbar.duration.long
    });
    snackbar.onAction().subscribe(() => {
      const body = 'Hi \nI found an error @' + page + '. The Error Message is';
      const subject = 'ERRORREPORT ' + code;
      // TODO make link work
      const url = `mailto:error@cevi-web.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      alert('Thanks')
    });
  }
}
