import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Article } from '../../shared/services/article/Article';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { QualityLevelService } from '../../shared/services/quality/quality-level.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { config } from '../../../config/config';
import { UserDataService } from '../../shared/services/user/user-data.service';
import { toMarkdown } from '../../../functions/to-markdown';
import { StoragePlaceSelectionDialogComponent } from '../storage-place-selection-dialog/storage-place-selection-dialog.component';
import { toServerTime } from '../../../functions/to-server-time';
import { toDate } from '../../../functions/to-date';
import { UserInfoDialogComponent } from '../../user/user-info-dialog/user-info-dialog.component';
import { SnackbarService } from '../../shared/services/snackbar/snackbar.service';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { __ } from '../../../functions/translation';

@Component({
  selector: 'cevi-web-article-edit-dialog',
  templateUrl: './article-edit-dialog.component.html',
  styleUrls: ['./article-edit-dialog.component.scss']
})
export class ArticleEditDialogComponent {

  article: Article = null;
  form: FormGroup;
  description: FormControl;
  levels = [];
  lang: string;
  selectedQualityLevelId: string;
  replacementNeeded = false;


  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  /**
   * ArticleEditDialogComponent constructor
   * @param data
   * @param {FormBuilder} formBuilder
   * @param {TranslateService} translate
   * @param dialog
   * @param dialogRef
   * @param snackbar
   * @param qualityLevels
   * @param changeDetectorRef
   * @param user
   * @param media
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { article?: Article } | null,
              private formBuilder: FormBuilder,
              private translate: TranslateService,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<UserInfoDialogComponent>,
              private snackbar: SnackbarService,
              private qualityLevels: QualityLevelService,
              private changeDetectorRef: ChangeDetectorRef,
              private user: UserDataService,
              private media: MediaMatcher) {
    this.prepare();
    this.registerMobileQuery();
  }

  /**
   * Toggle replacement
   */
  toggleReplacement() {
    this.replacementNeeded = !this.replacementNeeded;
  }

  editStorageLocation() {
    this.dialog.open(StoragePlaceSelectionDialogComponent, {
      width: '80vw',
      data: this.data,
    });
  }

  async save() {
    let articleId = '';
    if (this.article) {
      articleId = `/${this.article.id}`;
    }

    const url = config.defaults.url.base + config.defaults.url.apiVersion + '/departments/' + this.user.department.id + '/articles' + articleId;
    const data = this.getChanges();
    if (Object.keys(data).length <= 0) {
      console.log('empty data. closing article edit dialog...');
      this.dialogRef.close();
      // this.dialog.closeAll();
      // const key = <string>_('Nothing changed');
      this.snackbar.success('Nothing changed');
      return;
    }
    console.log(data);
  }

  private getChanges() {
    const data = {};
    const controls = this.form.controls;
    if (!this.article) {
      data['title'] = controls['title'].value;
      data['description'] = toMarkdown(controls['editor'].value);
      data['quantity'] = controls['quantity'].value;
      data['quality'] = controls['quality'].value;
      data['purchase_date'] = toServerTime(controls['purchaseDate'].value);
      return data;
    }
    if (controls['title'].value !== this.article.title['name_' + this.lang]) {
      data['title'] = controls['title'].value;
    }
    const description = toMarkdown(controls['editor'].value);
    if (description !== this.article.description['name_' + this.lang].plain) {
      data['description'] = description;
    }
    if (controls['quantity'].value !== this.article.quantity) {
      data['quantity'] = controls['quantity'].value;
    }

    if (this.selectedQualityLevelId !== this.article.quality.id.toString()) {
      data['quality'] = parseInt(this.selectedQualityLevelId, 10);
    }
    const moment = toDate(controls['purchaseDate'].value);
    if (this.article.purchase_date.diff(moment)) {
      data['purchase_date'] = toServerTime(controls['purchaseDate'].value);
    }
    return data;
  }

  /**
   * Prepare
   * @returns {Promise<void>}
   */
  private async prepare() {
    this.lang = this.translate.currentLang;
    this.article = null;
    if ('article' in this.data) {
      this.article = this.data.article;
    }
    const hasArticle = this.article && 'id' in this.article;
    const description = hasArticle ? this.article.description['name_' + this.lang].parsed : '';
    this.description = new FormControl(description, [Validators.minLength(10), Validators.maxLength(2000)]);
    this.form = this.formBuilder.group({
      title: [hasArticle ? this.article.title['name_' + this.lang] : '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(80),
        ]
      ],
      editor: this.description,
      quantity: [hasArticle ? this.article.quantity : '', [Validators.required]],
      purchaseDate: [hasArticle ? this.article.purchase_date.toDate() : '', [Validators.required]],
      replacementUntil: [hasArticle ? this.article.replacement.date.toDate() : ''],
    });
    await this.loadQualityLevels();
    this.selectedQualityLevelId = hasArticle ? this.article.quality.id.toString() : '1';
    this.replacementNeeded = hasArticle ? (<boolean>this.article.replacement.needed) : false;
  }

  /**
   * Load quality levels
   * @returns {Promise<void>}
   */
  private async loadQualityLevels() {
    this.levels = [];
    const levels = await this.qualityLevels.loadAndGetQualityLevels();
    levels.sort((a, b) => {
      // sort by level
      return a.level < b.level ? -1 : (a.level > b.level ? 1 : 0);
    });
    levels.forEach((level) => {
      this.levels.push({id: level.id, level: level.level, name: level['name_' + this.lang]});
    });
  }

  /**
   * Register mobile query for screen width
   */
  private registerMobileQuery() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => {
      return this.changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


}
