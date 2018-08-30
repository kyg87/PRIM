import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HumorService } from '../service/humor.service';
import { CommentsComponent } from '../comments/comments.component';

declare var Prism : any;
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @ViewChild(CommentsComponent)
  private commentsComponent : CommentsComponent;

  data : any;
  type : any;
  page : any;
  test : string = 'aaa';
  constructor(
    private humorService : HumorService,
    private route : ActivatedRoute,
  ) { 
    
    this.type = this.route.snapshot.paramMap.get('type');
    this.page = this.route.snapshot.paramMap.get('page');
    const id = this.route.snapshot.paramMap.get('id');
    console.log(this.type);
    console.log(this.page);
    console.log(id);

    if (this.type == 'star') {
      humorService.getHumor(id).subscribe(data => {
        console.log(data)
        this.data = data;
        this.commentsComponent.onInit(id);
      });
    }
    else if (this.type == 'body') {
      humorService.getBodyGall(id).subscribe(data => {
        this.data = data;
        this.commentsComponent.onInit(id);
      });
    }
    else{
      humorService.getboard(id).subscribe(data=>{
        console.log(data)
        this.data = data[0];
        this.commentsComponent.onInit(id);
      });
    }
    
  }

  ngOnInit() {
  }

}
