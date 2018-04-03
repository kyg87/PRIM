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

  cols: any[];
  constructor(private humorService : HumorService,) { }

  ngOnInit() {
    this.cols = [
      { field: 'vin', header: '제목' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
  ];
  
    this.humorService.getBodyGalls('page',10).subscribe(data=>{
      
      this.data = data.value;

      console.log(this.data)
    })



  }

}
