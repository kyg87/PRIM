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
  constructor(
    private humorService : HumorService,
    private route : ActivatedRoute,
  ) { 
    const type = this.route.snapshot.paramMap.get('type');
    const page = this.route.snapshot.paramMap.get('page');
    const id = this.route.snapshot.paramMap.get('id');

    console.log(type,page,id)

    humorService.getBodyGall(id).subscribe(data=>{
      this.data = data;
    });
  }

  ngOnInit() {
  }

}
