import { Component, Input } from '@angular/core';

@Component({
    selector: 'snippet',
    template: '<span [innerHTML]="code"></span>'
})
export class SnippetComponent {
    @Input() code: string = '';
    @Input() color = 'green';
}