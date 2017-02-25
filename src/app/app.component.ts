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
        const ff = AppComponent.getRandomGroupingNumber();
        const c = AppComponent.getColor(ff);
        const s = AppComponent.rawToHTML(this.modelCode.slice(this.typeIndex, this.typeIndex + ff));
        this.typeIndex += ff;
        this.snippets.push({
          code: s,
          color: c
        });
        this.beEvil();
        this.footer.scrollIntoView(false);
      }
    }
  }

  beEvil(): void {
    if (this.typeIndex % 250 === 0) {
      switch (AppComponent.getRandomGroupingNumber()) {
        case 1:
          this.openWindow('https://news.ycombinator.com', false);
          return;
        case 2:
          this.openWindow('https://www.soylent.com/products/', true)
          return;
        case 3:
          this.openWindow('https://stupidhackathon.com/', true)
          return;
        case 4:
          this.openWindow('https://www.google.com/#safe=active&q=where+can+i+buy+teledildonics&*', true)
          return;
        case 5:
          this.openWindow('https://www.reddit.com/r/VaporwaveAesthetics/', true)
          return;
      }
    }
    if (this.typeIndex % 420 === 0) {
      this.openWindow('http://gentlecuts.net/wp-content/uploads/2012/01/%E3%83%AA%E3%82%B5%E3%83%95%E3%83%A9%E3%83%B3%E3%82%AF420-_-%E7%8F%BE%E4%BB%A3%E3%81%AE%E3%82%B3%E3%83%B3%E3%83%94%E3%83%A5%E3%83%BC.mp3', false)
    }
  }

  openWindow(url: string, asWindow: boolean): Window {
    const leftOffset = AppComponent.getRandomGroupingNumber() * 100;
    const topOffset = AppComponent.getRandomGroupingNumber() * 100;
    let opts: string;
    if (asWindow) {
      opts = [
        'height=420',
        'width=690',
        `left=${leftOffset}`,
        `top=${topOffset}`,
      ].join(',');
    } else {
      opts = '';
    }

    const ref = window.open(url, '', opts);
    window.focus();

    if (ref === null) {
      throw new Error('Could not open new window');
    } else {
      return ref;
    }
  }

  static rawToHTML(s: string): string {
    return s.replace(/(?:\r\n|\r|\n)/g, '<br/>').replace(' ', '&nbsp;');
  }

  static getRandomGroupingNumber(max = 5): number {
    return Math.round(Math.random() * max);
  }

  static getColor(n: number): string {
    switch (n) {
      case 1:
        return 'cornflowerblue';
      case 2:
        return 'coral';
      case 3:
        return 'palevioletred';
      case 4:
        return 'white';
      case 5:
        return 'limegreen';
      default:
        return 'limegreen';
    }
  }
}
