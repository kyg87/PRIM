import { Directive, Component, OnInit,ElementRef } from '@angular/core';
import { HumorService } from '../service/humor.service';

@Component({
  selector: 'app-blogging',
  templateUrl: './blogging.component.html',
  styleUrls: ['./blogging.component.css']
})
export class BloggingComponent implements OnInit {

  title : string;
  content : string;
  constructor(private el: ElementRef,
            private service : HumorService) { }

  ngOnInit() {
   
  }

  addBoard(){
    
    var board = {
      title : this.title,
      type : 'blog',
      content : this.content
    }
    console.log(board)
   
    this.service.addboard(board).subscribe((t)=>{
      console.log('등록');
      
    })
  }

}
