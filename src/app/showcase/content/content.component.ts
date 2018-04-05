import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HumorService } from '../service/humor.service'
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  data : any;
  type : any;
  constructor(
    private humorService : HumorService,
    private route : ActivatedRoute,
  ) { 
    this.type = this.route.snapshot.paramMap.get('type');
    const page = this.route.snapshot.paramMap.get('page');
    const id = this.route.snapshot.paramMap.get('id');

    if (this.type == 'star') {
      humorService.getHumor(id).subscribe(data => {
        this.data = data;
      });
    }
    else if (this.type == 'body') {
      humorService.getBodyGall(id).subscribe(data => {
        this.data = data;
      });
    }
    
  }

  ngOnInit() {
  }

}
