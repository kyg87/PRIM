import { Component, OnInit } from '@angular/core';
import { HumorService } from '../service/humor.service';
@Component({
  selector: 'app-av-search',
  templateUrl: './av-search.component.html',
  styleUrls: ['./av-search.component.css']
})
export class AvSearchComponent implements OnInit {

  data : any;
  constructor(
    private humorService : HumorService,
  ) { }

  ngOnInit() {
    this.humorService.getAvSearch('118abp00073').subscribe( data => {

      this.data = data;
      console.log(this.data)
    })

  }

}
