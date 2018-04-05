import { Component, OnInit, Input } from '@angular/core';
import { HumorService } from '../../service/humor.service'

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { parse } from 'url';
import { Parser } from '@angular/compiler/src/ml_parser/parser';

import {Car} from '../../components/domain/car';
import {CarService} from '../../service/carservice';
import {SelectItem} from '../../../components/common/api';
import { ViewChild } from '@angular/core';
import { Paginator } from '../../../components/paginator/paginator';
@Component({
  selector: 'app-instargall',
  templateUrl: './instargall.component.html',
  styleUrls: ['./instargall.component.css']
})
export class InstargallComponent implements OnInit {

  @ViewChild('p') paginator: Paginator;
  sortOptions: SelectItem[] = new Array();
  sortKey: string;
  data: any;
  page: number;
  total: any;

  constructor(
    private carService: CarService,
    private humorService: HumorService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) {
    this.humorService.getInstaList().subscribe(data => {
      for (var i = 0; i < data.length; i++) {
        var temp = { label: data[i].instaId, value: data[i].instaId };
        this.sortOptions.push(temp);
      }
    })
  }

  ngOnInit() {
    this.init(this.sortKey, 1);
  }
  init(type, page) {
    if (type == undefined) {
      this.humorService.getInstars(page, 4).subscribe(data => {

        this.onComplete(data);

      })
    }
    else {
      this.humorService.getInstar(type, page, 4).subscribe(data => {
        this.onComplete(data);
      })
    }
  }

  onComplete(data) {

    for (var i = 0; i < data.value.length; i++) {
      if (data.value[i].mp4 == '') {
        var galleryImages = [];
        for (var k = 0; k < data.value[i].imgs.length; k++) {
          var temp = {
            source: data.value[i].imgs[k].src,
            alt: '',
            title: data.value[i].instaId
          }
          galleryImages.push(temp);

        }
        data.value[i].galleryImages = galleryImages;
      }

    }
    this.total = data.page * 4;
    this.data = data;
  }

  paginate(event) {
    this.init(this.sortKey, event.page + 1);
  }
  
  onSortChange(event) {
    let value = event.value;
    this.humorService.getInstar(value, 1, 4).subscribe(data => {
      this.paginator.first = 0;
      this.onComplete(data);
    })
  }


}
