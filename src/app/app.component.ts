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
  gotSegFault = false;
  constructor(private service: AppService) { }

  ngOnInit() {
    const codeUrls = [
      'https://raw.githubusercontent.com/LOZORD/xanadu/master/src/game/actions.ts',
      'https://raw.githubusercontent.com/torvalds/linux/master/net/batman-adv/distributed-arp-table.c',
      'https://raw.githubusercontent.com/c00kiemon5ter/ioccc-obfuscated-c-contest/master/2013/morgan1/morgan1.c'
    ];
    this.service.getCode(AppComponent.getRandomArrayValue(codeUrls)).subscribe(code => {
      this.modelCode += code.trim();
    });
  }

  ngAfterViewInit() {
    this.ready = true;
    this.footer = document.getElementById('footer');
  }

  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    if (this.gotSegFault) {
      this.ready = false;
      alert('Well this is shit no one needs...')
      setTimeout(() => location.reload(), 3000)
    }
    if (this.ready) {
      if (this.typeIndex < this.modelCode.length) {
        const ff = AppComponent.getRandomGroupingNumber();
        const c = AppComponent.getColor();
        const s = AppComponent.rawToHTML(this.modelCode.slice(this.typeIndex, this.typeIndex + ff));
        this.typeIndex += ff;
        this.snippets.push({
          code: s,
          color: c
        });
        if (this.typeIndex > 0) {
          this.beEvil();
        }
        this.footer.scrollIntoView(false);
      }
    }
  }

  beEvil(): void {
    if (this.typeIndex % 200 === 0) {
      const urls = [
        'https://news.ycombinator.com',
        'https://www.soylent.com/products/',
        'https://stupidhackathon.com/',
        'https://www.google.com/#safe=active&q=where+can+i+buy+teledildonics&*',
        'https://www.reddit.com/r/VaporwaveAesthetics/',
        'https://www.google.com/#safe=active&q=should+i+use+haskell&*',
        'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/14572845_1133764806716757_5142509850974282045_n.png?oh=54374a19491c65c8dc748cc509f39956&oe=59712EF8',
        // Let's get meta...
        window.location.href
      ]

      const url = AppComponent.getRandomArrayValue(urls);

      this.openWindow(url, true);
    }

    if (this.typeIndex % 420 === 0) {
      this.openWindow('http://gentlecuts.net/wp-content/uploads/2012/01/%E3%83%AA%E3%82%B5%E3%83%95%E3%83%A9%E3%83%B3%E3%82%AF420-_-%E7%8F%BE%E4%BB%A3%E3%81%AE%E3%82%B3%E3%83%B3%E3%83%94%E3%83%A5%E3%83%BC.mp3', true)
    }

    if (this.typeIndex % 500 === 0 && Math.random() > 0.90) {
      this.snippets.push({
        code: 'Seg fault\nCore dumped',
        color: 'limegreen'
      });
      this.gotSegFault = true;
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

  static getRandomArrayValue<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  static getRandomGroupingNumber(max = 5): number {
    return Math.floor(Math.random() * max);
  }

  static getColor(): string {
    const colors = [
      'cornflowerblue',
      'coral',
      'palevioletred',
      'white',
      'limegreen',
      'gold'
    ];

    return AppComponent.getRandomArrayValue(colors);
  }
}
