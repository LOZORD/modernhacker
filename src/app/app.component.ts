import { Component, OnInit, ViewChild, ContentChild, HostListener } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  modelCode = '\n';
  typeIndex = 0;
  viewCode = '';
  constructor(private service: AppService) { }

  ngOnInit() {
    this.service.getCode().subscribe(code => {
      this.modelCode += code.trim();
    });
  }

  @HostListener('document:keyup', ['$event'])
  onKeyPress(event: any) {
    if (this.typeIndex < this.modelCode.length) {
      const ff = AppComponent.getRandomGrouping();
      const s = this.modelCode.slice(this.typeIndex, this.typeIndex + ff);
      this.typeIndex += ff;
      this.viewCode += s;
    }
  }

  static getRandomGrouping(max = 5): number {
    return Math.round(Math.random() * max);
  }
}
