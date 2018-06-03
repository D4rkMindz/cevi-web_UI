import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mat-editor',
  templateUrl: './mat-editor.component.html',
  styleUrls: ['./mat-editor.component.scss']
})
export class MatEditorComponent implements OnInit{
  @Input() public form: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    if (!('editor' in this.form.controls)) {
      console.warn('editor control required @MatEditorComponent <mat-editor [ERROR->][form]="">');
      return;
    }
  }
}
