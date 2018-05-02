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
}
