import { Component, Input } from '@angular/core';

@Component({
    selector: 'snippet',
    template: `<span [innerHTML]='code' [style.color]='color'></span>`
})
export class SnippetComponent {
    @Input() code: string;
    @Input() color: string = 'limegreen';
}