import { Directive, Component, OnInit,ElementRef } from '@angular/core';


@Component({
  selector: 'app-blogging',
  templateUrl: './blogging.component.html',
  styleUrls: ['./blogging.component.css']
})
export class BloggingComponent implements OnInit {

  text : string;
  constructor(private el: ElementRef) { }

  ngOnInit() {
   
  }

}
