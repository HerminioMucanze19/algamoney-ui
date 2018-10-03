import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
   <div *ngIf="temErro()" class="ui-message ui-messages-error">
    {{ texto }}
   </div>
  `,
  styles: [`
    .ui-messages-error{
      margin: 0;
      margin-top: 4px;
    }
  `]
})
export class MessageComponent {

  @Input() controle: FormControl;
  @Input() texto: string;
  @Input() error: string;

  temErro(): boolean {
    return this.controle.hasError(this.error) && this.controle.dirty;
  }

}
