import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HumorService } from '../service/humor.service'
@Component({
  selector: 'app-bodygall',
  templateUrl: './bodygall.component.html',
  styleUrls: ['./bodygall.component.css']
})
export class BodygallComponent implements OnInit {
  data : any;
  type : any;
  cols: any[];
  constructor(
    private humorService : HumorService,
    private route : ActivatedRoute
  ) {
    const type = this.route.snapshot.paramMap.get('type');
    if (type == 'star') {
      this.humorService.getHumors('page', 10).subscribe(data => {
        this.type = 'star';
        this.data = data.value;
      })
    }
    else if (type == 'body') {
      this.humorService.getBodyGalls('page', 10).subscribe(data => {
        this.type = 'body';
        this.data = data.value;
      })
    }
  }

  ngOnInit() {
    this.cols = [
      { field: 'vin', header: '제목' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
  ];
  }

}
