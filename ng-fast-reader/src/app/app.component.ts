import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  output: string = 'ng-fast-reader';
  darkModeOn: boolean = true;

  constructor(public fb: FormBuilder, private elementRef: ElementRef) { }

  inForm: FormGroup = this.fb.group({
    text: ['', [Validators.required]],
    interval: ['', [Validators.required]]
  })

  async submitText(): Promise<void> {
    const text: string = this.inForm.get('text').value;
    const interval: number = this.inForm.get('interval').value;
    const out: string[] = text.split(" ");
    let c: number = 0
    while(c < out.length) {
      if(out.length === 1 && c === 0) {
        await this.sleep(interval * 1000);
      } else if(c != 0) {
        await this.sleep(interval * 1000);
      }
      this.output = out[c];
      c++;
    }
    await this.sleep(interval * 1000);
    this.output = 'ng-fast-reader'
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  toggleMode(): void {
    this.darkModeOn = !this.darkModeOn;
    if(!this.darkModeOn) {
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
    } else {
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'black';
    }
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'black';
  }

}
