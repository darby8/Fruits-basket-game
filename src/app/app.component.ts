import { Component, Renderer2, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { DragableDirective } from './dragable.directive';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // this is for dependency injection that are require to creating application
  constructor(
    private location: Location,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}
  // get the regerence of parent element and trolly element
  @ViewChild('myElement') myElementRef: ElementRef | any;
  @ViewChild('trolly') trolly: ElementRef | any;
  title = 'trollyGame';
  time: number | any = 10;
  fruits: number = 0;
  score: number = 0;
  intervalId: any;
  dynaElement:any;
  offsetWidth: number = 0;
  startingMarginLeft = 0;
  startingMarginRight = 0;
  offseHeigth: number = 0;
  isVisible=false;
  topPositions: number[] = [];
  leftPositions: number[] = [];
  trollyHeight:number=0;
  // this is image array
  imageUrls: string[] = [
    '../assets/image/7910224.png',
    '../assets/image/download.png',
    '../assets/image/images.png',
    '../assets/image/images2.png',
    '../assets/image/images3.png',
  ];
  ngAfterViewInit() {
    this.offsetWidth = this.myElementRef.nativeElement.offsetWidth; // this give parent div weidht
    this.offseHeigth = this.myElementRef.nativeElement.offsetHeight; // this give parent div height
   
    // this line of code provide countdown and break the loop when time is up

    this.intervalId = setInterval(() => {
      if (this.time <= 0) {
        this.isVisible=true;
        clearInterval(this.intervalId);
      } else {
        console.log(this.time);
        this.time--;
      }
    }, 1000);
    this.intervalId = setInterval(() => {
      if (this.time == 0) {
        clearInterval(this.intervalId);
      } else {
        // this create dynamic image elemnt in parent element give class name take dynamic image from the array and drop randomly within parent element
        const fruit = this.renderer.createElement('img');
        this.renderer.setAttribute(fruit, 'class', 'fruit'); // Set the class of the fruit element

        var randomFruit: any =
          this.imageUrls[Math.floor(Math.random() * this.imageUrls.length)];
        fruit.src = randomFruit;

        let offsets = Math.floor(Math.random() * this.offsetWidth);
        this.renderer.setStyle(
          fruit,
          'background-image',
          `url(${randomFruit})`
        );
        //this is used to render the dynamic element
        this.renderer.setStyle(fruit, 'position', 'absolute');
        this.renderer.setStyle(fruit, 'left', `${offsets}px`);
        this.renderer.appendChild(this.myElementRef.nativeElement, fruit);

        // this.trollyHeight = this.trolly.nativeElement.getBoundingClientRect();
        //  console.log(this.trollyHeight);
        this.dynaElement =
          this.myElementRef.nativeElement.getBoundingClientRect("fruit");
         console.log(this.dynaElement);
      }
    }, 500);
  }

  // this. is use to reload the page.
  refreshPage() {
    window.location.reload();
  }
}





























































    //these line gives left and righ margin of the parent div.
    // const containerElement = this.myElementRef.nativeElement as HTMLElement;
    // const computedStyle = window.getComputedStyle(containerElement);
    // this.startingMarginLeft = parseFloat(computedStyle.marginLeft);
    // this.startingMarginRight = parseFloat(computedStyle.marginRight);
    // console.log(this.startingMarginRight);