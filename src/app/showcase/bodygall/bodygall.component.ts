import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HumorService } from '../service/humor.service';
import { ViewChild } from '@angular/core';
import { Paginator } from '../../components/paginator/paginator';

@Component({
  selector: 'app-bodygall',
  templateUrl: './bodygall.component.html',
  styleUrls: ['./bodygall.component.css']
})
export class BodygallComponent implements OnInit {
  @ViewChild('p') paginator: Paginator;

  data : any;
  type : any;
  page : any;
  cols: any[];
  total : any;
  constructor(
    private humorService : HumorService,
    private route : ActivatedRoute
  ) {
    this.type = this.route.snapshot.paramMap.get('type');
    this.page = this.route.snapshot.paramMap.get('page');
    this.init(this.page);
  }

  init(page){
    var today = new Date();
    
    if (this.type == 'star') {
      this.humorService.getStars(page, 10).subscribe(data => {
        for(var item of data.value){
          if(item.create_dt != undefined && formatDate(today) == item.create_dt.substring(0, 10)){
            item.today = true;
          }
        }

        this.type = 'star';
        this.data = data;
        this.total = data.page * 10;

        this.onComplete(page);
      })
    }
    else if (this.type == 'body') {
      this.humorService.getBodyGalls(page, 10).subscribe(data => {
        for(var item of data.value){
          if(item.create_dt != undefined && formatDate(today) == item.create_dt.substring(0, 10)){
            item.today = true;
          }
        }

        this.type = 'body';
        this.data = data;
        this.total = data.page * 10;

        this.onComplete(page);
      })
    }
    else if (this.type == 'humor') {
      this.humorService.getHumors(page, 10).subscribe(data => {
        
        for(var item of data.value){
          if(item.create_dt != undefined && formatDate(today) == item.create_dt.substring(0, 10)){
            item.today = true;
          }
        }

        this.type = 'humor';
        this.data = data;
        this.total = data.page * 10;

        this.onComplete(page);
      })
    }

    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
  
      return [year, month, day].join('-');
  }
  }
  onComplete(page){
    this.paginator.first = (page-1) * 10;
  }
  ngOnInit() {
    this.cols = [
      { field: 'vin', header: '제목' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
  ];
  
  
  }
  paginate(event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    console.log(event)
    this.page = event.page + 1
    this.init(event.page + 1);
}

}
