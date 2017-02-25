import { Component, OnInit, ViewChild, HostListener, QueryList, AfterViewInit } from '@angular/core';
import { AppService } from './app.service';
import { SnippetComponent } from './snippet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  modelCode = '';
  typeIndex = 0;
  viewCode = '';
  ready = false;
  private footer: HTMLElement;
  snippets: { code: string, color: string }[] = [];
  constructor(private service: AppService) { }

  ngOnInit() {
    this.service.getCode().subscribe(code => {
      this.modelCode += code.trim();
    });
  }

  ngAfterViewInit() {
    this.ready = true;
    this.footer = document.getElementById('footer');
  }

  @HostListener('document:keyup', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    if (this.ready) {
      if (this.typeIndex < this.modelCode.length) {
        const ff = AppComponent.getRandomGrouping();
        let s = this.modelCode.slice(this.typeIndex, this.typeIndex + ff);
        s = s.replace(/(?:\r\n|\r|\n)/g, '<br/>');
        s = s.replace(' ', '&nbsp;');
        this.typeIndex += ff;
        this.snippets.push({
          code: s,
          color: 'green'
        });
        this.footer.scrollIntoView(false);
      }
    }
  }

  static getRandomGrouping(max = 5): number {
    return Math.round(Math.random() * max);
  }
}
