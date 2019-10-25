import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { TwigService } from '../twig.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  twigTemplate: string = '';
  cssTemplate: string = '';

  previousWidth: number = 0;

  @ViewChild('twigTemplateElement',  {static: false}) twigTemplateElement: ElementRef;
  @ViewChild('cssTemplateElement',  {static: false}) cssTemplateElement: ElementRef;
  @ViewChild('jsonTemplateElement',  {static: false}) jsonTemplateElement: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.previousWidth >= 1100 && event.target.innerWidth < 1100) {
      console.log(this.twigTemplateElement.nativeElement.classList)
      this.adjustTextAreaHeight({target: this.twigTemplateElement.nativeElement}, true);
      this.adjustTextAreaHeight({target: this.cssTemplateElement.nativeElement}, true);
      this.adjustTextAreaHeight({target: this.jsonTemplateElement.nativeElement}, true);
    } else if (this.previousWidth < 1100 && event.target.innerWidth >= 1100) {
      this.twigTemplateElement.nativeElement.style.transition = 'none';
      this.cssTemplateElement.nativeElement.style.transition = 'none';
      this.jsonTemplateElement.nativeElement.style.transition = 'none';

      this.twigTemplateElement.nativeElement.style.height = '';
      this.cssTemplateElement.nativeElement.style.height = '';
      this.jsonTemplateElement.nativeElement.style.height = '';

      setTimeout(() => {
        this.twigTemplateElement.nativeElement.style.transition = '';
        this.cssTemplateElement.nativeElement.style.transition = '';
        this.jsonTemplateElement.nativeElement.style.transition = '';
      }, 10);
    }

    this.previousWidth = event.target.innerWidth;
  }

  constructor(private twig: TwigService) { }

  ngOnInit() { }

  renderTwig(): void {
    this.twig.render(this.twigTemplate, this.cssTemplate);
  }

  adjustTextAreaHeight(event, ignoreCurrentHeight: boolean = false) {
    if (ignoreCurrentHeight || event.target.style.height) {
      event.target.style.height = '';
      event.target.style.height = event.target.scrollHeight + 2 + 'px';
    }
  }

  handleTabKey(event) {
      event.preventDefault();

      var start = event.target.selectionStart;
      var end = event.target.selectionEnd;

      event.target.selectionStart = event.target.selectionEnd = start + 1;
      event.target.value = event.target.value.substring(0, start) + '\t' + event.target.value.substring(end);
      event.target.selectionStart = event.target.selectionEnd = start + 1;
  }

  inputTemplateFocus(event) {
    this.removeFocusClasses();

    if (event) {
      this.twigTemplateElement.nativeElement.classList.add('input-template_blur');
      this.cssTemplateElement.nativeElement.classList.add('input-template_blur');
      this.jsonTemplateElement.nativeElement.classList.add('input-template_blur');

      event.target.classList.remove('input-template_blur');
      event.target.classList.add('input-template_focus');
    }
  }

  removeFocusClasses(): void {
    this.twigTemplateElement.nativeElement.classList.remove('input-template_focus');
    this.twigTemplateElement.nativeElement.classList.remove('input-template_blur');
    this.cssTemplateElement.nativeElement.classList.remove('input-template_focus');
    this.cssTemplateElement.nativeElement.classList.remove('input-template_blur');
    this.jsonTemplateElement.nativeElement.classList.remove('input-template_focus');
    this.jsonTemplateElement.nativeElement.classList.remove('input-template_blur');
  }

}
