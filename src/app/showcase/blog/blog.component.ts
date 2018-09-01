import { Component, OnInit } from '@angular/core';
import { HumorService } from '../service/humor.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  data : any;
  constructor(private service : HumorService) { 
    this.service.getboards('blog',1).subscribe(t=>{
      this.data = t[1];
      console.log(t)
    })
  }

  ngOnInit() {
  }

}
